import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import './Login.css'
import { Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const { setUser, setToken } = useContext(UserContext)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${apiUrl}/user/login`, formData)
            const data = response.data.data
            const token = data.token
            const user = data.user
            setUser(user)
            setToken(token)
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('user', JSON.stringify(user))
            setSuccessMessage('Login successful')
            setErrorMessage(null)
            setLoading(false)
        } catch (err) {
            setErrorMessage(err.response.data.message)
            setSuccessMessage(null)
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <h1 className="login-title">User Login</h1>
            <div className="username-container">
                <p className="l-username">Username</p>
                <input
                    className="login-username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="password-container">
                <p className="l-password">Password</p>
                <input
                    className="login-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
                className="button-login"
                type="submit"
                onClick={handleSubmit}
            >
                {loading ? <Spinner /> : <p>Login</p>}
            </button>
            <Link to="/register" className="link">
                Hesabin yoxdur? Qeydiyyatdan kecin!
            </Link>
            {successMessage && (
                <p className="message success">{successMessage}</p>
            )}
            {errorMessage && <p className="message error">{errorMessage}</p>}
        </div>
    )
}
