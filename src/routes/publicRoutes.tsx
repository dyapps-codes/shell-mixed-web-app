import type { ReactNode } from 'react'
import { PublicEntry } from '@/pages/PublicEntry'

export interface ShellRoute {
  path: string
  element: ReactNode
}

export const publicRoutes: ShellRoute[] = [
  { path: '/', element: <PublicEntry /> },
  // MODULE_PUBLIC_ROUTES
]
