import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRef } from "react"
import "./SurveyBuilder.css"

const allQuestionTypes = [
    { name: 'Textbox', type: 'text' },
    { name: 'Multiple Textboxes', type: 'multipletext' },
    { name: 'Comment', type: 'comment' },
    { name: 'Radio Button Group', type: 'radiogroup' },
    { name: 'Rating Scale', type: 'rating' },
    { name: 'Checkboxes', type: 'checkbox' },
    { name: 'Dropdown', type: 'dropdown' },
    { name: 'Multi-Select Dropdown', type: 'tagbox' },
    { name: 'Yes/No', type: 'boolean' },
    { name: 'Ranking', type: 'ranking' },
    { name: 'Image Picker', type: 'imagepicker' },
    { name: 'Single-Select Matrix', type: 'matrix' }
]

export function SurveyBuilder() {
    const surveyModel = new Model()

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>
                {allQuestionTypes.map((value, index) => {

                    return <QuestionTypeButton key={index} title={value.name} typeValue={value.type} surveyModel={surveyModel} />
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
    const inputRef = useRef()

    const addNewQuestion = e => {
        e.preventDefault()

        // TODO: Get form data and create new question to add to surveyQuestions

        inputRef.current.value = ''
        dialogRef.current.close()
    }

    return <>
        <div className='question-type'>
            {title}
            <button className='add-question-btn' onClick={e => dialogRef.current.showModal()}>Add</button>
        </div>

        <dialog className='add-question-dialog' ref={dialogRef}>
            <form className='add-question-form' onSubmit={addNewQuestion}>
                <label htmlFor="title-input">Question Title</label>
                <input type="text" ref={inputRef} id="title-input" placeholder='Enter question...' />
                <div className='dialog-btns'>
                    <button type='submit'>Create</button>
                    <button onClick={e => dialogRef.current.close()}>Cancel</button>
                </div>
            </form>
        </dialog>
    </>
}