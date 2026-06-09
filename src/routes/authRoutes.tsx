import type { ReactNode } from 'react'
import { Login } from '@/pages/Login'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { ResetPassword } from '@/pages/ResetPassword'

export interface ShellRoute {
  path: string
  element: ReactNode
}

export const authRoutes: ShellRoute[] = [
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
]

