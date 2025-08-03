import React from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'

import App from './App.jsx'

export const createRoot = ViteReactSSG(<React.StrictMode>
    <App />
</React.StrictMode>)
