import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: [
            "prop-types",
            "react-fast-compare"
        ]
    },
    plugins: [react()],
    ssgOptions: {
        script: 'async',
        crittersOptions: {
            // E.g., change the preload strategy
            preload: 'media',
            // Other options: https://github.com/GoogleChromeLabs/critters#usage
        },
    },
})
