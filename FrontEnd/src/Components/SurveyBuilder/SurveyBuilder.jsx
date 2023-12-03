import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useState } from "react"
import "./SurveyBuilder.css"
import { QuestionForm } from './QuestionForm'

const allQuestionTypes = [
    { name: 'Textbox', type: 'text' },
    { name: 'Comment', type: 'comment' },
    { name: 'Radio Button Group', type: 'radiogroup' },
    { name: 'Rating Scale', type: 'rating' },
    { name: 'Checkboxes', type: 'checkbox' },
    { name: 'Dropdown', type: 'dropdown' },
    { name: 'Multi-Select Dropdown', type: 'tagbox' },
    { name: 'Yes/No', type: 'boolean' },
    { name: 'Ranking', type: 'ranking' },
]

export function SurveyBuilder() {
    const [showDetails, setShowDetails] = useState(false)
    const [questionType, setQuestionType] = useState("")
    const [surveyJson, setSurveyJson] = useState({
        pages: [{
            name: "Page1",
            elements: []
        }]
    })

    const survey = new Model(surveyJson)

    const openDetailsForm = type => {
        setQuestionType(type)
        setShowDetails(true) // TODO: Put this in useEffect if it's not updating properly
    }

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>
                {allQuestionTypes.map((value, index) => {
                    return (
                        <div key={index} className='question-type'>
                            {value.name}
                            <button className='add-question-btn' onClick={e => openDetailsForm(value.type)}>Select</button>
                        </div>
                    )
                })}
            </aside>

            <main id="question-container">
                <Survey model={survey} />
            </main>

            <aside id="question-details">
                <h2>Details</h2>
                {showDetails &&
                    <QuestionForm typeValue={questionType} setSurveyJson={setSurveyJson} setShowDetails={setShowDetails} />
                }
            </aside>
        </div>
    )
}