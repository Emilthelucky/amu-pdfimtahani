// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 target: 'https://amu-exam-api-v2.onrender.com',
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace(/^\/api/, ''),
//             },
//         },
//     },
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3000',
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
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://amu-exam-api-v2.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
