import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import './designs/global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ExamContextProvider } from './context/examContext.jsx'
import { UserContextProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <ExamContextProvider>
            <Router>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Router>
        </ExamContextProvider>
    </UserContextProvider>
)
