import { useContext, useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import './App.css'
import { Navigation } from './components/Navigation/Navigation.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { Exam } from './components/Exam/Exam.jsx'
import { Register } from './app/Register/Register.jsx'
import { Login } from './app/Login/Login.jsx'
import { Home } from './app/Home/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { IntervalSelection } from './app/IntervalSelection/IntervalSelection.jsx'
import { UserContext } from './context/userContext.jsx'

export const App = () => {
    const { user } = useContext(UserContext)

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={user ? <Home /> : <Login />} />
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Home />}
                />
                <Route path="/login" element={!user ? <Login /> : <Home />} />
                <Route path="/exam" element={user ? <Exam /> : <Login />} />
                <Route
                    path="/selection"
                    element={user ? <IntervalSelection /> : <Login />}
                />
            </Routes>
        </>
    )
}
