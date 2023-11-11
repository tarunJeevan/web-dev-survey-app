import { useState } from "react"
import "./SurveyBuilder.css"

export function SurveyBuilder() {
    const [selectedQuestion, setSelectedQuestion] = useState({})

    let questionList = [
        {
            id: crypto.randomUUID(),
            type: "Default",
            question: "Default Question"
        }
    ]

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>
            </aside>

            <main id="question-container">
                {questionList.map(q => {
                    return (
                        <QuestionCard question={q.question} />
                    )
                })}
            </main>

            <aside id="question-details">
                <h2>Details</h2>
            </aside>
        </div>
    )
}

function QuestionCard({ type, question }) {

    return (
        <div className="question-card">
            <h3>{question}</h3>
        </div>
    )
}