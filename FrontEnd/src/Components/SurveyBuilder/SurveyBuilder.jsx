import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRef } from "react"
import "./SurveyBuilder.css"

const allQuestionTypes = [
    'text',
    'comment',
    'radiogroup',
    'rating',
    'checkbox',
    'dropdown',
    'tagbox',
    'boolean',
    'ranking',
    'imagepicker',
    'multipletext',
    'image',
    'matrix'
]

export function SurveyBuilder() {
    const surveyModel = new Model()

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>
                {allQuestionTypes.map((value, index) => {

                    return <QuestionTypeButton title={value} typeValue={value} surveyModel={surveyModel} />
                })}
            </aside>

            <main id="question-container">
                <Survey model={surveyModel} />
            </main>

            <aside id="question-details">
                <h2>Details</h2>
            </aside>
        </div>
    )
}

function QuestionTypeButton({ title, typeValue, surveyModel }) {
    const dialogRef = useRef()

    const addNewQuestion = e => {
        e.preventDefault()

        // TODO: Get form data and create new question to add to surveyQuestions

        dialogRef.current.close()
    }

    const openModal = () => {
        dialogRef.current.showModal()
    }

    return <>
        <div className='question-type'>
            {title}
            <button className='add-btn' onClick={openModal}>Add</button>
        </div>

        <dialog className='add-question-dialog' ref={dialogRef}>
            <form className='add-question-form' onSubmit={addNewQuestion}>
                <button className='create-btn' type='submit'>Create</button>
            </form>
        </dialog>
    </>
}