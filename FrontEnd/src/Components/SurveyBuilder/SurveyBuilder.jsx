import 'survey-core/defaultV2.min.css'
import 'survey-creator-core/survey-creator-core.min.css'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'

// Options to determine what things users can see on the survey editor
const creatorOptions = {
    showJSONEditorTab: false,
    showLogicTab: true,
    showSaveButton: true // Adds a save button to the editor that calls 'saveSurveyFunc' when clicked
}

export function SurveyBuilder() {
    // Survey creator object that contains the data that <SurveyCreatorComponent /> uses to render the editor
    const creator = new SurveyCreator(creatorOptions)

    // The survey's native saving function. Here's the documentation if you want to get a better idea of how it works.
    // Documentation: https://surveyjs.io/survey-creator/documentation/get-started-react#save-and-load-survey-model-schemas
    creator.saveSurveyFunc = (saveNo, callback) => {
        console.log(creator.JSON) // Just to see what a survey json object looks like

        // Sends the survey's json schema to the specified url
        saveSurveyJson(
            'https://websurvey.biskilog.com/api/Survey/new',
            creator.JSON,
            saveNo,
            callback
        )
    }

    return (
        < SurveyCreatorComponent creator={creator} />
    )
}

// Function to handle sending the data to the backend
async function saveSurveyJson(url, json, saveNo, callback) {
    const bearer = `Bearer ${localStorage.getItem('token')}`

    const today = new Date().toISOString()
    const researcher = localStorage.getItem('username')
    const pages = JSON.stringify(json.pages)
    const title = json.title
    const description = json.description
    const logoPosition = json.logoPosition
    const logo = json.logo

    const responseBody = {
        id: 0,
        title: title,
        description: description,
        logoPosition: logoPosition,
        pages: pages,
        dateCreated: today,
        logo: logo,
        researcher: researcher
    }
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: { 'Authorization': bearer, 'Content-Type': 'application/json' },
                body: JSON.stringify(responseBody)
            }
        )

        if (response.status === 200) {
            console.log('saved successfully')
            callback(saveNo, true)
        }
        else {
            console.log('saving failed')
            callback(saveNo, false)
        }
    } catch (err) {
        callback(saveNo, false)
    }
}