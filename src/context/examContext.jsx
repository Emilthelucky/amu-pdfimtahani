import { createContext } from 'react'
import { useState } from 'react'

export const ExamContext = createContext()

export const ExamContextProvider = ({ children }) => {
    const [examId, setExamId] = useState(() => {
        const savedExamId = localStorage.getItem('examId')
        return savedExamId ? savedExamId : null
    })

    const [examTitle, setExamTitle] = useState(() => {
        const savedExamTitle = localStorage.getItem('examTitle')
        return savedExamTitle ? savedExamTitle : null
    })
    const [examQuestions, setExamQuestions] = useState(() => {
        const savedExamQuestions = JSON.parse(
            localStorage.getItem('examQuestions')
        )
        return savedExamQuestions ? savedExamQuestions : null
    })

    console.log('examId', examId)
    console.log('examTitle', examTitle)
    console.log('examQuestions', examQuestions)

    return (
        <ExamContext.Provider
            value={{
                examId,
                setExamId,
                examTitle,
                setExamTitle,
                examQuestions,
                setExamQuestions,
            }}
        >
            {children}
        </ExamContext.Provider>
    )
}
