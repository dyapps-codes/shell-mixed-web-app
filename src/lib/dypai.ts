/// <reference types="vite/client" />
import { createClient } from '@dypai-ai/client-sdk'
import type { EndpointContracts } from '@dypai/types/endpoints.gen'

export const dypai = createClient<any, EndpointContracts>(
  import.meta.env.VITE_DYPAI_URL,
  {
    redirects: {
      passwordRecovery: '/reset-password',
      signIn: '/admin',
    },
  },
)
