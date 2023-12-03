import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useEffect, useState } from "react"
import "./SurveyBuilder.css"
import { QuestionForm } from './QuestionForm'

export function SurveyBuilder() {
    const [typesList, setTypesList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [questionType, setQuestionType] = useState("")
    const [surveyJson, setSurveyJson] = useState({
        pages: [{
            name: "Page1",
            elements: []
        }]
    })

    useEffect(() => {
        const bearer = `Bearer ${localStorage.getItem('token')}`
        const getTypes = async () => {
            const response = await fetch('https://websurvey.biskilog.com/api/question/types',
                { headers: { 'Authorization': bearer } }
            )
            const responseJson = await response.json()
            setTypesList(responseJson)
        }
        getTypes()
    }, [])
    
    const openDetailsForm = type => {
        setQuestionType(type)
        setShowDetails(true)
    }
    
    const survey = new Model(surveyJson)

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>
                {typesList.map((value, index) => {
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