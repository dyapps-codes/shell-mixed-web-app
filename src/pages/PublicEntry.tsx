import { Link } from 'react-router-dom'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PublicEntry() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-sm space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
          <LockKeyhole className="h-5 w-5" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Workspace ready</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Sign in to access the private app area. Public pages can be added when the
            product needs them.
          </p>
        </div>

        <Button asChild className="w-full">
          <Link to="/login">
            Sign in <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  )
}
