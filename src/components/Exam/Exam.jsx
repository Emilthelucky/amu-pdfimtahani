import { useEffect, useState, useContext } from 'react'
import './Exam.css'
import { ExamContext } from '../../context/examContext'
import { Spinner } from '@chakra-ui/react'

export const Exam = () => {
    const { examTitle, examQuestions } = useContext(ExamContext)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [revealedAnswers, setRevealedAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [shuffledQuestions, setShuffledQuestions] = useState([])
    const [results, setResults] = useState({})
    const [loading, setLoading] = useState(true)

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

    const revealAnswer = (questionIndex) => {
        const newRevealedAnswers = {
            ...revealedAnswers,
            [questionIndex]: true,
        }
        setRevealedAnswers(newRevealedAnswers)
        localStorage.setItem(
            'revealedAnswers',
            JSON.stringify(newRevealedAnswers)
        )
    }

    const checkAnswers = () => {
        const newResults = {}
        shuffledQuestions.forEach((question, index) => {
            newResults[index] = selectedAnswers[index] === question.answer
        })
        setResults(newResults)
        setShowResults(true)
    }

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    const getUniqueAnswers = (question) => {
        const answers = [...question.otherAnswers, question.answer]
        return [...new Set(answers)]
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
        if (examQuestions) {
            const storedQuestions = JSON.parse(
                localStorage.getItem('shuffledQuestions')
            )
            if (
                storedQuestions &&
                storedQuestions.length === examQuestions.length
            ) {
                setShuffledQuestions(storedQuestions)
            } else {
                const questionsWithShuffledAnswers = examQuestions.map(
                    (question) => {
                        const uniqueAnswers = getUniqueAnswers(question)
                        return {
                            ...question,
                            shuffledAnswers: shuffleArray(uniqueAnswers),
                        }
                    }
                )
                setShuffledQuestions(questionsWithShuffledAnswers)
                localStorage.setItem(
                    'shuffledQuestions',
                    JSON.stringify(questionsWithShuffledAnswers)
                )
            }
        }

        const storedSelectedAnswers = JSON.parse(
            localStorage.getItem('selectedAnswers')
        )
        if (storedSelectedAnswers) {
            setSelectedAnswers(storedSelectedAnswers)
        }

        const storedRevealedAnswers = JSON.parse(
            localStorage.getItem('revealedAnswers')
        )
        if (storedRevealedAnswers) {
            setRevealedAnswers(storedRevealedAnswers)
        }
    }, [examQuestions])

    return (
        <>
            {loading ? (
                <div className="spinner-container-2">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </div>
            ) : (
                <div className="exam-container">
                    <div className="exam-title">{examTitle}</div>
                    <div className="question-container">
                        {shuffledQuestions.length > 0 &&
                            shuffledQuestions.map((question, questionIndex) => {
                                return (
                                    <div
                                        key={questionIndex}
                                        className="question-block"
                                    >
                                        <div className="question">
                                            <div className="question-number">
                                                {questionIndex + 1}
                                            </div>
                                            <div className="question-title">
                                                {question.title}
                                            </div>
                                        </div>
                                        <div className="answers">
                                            {question.shuffledAnswers.map(
                                                (answer, answerIndex) => (
                                                    <div
                                                        className="single-answer"
                                                        key={answerIndex}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`answer-${questionIndex}`}
                                                            value={answer}
                                                            checked={
                                                                selectedAnswers[
                                                                    questionIndex
                                                                ] === answer
                                                            }
                                                            onChange={() =>
                                                                handleAnswerChange(
                                                                    questionIndex,
                                                                    answer
                                                                )
                                                            }
                                                            disabled={
                                                                showResults
                                                            }
                                                        />
                                                        <p className="answer">
                                                            {answer}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <button
                                            className="reveal-answer-button"
                                            onClick={() =>
                                                revealAnswer(questionIndex)
                                            }
                                            disabled={
                                                revealedAnswers[questionIndex]
                                            }
                                        >
                                            Reveal Answer
                                        </button>
                                        {revealedAnswers[questionIndex] && (
                                            <div className="correct-answer">
                                                Correct answer:{' '}
                                                <span className="highlight-correct">
                                                    {question.answer}
                                                </span>
                                            </div>
                                        )}
                                        {showResults && (
                                            <div
                                                className={`result ${
                                                    results[questionIndex]
                                                        ? 'correct'
                                                        : 'incorrect'
                                                }`}
                                            >
                                                {results[questionIndex]
                                                    ? 'Correct'
                                                    : `Incorrect, the correct answer is: ${question.answer}`}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                    {!showResults && (
                        <button
                            className="submit-answers-button"
                            onClick={checkAnswers}
                        >
                            Submit Answers
                        </button>
                    )}
                </div>
            )}
        </>
    )
}
