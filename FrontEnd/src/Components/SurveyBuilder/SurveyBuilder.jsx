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
    const [surveyModel, setSurveyModel] = useState(() => {
        const survey = new Model()
        survey.addNewPage('Page1')

        return survey
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
                <Survey model={surveyModel} />
            </main>

            <aside id="question-details">
                <h2>Details</h2>
                {showDetails &&
                    <QuestionForm typeValue={questionType} setSurveyJson={setSurveyModel} setShowDetails={setShowDetails} />
                }
            </aside>
        </div>
    )
}