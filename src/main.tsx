import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { persister, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import {Theme} from "@radix-ui/themes"
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Theme accentColor='gray' >
        <RouterProvider router={router} />
        </Theme>
      </PersistGate>
      <Toaster position='top-center' />
    </Provider>
  </StrictMode>,
)
