// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 target: 'https://exam-api-v2.vercel.app',
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, ''),
//             },
//         },
//     },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
