import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, Layers, LogOut, Menu, X } from 'lucide-react'
import { adminNavItems, type AppNavItem } from '@/config/navigation'
import { appConfig } from '@/lib/app-config'
import { cn, getAvatarColor, initials } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface AdminSidebarProps {
  onLogout: () => void
  appName?: string
  userEmail?: string
  userRole?: string
}

export function AdminSidebar({
  onLogout,
  appName = appConfig.name,
  userEmail = '',
  userRole = '',
}: AdminSidebarProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const visibleItems = adminNavItems.filter((item) => !item.requiredRole || item.requiredRole === userRole)

  const isActive = (href: string) =>
    href === appConfig.adminHomePath ? location.pathname === href : location.pathname.startsWith(href)

  const renderNavItems = (items: AppNavItem[]) =>
    items.map((item) => {
      const Icon = item.icon
      const active = isActive(item.href)

      return (
        <Link
          key={item.href}
          to={item.href}
          onClick={() => setMobileOpen(false)}
          className={cn(
            'group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            collapsed && 'justify-center px-2',
            active
              ? 'bg-primary/10 text-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {active && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
          )}
          <Icon className={cn('h-4 w-4 shrink-0', active && 'text-primary')} />
          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
          {!collapsed && item.badge != null && item.badge > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
              {item.badge}
            </span>
          )}
          {collapsed && (
            <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs font-medium opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {item.label}
            </div>
          )}
        </Link>
      )
    })

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn('flex h-16 shrink-0 items-center gap-3 px-4', collapsed ? 'justify-center' : 'justify-between')}>
        <div className={cn('flex min-w-0 items-center gap-3', collapsed && 'justify-center')}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-primary/10 text-primary">
            <Layers className="h-4 w-4" />
          </div>
          {!collapsed && <span className="truncate text-sm font-semibold">{appName}</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 px-3 py-4">{renderNavItems(visibleItems)}</nav>

      <div className="mt-auto">
        <Separator />
        <div className={cn('px-3 py-4', collapsed && 'flex justify-center')}>
          {!collapsed ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold', getAvatarColor(userEmail || 'A'))}>
                  {initials(userEmail || 'Admin')}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Account</p>
                  <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogout}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-md border bg-card shadow-sm lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 border-r bg-card">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      <aside
        className={cn(
          'hidden h-screen shrink-0 flex-col border-r bg-card transition-all duration-300 lg:flex',
          collapsed ? 'w-16' : 'w-64',
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

