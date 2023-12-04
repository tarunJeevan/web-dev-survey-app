import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useEffect, useRef, useState } from "react"
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

    const surveyNameRef = useRef()

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

    const saveSurvey = async e => {
        e.preventDefault()

        const surveyQuestionsList = surveyModel.getAllQuestions()
        const surveyQuestions = createQuestionsList(surveyQuestionsList, typesList)
        const surveyDesc = surveyNameRef.current.value

        const reqBody = {
            id: 0,
            description: surveyDesc,
            questions: surveyQuestions
        }
        console.log(JSON.stringify(reqBody))

        try {
            const bearer = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch('https://websurvey.biskilog.com/api/Survey/new',
                {
                    method: 'POST',
                    headers: { 'Authorization': bearer, 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqBody)
                }
            )

            if (response.status === 200)
                console.log('Survey saved successfully!')
            else
                console.error(response.statusText)
        } catch (err) {
            console.error(err)
        }

        surveyNameRef.current.value = ''
    }

    const openDetailsForm = type => {
        setQuestionType(type)
        setShowDetails(true)
    }

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>

                <div className="question-types-container">
                    {typesList.length < 1 ? <span><b>Loading...</b></span> :
                        typesList.map((value, index) => {
                            return (
                                <div key={index} className='question-type'>
                                    {value.name}
                                    <button className='add-question-btn' onClick={e => openDetailsForm(value.type)}>Select</button>
                                </div>
                            )
                        })}
                </div>
            </aside>

            <main id="question-container">
                <h2>Preview</h2>
                <div className="survey-container">
                    <Survey model={surveyModel} />
                </div>
                <form onSubmit={saveSurvey} className="save-survey">
                    <label htmlFor="survey-name">Save survey as </label>
                    <input type="text" id="survey-name" ref={surveyNameRef} maxLength={30} required />
                    <button type="submit">Save</button>
                </form>
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

function createQuestionsList(list, typesList) {
    const questionsList = []

    for (const question of list) {
        const type = typesList.find(value => value.type === question.getType())
        const rateMax = (question.getType() === 'rating') ? question.rateMax : 0
        const maxLength = (question.getType() === 'text') ? question.maxLength : 0
        const createdBy = localStorage.getItem('username')

        const today = new Date()
        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const day = today.getDate().toString().padStart(2, '0')

        const dateCreated = `${year}-${month}-${day}`
        const dateModified = `${year}-${month}-${day}`

        const questionObject = {
            id: 0,
            type: type.id,
            name: question.name,
            title: question.title,
            description: question.description,
            isRequired: question.isRequired ? 1 : 0,
            rateMax: rateMax,
            maxLength: maxLength,
            dateCreated: dateCreated,
            dateModified: dateModified,
            createdBy: createdBy,
            options: [{
                id: 0,
                questionId: 0,
                description: ""
            }]
        }
        questionsList.push(questionObject)
    }

    return questionsList
}