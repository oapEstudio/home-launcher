import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HomeLauncherApp } from './HomeLauncherApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeLauncherApp/>
  </StrictMode>,
)
