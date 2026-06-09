import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DypaiProvider, ProtectedRoute } from '@dypai-ai/client-sdk/react'
import { Loader2 } from 'lucide-react'
import { dypai } from '@/lib/dypai'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { adminRoutes } from '@/routes/adminRoutes'
import { authRoutes } from '@/routes/authRoutes'
import { publicRoutes } from '@/routes/publicRoutes'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  )
}

const App = () => (
  <DypaiProvider client={dypai}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a
            href="https://dypai.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by DYPAI"
            className="fixed bottom-3 right-3 z-50 rounded-full border border-border/40 bg-background/70 px-2.5 py-1 text-[10px] font-medium text-muted-foreground/60 shadow-sm backdrop-blur-sm transition-colors hover:border-border hover:text-muted-foreground"
          >
            Powered by DYPAI
          </a>
          <Routes>
            {/* ── Public routes ── */}
            {publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* ── Auth routes ── */}
            {authRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* ── Protected admin routes ── */}
            <Route
              element={
                <ProtectedRoute
                  loadingComponent={<LoadingScreen />}
                  unauthenticatedComponent={<Navigate to="/login" replace />}
                >
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {adminRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </DypaiProvider>
)

export default App
