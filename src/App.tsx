
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EntriesProvider } from "./context/EntriesContext";
import { ReminderProvider } from "./context/ReminderContext";
import AppHeader from "./components/layout/AppHeader";

// Pages
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import DreamJournalPage from "./pages/DreamJournalPage";
import MoodTrackingPage from "./pages/MoodTrackingPage";
import RemindersPage from "./pages/RemindersPage";
import RitualsPage from "./pages/RitualsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppHeader />
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/journal" element={
          <ProtectedRoute>
            <AppHeader />
            <DreamJournalPage />
          </ProtectedRoute>
        } />
        <Route path="/mood" element={
          <ProtectedRoute>
            <AppHeader />
            <MoodTrackingPage />
          </ProtectedRoute>
        } />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <AppHeader />
            <RemindersPage />
          </ProtectedRoute>
        } />
        <Route path="/rituals" element={
          <ProtectedRoute>
            <AppHeader />
            <RitualsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <AppHeader />
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <EntriesProvider>
            <ReminderProvider>
              <AppContent />
              <Toaster />
              <Sonner />
            </ReminderProvider>
          </EntriesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
