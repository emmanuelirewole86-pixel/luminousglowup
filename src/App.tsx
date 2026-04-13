import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Forge imports
import ForgeLayout from "./forge/components/ForgeLayout";
import ForgeHome from "./forge/pages/ForgeHome";
import ForgeScan from "./forge/pages/ForgeScan";
import ForgeDiscover from "./forge/pages/ForgeDiscover";
import ForgeProfile from "./forge/pages/ForgeProfile";
import ForgeSettings from "./forge/pages/ForgeSettings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
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

    {/* Forge App — Primary */}
    <Route path="/forge" element={<ProtectedRoute><ForgeLayout /></ProtectedRoute>}>
      <Route index element={<ForgeHome />} />
      <Route path="scan" element={<ForgeScan />} />
      <Route path="discover" element={<ForgeDiscover />} />
      <Route path="profile" element={<ForgeProfile />} />
      <Route path="settings" element={<ForgeSettings />} />
    </Route>

    {/* Redirect root to Forge */}
    <Route path="/" element={<Navigate to="/forge" replace />} />

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
