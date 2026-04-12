import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import ScanFacePage from "./pages/ScanFace";
import ScanResults from "./pages/ScanResults";
import MyScans from "./pages/MyScans";
import ImprovementHub from "./pages/ImprovementHub";
import Profile from "./pages/Profile";
import Survey from "./pages/Survey";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Forge imports
import ForgeLayout from "./forge/components/ForgeLayout";
import ForgeHome from "./forge/pages/ForgeHome";
import ForgeScan from "./forge/pages/ForgeScan";
import ForgeDiscover from "./forge/pages/ForgeDiscover";
import ForgeProfile from "./forge/pages/ForgeProfile";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-soft"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/forge" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />

    {/* Forge App */}
    <Route path="/forge" element={<ProtectedRoute><ForgeLayout /></ProtectedRoute>}>
      <Route index element={<ForgeHome />} />
      <Route path="scan" element={<ForgeScan />} />
      <Route path="discover" element={<ForgeDiscover />} />
      <Route path="profile" element={<ForgeProfile />} />
    </Route>

    {/* Legacy LuminaFace routes */}
    <Route path="/" element={<ProtectedRoute><><Index /><BottomNav /></></ProtectedRoute>} />
    <Route path="/scan" element={<ProtectedRoute><><ScanFacePage /><BottomNav /></></ProtectedRoute>} />
    <Route path="/results/:id" element={<ProtectedRoute><><ScanResults /><BottomNav /></></ProtectedRoute>} />
    <Route path="/my-scans" element={<ProtectedRoute><><MyScans /><BottomNav /></></ProtectedRoute>} />
    <Route path="/improve" element={<ProtectedRoute><><ImprovementHub /><BottomNav /></></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><><Profile /><BottomNav /></></ProtectedRoute>} />
    <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
