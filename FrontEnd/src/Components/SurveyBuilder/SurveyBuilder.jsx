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
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')

    const dateCreated = `${year}-${month}-${day}`
    // The survey's native saving function. Here's the documentation if you want to get a better idea of how it works.
    // Documentation: https://surveyjs.io/survey-creator/documentation/get-started-react#save-and-load-survey-model-schemas
    creator.saveSurveyFunc = (saveNo, callback) => {
        const survey = {
            id: 0,
            researcher: "",
            dateCreated: dateCreated,
            title: creator.JSON.title,
            description: creator.JSON.description,
            logoPosition: creator.JSON.LogoPosition,
            pages: JSON.stringify(creator.JSON.pages)
        }
        console.log(survey) // Just to see what a survey json object looks like
console.log(creator.JSON)
        // Sends the survey's json schema to the specified url
        // saveSurveyJson(
        //     'https://websurvey.biskilog.com/api/Survey/new',
        //     creator.JSON,
        //     saveNo,
        //     callback
        // )
    }

    return (
        < SurveyCreatorComponent creator={creator} />
    )
}

// Function to handle sending the data to the backend
async function saveSurveyJson(url, json, saveNo, callback) {
    const bearer = `Bearer ${localStorage.getItem('token')}`
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: { 'Authorization': bearer, 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
            }
        )

        if (response.status === 200)
            callback(saveNo, true)
        else
            callback(saveNo, false)
    } catch (err) {
        callback(saveNo, false)
    }
}