import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import ScanFacePage from "./pages/ScanFace";
import ScanResults from "./pages/ScanResults";
import MyScans from "./pages/MyScans";
import ImprovementHub from "./pages/ImprovementHub";
import Profile from "./pages/Profile";
import Survey from "./pages/Survey";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scan" element={<ScanFacePage />} />
          <Route path="/results/:id" element={<ScanResults />} />
          <Route path="/my-scans" element={<MyScans />} />
          <Route path="/improve" element={<ImprovementHub />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
