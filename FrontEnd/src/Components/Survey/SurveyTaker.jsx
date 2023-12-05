import 'survey-core/defaultV2.min.css'
import './Survey.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const defaultSurveyJson = {}

export function SurveyTaker() {
    const [surveyModel, setSurveyModel] = useState(() => {
        return new Model(defaultSurveyJson)
    })

    const location = useLocation()
    const navigate = useNavigate()

    const surveyComplete = useCallback((sender) => {
        const results = JSON.stringify(sender.data)

        const responseObject = {
            surveyId : location.state.id,
            response : results
        }
        saveSurveyResults(
            'https://websurvey.biskilog.com/api/Survey/response',
            responseObject
        )
        const timeout = setTimeout(() => {
            navigate('/dashboard')
        }, 2000)

        return () => clearTimeout(timeout)
    }, [])

    // Get survey from backend and display it
    useEffect(() => {
        const getSurvey = async () => {
            const bearer = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(
                `https://websurvey.biskilog.com/api/Survey/${location.state.researcher}/${location.state.id}`,
                { headers: { 'Authorization': bearer } }
            )
            const responseJson = await response.json()
            setSurveyModel(() => {
                const savedSurveyJson = {
                    ...responseJson,
                    pages: JSON.parse(responseJson.pages)
                }
                const savedSurveyModel = new Model(savedSurveyJson)
                savedSurveyModel.onComplete.add(surveyComplete)

                return savedSurveyModel
            })
        }
        getSurvey()
    }, [])

    return (
        <div className="survey-displayer">
            <Survey model={surveyModel} />
        </div>
    )
}

async function saveSurveyResults(url, json) {
    const bearer = `Bearer ${localStorage.getItem('token')}`
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: { 'Authorization': bearer, "Content-Type": "application/json" },
                body: JSON.stringify(json)
            }
        )

        if (response.status === 200)
            console.log("Survey results saved successfully")
        else
            console.log('Error! Survey results not saved.')
    } catch (err) {
        console.error(err)
    }
}