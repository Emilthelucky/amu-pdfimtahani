import { useEffect, useState } from 'react'
import axios from 'axios'
import { Select } from '../../components/Selection/Select'
import './Home.css'

export const Home = () => {
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)

    //192.168.0.104:3000
    const fetchExams = async () => {
        setLoading(true)
        const response = await axios.get(`api/exam`)
        const exams = response.data.data
        setExams(exams)
        setLoading(false)
    }

    useEffect(() => {
        fetchExams()
    }, [])

    return (
        <>
            <div className="home-container">
                <div className="exam-list">
                    <Select exams={exams} loading={loading} />
                </div>
            </div>
        </>
    )
}
