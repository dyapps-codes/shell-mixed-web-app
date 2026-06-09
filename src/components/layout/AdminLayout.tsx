import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useAuth } from '@dypai-ai/client-sdk/react'
import { AdminSidebar } from './AdminSidebar'
import { getBreadcrumbs, getPageTitle } from '@/config/navigation'

interface AdminLayoutProps {
  appName?: string
}

export function AdminLayout({ appName }: AdminLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const userEmail = user?.email ?? ''
  const userRole = user?.role ?? ''
  const breadcrumbs = getBreadcrumbs(location.pathname)

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar appName={appName} userEmail={userEmail} userRole={userRole} onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-6 lg:px-8">
          <div className="min-w-0 pl-12 lg:pl-0">
            <nav className="mb-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.href}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="h-3 w-3" />}
                  <span className={index === breadcrumbs.length - 1 ? 'text-foreground' : ''}>
                    {crumb.label}
                  </span>
                </span>
              ))}
            </nav>
            <h1 className="truncate text-lg font-semibold tracking-tight">{getPageTitle(location.pathname)}</h1>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-primary/10 text-xs font-semibold text-primary">
            {(userEmail || 'A').charAt(0).toUpperCase()}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

