import type { ComponentType, ReactNode } from 'react'
import * as DashboardModule from '@/pages/admin/Dashboard'

export interface ShellRoute {
  path: string
  element: ReactNode
}

const dashboardModule = DashboardModule as {
  AdminDashboard?: ComponentType
  Dashboard?: ComponentType
  default?: ComponentType
}

const MissingDashboard: ComponentType = () => null

const AdminDashboard =
  dashboardModule.AdminDashboard ?? dashboardModule.Dashboard ?? dashboardModule.default ?? MissingDashboard

export const adminRoutes: ShellRoute[] = [
  { path: '/admin', element: <AdminDashboard /> },
  // MODULE_ADMIN_ROUTES
]

