import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { useRef, useState } from "react"
import "./SurveyBuilder.css"

const allQuestionTypes = [
    { name: 'Textbox', type: 'text' },
    { name: 'Comment', type: 'comment' },
    { name: 'Radio Button Group', type: 'radiogroup' }, // TODO: Needs additional options
    { name: 'Rating Scale', type: 'rating' }, // TODO: Needs additional options
    { name: 'Checkboxes', type: 'checkbox' }, // TODO: Needs additional options
    { name: 'Dropdown', type: 'dropdown' }, // TODO: Needs additional options
    { name: 'Multi-Select Dropdown', type: 'tagbox' }, // TODO: Needs additional options
    { name: 'Yes/No', type: 'boolean' },
    { name: 'Ranking', type: 'ranking' }, // TODO: Needs additional options
]

export function SurveyBuilder() {
    const [questionType, setQuestionType] = useState("")
    const [surveyJson, setSurveyJson] = useState({
        pages: [{
            name: "Page1",
            elements: []
        }]
    })
    const dialogRef = useRef()
    const inputRef = useRef()

    const survey = new Model(surveyJson)

    const addNewQuestion = e => {
        e.preventDefault()

        const title = inputRef.current.value

        setSurveyJson((prevJson) => {
            return {
                pages: [{
                    name: "Page1",
                    elements: [
                        ...prevJson.pages[0].elements,
                        {
                            type: questionType,
                            name: title.replace(/\s/g, ''),
                            title: title
                        }
                    ]
                }]
            }
        })

        inputRef.current.value = ''
        dialogRef.current.close()
    }

    const openModal = type => {
        inputRef.current.value = ''
        setQuestionType(type)
        dialogRef.current.showModal()
    }

    const closeModal = () => {
        dialogRef.current.close()
    }

    return (
        <div id="container">
            <aside id="question-types">
                <h2>Question Types</h2>

                {allQuestionTypes.map((value, index) => {

                    return <QuestionTypeButton key={index} title={value.name} typeValue={value.type} openFunc={openModal} />
                })}
            </aside>

            <main id="question-container">
                <Survey model={survey} />
            </main>

            <aside id="question-details">
                <h2>Details</h2>
                {/* TODO: Display form so users can set question details before adding to survey */}
            </aside>

            <dialog className='add-question-dialog' ref={dialogRef}>
                <form className='add-question-form' onSubmit={addNewQuestion}>
                    <label htmlFor="title-input">Question Title</label>
                    <input type="text" ref={inputRef} id="title-input" placeholder='Enter question...' required />
                    <div className='dialog-btns'>
                        <button type='submit'>Create</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

function QuestionTypeButton({ title, typeValue, openFunc }) {

    return (
        <div className='question-type'>
            {title}
            <button className='add-question-btn' onClick={e => openFunc(typeValue)}>Select</button>
        </div>
    )
}