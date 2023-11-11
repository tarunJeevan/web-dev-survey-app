import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import 'survey-core/defaultV2.min.css'
import 'survey-creator-core/survey-creator-core.min.css'
import axios from 'axios'

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true,
    showJSONEditorTab: false
}

// Default survey data
const defaultJSON = {
    pages: [{
        name: "Name",
        elements: [{
            name: "FirstName",
            title: "Enter your first name:",
            type: "text"
        }, {
            name: "LastName",
            title: "Enter your last name:",
            type: "text"
        }]
    }]
}

// Server endpoint to save survey data in the database
const SERVER_URL = ''

export function SurveyBuilder() {
    const creator = new SurveyCreator(creatorOptions)
    creator.text = window.localStorage.getItem('survey-json') || JSON.stringify(defaultJSON)

    creator.saveSurveyFunc = (saveNo, callback) => {
        // Local storage version
        window.localStorage.setItem('survey-json', creator.text)
        callback(saveNo, true)

        // Server version
        // saveSurveyJson(SERVER_URL, creator.JSON, saveNo, callback)
    }

    return (
        <SurveyCreatorComponent creator={creator} />
    )
}

async function saveSurveyJson(url, json, saveNo, callback) {
    // Use axios?
    try {
        const response = await axios.post(url, json,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        callback(saveNo, true)
    } catch (err) {
        console.error(err)
        callback(saveNo, false)
    }
}