import './Select.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ExamContext } from '../../context/examContext'
import { Spinner } from '@chakra-ui/react'

export const Select = ({ exams, loading }) => {
    const { examId, setExamId } = useContext(ExamContext)
    let navigate = useNavigate()
    let location = useLocation()

    const NavigateTo = (id) => {
        setExamId(id)
        localStorage.setItem('examId', id)
        navigate('/selection')
    }

    useEffect(() => {
        if (location.pathname === '/') {
            localStorage.removeItem('examQuestions')
            localStorage.removeItem('examTitle')
            localStorage.removeItem('ready')
            localStorage.removeItem('examId')
            localStorage.removeItem('revealedAnswers')
            localStorage.removeItem('shuffledQuestions')
            localStorage.removeItem('selectedAnswers')
        }
    }, [location])

    return (
        <>
            {!loading ? (
                <div className="exam-selection-bug">
                    {exams.map((exam) => (
                        <button
                            className="single-exam"
                            key={exam._id}
                            onClick={() => NavigateTo(exam._id)}
                        >
                            {exam.name}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="spinner-container">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </div>
            )}
        </>
    )
}
