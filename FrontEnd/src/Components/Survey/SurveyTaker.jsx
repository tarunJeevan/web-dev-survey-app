import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useCallback } from 'react'
import axios from 'axios'

const defaultSurveyJson = {
    pages: [{
        name: "Demographics",
        elements: [{
            type: "panel",
            title: "Demographic Information",
            elements: [{
                type: "text",
                name: "UserFirstName",
                title: "Enter your first name..."
            }, {
                type: "text",
                name: "UserLastName",
                title: "Enter your last name..."
            }]
        }]
    }]
}

const serverUrl = 'https://websurvey.biskilog.com/api'

export function SurveyTaker() {
    const surveyComplete = useCallback((sender) => {
        saveSurveyResults(
            serverUrl + '/' + crypto.randomUUID(),
            sender.data
        )
    }, [])

    const surveyModel = new Model(defaultSurveyJson)
    surveyModel.onComplete.add(surveyComplete)

    return <Survey model={surveyModel} />
}

async function saveSurveyResults(url, json) {
    try {
        const response = await axios.post(url,
            json,
            { headers: { "Content-Type": "application/json" } }
        )
        if (response.status === 200) console.log("Survey sent successfully")
    } catch (err) {
        console.error(err)
    }
}