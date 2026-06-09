import { LayoutDashboard, type LucideIcon } from 'lucide-react'
import { appConfig } from '@/lib/app-config'

export interface AppNavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
  requiredRole?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export const adminNavItems: AppNavItem[] = [
  { label: 'Dashboard', href: appConfig.adminHomePath, icon: LayoutDashboard },
  // MODULE_ADMIN_NAV_ITEMS
]

export const pageTitles: Record<string, string> = {
  [appConfig.adminHomePath]: 'Dashboard',
  // MODULE_PAGE_TITLES
}

export function getPageTitle(pathname: string) {
  return pageTitles[pathname] ?? humanizePath(pathname)
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === appConfig.adminHomePath) {
    return [{ label: 'Dashboard', href: appConfig.adminHomePath }]
  }

  return [
    { label: 'Dashboard', href: appConfig.adminHomePath },
    { label: getPageTitle(pathname), href: pathname },
  ]
}

function humanizePath(pathname: string) {
  const lastSegment = pathname.split('/').filter(Boolean).at(-1)
  if (!lastSegment) return 'Page'

  return lastSegment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

