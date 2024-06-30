import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // React Router v6 için
import './Register.css'
import { Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Register = () => {
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate() // React Router v6 için

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`api/user/register`, formData)
            console.log(response.data)
            setSuccessMessage(
                response.data.data.message +
                    '. You are routing to the Login page'
            )
            setErrorMessage(null)
            setTimeout(() => {
                navigate('/login')
            }, 4000)
            setLoading(false)
        } catch (err) {
            setErrorMessage(err.response.data.message)
            setSuccessMessage(null)
            setLoading(false)
        }
    }

    return (
        <div className="register">
            <h1 className="register-title">User Registration</h1>
            <div className="username-container">
                <p className="l-username">Username</p>
                <input
                    className="register-username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="email-container">
                <p className="l-email">Email</p>
                <input
                    className="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="password-container">
                <p className="l-password">Password</p>
                <input
                    className="register-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="button-register" onClick={handleSubmit}>
                {loading ? <Spinner /> : <p>Register</p>}
            </button>
            <Link to="/login" className="link">
                Hesabin var? Giris et!
            </Link>
            {successMessage && (
                <p className="message success">{successMessage}</p>
            )}
            {errorMessage && <p className="message error">{errorMessage}</p>}
        </div>
    )
}
