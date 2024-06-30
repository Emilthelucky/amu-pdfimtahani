import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ExamContext } from '../../context/examContext.jsx'
import axios from 'axios'
import './IntervalSelection.css'
import { Spinner } from '@chakra-ui/react'

export const IntervalSelection = () => {
    const [questionInterval, setQuestionInterval] = useState([1, 50])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [loading, setLoading] = useState(false)

    const { examId, setExamTitle, setExamQuestions, examQuestions, examTitle } =
        useContext(ExamContext)

    let navigate = useNavigate()
    let location = useLocation()

    const NavigateTo = async () => {
        const fetchData = async () => {
            setLoading(true)
            await fetchSelectedExam()
            setLoading(false)
        }
        fetchData()
        navigate('/exam')
    }

    const fetchSelectedExam = async () => {
        const response = await axios.get(`api/exam/${examId}`)
        const data = response.data.data
        const allQuestions = data.questions

        // Shuffle questions to get random order
        const shuffledQuestions = shuffleArray(allQuestions)

        // Select first 50 questions
        const selectedQuestions = shuffledQuestions.slice(0, 50)

        localStorage.setItem('examTitle', data.name)
        setExamTitle(data.name)

        const ready = localStorage.getItem('ready') || false
        if (selectedQuestions && !ready) {
            const questions = selectedQuestions.map((question) => {
                const otherAnswersCopy = Array.isArray(question.other_answers)
                    ? [...question.other_answers]
                    : []
                otherAnswersCopy.push(question.answer)

                // Shuffle answers only once and store the order
                const shuffledAnswers = shuffleArray(otherAnswersCopy)
                const questionOrder = {
                    title: question.question,
                    answer: question.answer,
                    otherAnswers: shuffledAnswers,
                    originalOrder: otherAnswersCopy,
                }
                return questionOrder
            })
            localStorage.setItem('examQuestions', JSON.stringify(questions))
            localStorage.setItem('ready', true)
            setExamQuestions(questions)
        }
    }

    // Helper function to shuffle array
    const shuffleArray = (array) => {
        let shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ]
        }
        return shuffledArray
    }

    const handleAnswerChange = (questionIndex, answer) => {
        const newSelectedAnswers = {
            ...selectedAnswers,
            [questionIndex]: answer,
        }
        setSelectedAnswers(newSelectedAnswers)
        localStorage.setItem(
            'selectedAnswers',
            JSON.stringify(newSelectedAnswers)
        )
    }

    const firstInterval = (e) => {
        const value = e.target.value
        if (value === '') return
        const intValue = +value
        const newInterval = [...questionInterval]
        newInterval[0] = intValue
        setQuestionInterval(newInterval)
    }

    const secondInterval = (e) => {
        const value = e.target.value
        if (value === '') return
        const intValue = +value
        const newInterval = [...questionInterval]
        newInterval[1] = intValue
        setQuestionInterval(newInterval)
    }

    useEffect(() => {
        if (location.pathname === '/selection') {
            localStorage.removeItem('examQuestions')
            localStorage.removeItem('ready')
            localStorage.removeItem('revealedAnswers')
            localStorage.removeItem('shuffledQuestions')
            localStorage.removeItem('selectedAnswers')
        }

        const savedSelectedAnswers = JSON.parse(
            localStorage.getItem('selectedAnswers')
        )
        if (savedSelectedAnswers) {
            setSelectedAnswers(savedSelectedAnswers)
        }
    }, [location])

    return (
        <div className="interval-selection">
            <div className="exam-info">
                <h1>İmtahan haqda ətraflı məlumat</h1>
                <div className="info-item">
                    <span className="label">İmtahan adı:</span>
                    <span className="value">{examTitle || 'Loading...'}</span>
                </div>
                <div className="info-item">
                    <span className="label">İmtahan vaxtı:</span>
                    <span className="value">2 saat 00 dəqiqə</span>
                </div>
                <div className="info-item">
                    <span className="label">Sual sayı:</span>
                    <span className="value">50</span>
                </div>
                <div className="info-item">
                    <span className="label">Dəyəri:</span>
                    <span className="value">0.20 AZN</span>
                </div>
                <div className="info-item">
                    <span className="label">Düzgün cavaba baxmaq imkanı:</span>
                    <span className="value">
                        <input type="checkbox" />
                    </span>
                </div>
                <div className="info-item">
                    <span className="label">
                        Suallar hansı aralıqdan düşsün:
                    </span>
                    <span className="value">
                        <input
                            type="number"
                            value={questionInterval[0]}
                            onChange={firstInterval}
                            min="1"
                            max="703"
                        />
                        -
                        <input
                            type="number"
                            value={questionInterval[1]}
                            onChange={secondInterval}
                            min="1"
                            max="703"
                        />
                    </span>
                </div>
                <button className="btn select-questions" onClick={NavigateTo}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <p>Yadda saxlanilan suallara kec</p>
                    )}
                </button>
            </div>
        </div>
    )
}
