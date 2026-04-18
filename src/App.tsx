import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

import ForgeLayout from "./forge/components/ForgeLayout";
import ForgeHome from "./forge/pages/ForgeHome";
import ForgeScan from "./forge/pages/ForgeScan";
import ForgeDiscover from "./forge/pages/ForgeDiscover";
import ForgeProfile from "./forge/pages/ForgeProfile";
import ForgeSettings from "./forge/pages/ForgeSettings";
import ScanHistory from "./forge/pages/ScanHistory";
import ScanDetail from "./forge/pages/ScanDetail";
import TodayWorkout from "./forge/pages/TodayWorkout";
import TodayFace from "./forge/pages/TodayFace";
import TodayMeals from "./forge/pages/TodayMeals";
import TodayStyle from "./forge/pages/TodayStyle";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="/" element={<ProtectedRoute><ForgeLayout /></ProtectedRoute>}>
      <Route index element={<ForgeHome />} />
      <Route path="scan" element={<ForgeScan />} />
      <Route path="discover" element={<ForgeDiscover />} />
      <Route path="profile" element={<ForgeProfile />} />
      <Route path="settings" element={<ForgeSettings />} />
      <Route path="scans" element={<ScanHistory />} />
      <Route path="scans/:id" element={<ScanDetail />} />
      <Route path="today/workout" element={<TodayWorkout />} />
      <Route path="today/face" element={<TodayFace />} />
      <Route path="today/meals" element={<TodayMeals />} />
      <Route path="today/style" element={<TodayStyle />} />
    </Route>

    {/* Legacy redirects */}
    <Route path="/forge" element={<Navigate to="/" replace />} />
    <Route path="/forge/scan" element={<Navigate to="/scan" replace />} />
    <Route path="/forge/discover" element={<Navigate to="/discover" replace />} />
    <Route path="/forge/profile" element={<Navigate to="/profile" replace />} />
    <Route path="/forge/settings" element={<Navigate to="/settings" replace />} />

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
