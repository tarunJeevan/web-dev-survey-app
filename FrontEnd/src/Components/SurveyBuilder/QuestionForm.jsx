import { useRef } from "react"

export function QuestionForm({ typeValue, setSurveyJson, setShowDetails }) {
    const requiredRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const textRangeRef = useRef()
    const rateMaxRef = useRef()
    const choicesRef = useRef()

    const addNewQuestion = e => {
        e.preventDefault()

        const isRequired = requiredRef.current.value === 'yes' ? true : false
        const questionTitle = titleRef.current.value
        const questionDescription = descRef.current.value
        const textMaxLength = typeValue === 'text' ? Number(textRangeRef.current.value) : 0
        const maxRating = typeValue === 'rating' ? Number(rateMaxRef.current.value) : 0
        const choicesArray = (typeValue !== 'text' && typeValue !== 'comment' && typeValue !== 'boolean' && typeValue !== 'rating')
            ? choicesRef.current.value.split(',')
            : []

        const element = createQuestionJson(
            typeValue,
            isRequired,
            questionTitle,
            questionDescription,
            textMaxLength,
            maxRating,
            choicesArray
        )

        setSurveyJson((prevJson) => {
            return {
                pages: [{
                    name: "Page1",
                    elements: [
                        ...prevJson.pages[0].elements,
                        element
                    ]
                }]
            }
        })

        setShowDetails(false)
    }

    return (
        <form onSubmit={addNewQuestion} className="add-question-form">
            {/* Sets 'title' property */}
            <label htmlFor="questionTitle">Question Title</label>
            <input type="text" name="title" id="questionTitle" ref={titleRef} required autoFocus />

            {/* Sets 'description' property */}
            <label htmlFor="questionDesc">Description (Optional)</label>
            <input type="text" name="description" id="questionDesc" ref={descRef} defaultValue={''} />

            {/* Sets 'isRequired' property */}
            <label htmlFor="isRequired">Make the question required?</label>
            <input type="checkbox" name="required" id="isRequired" value={"yes"} ref={requiredRef} />

            {/* Sets 'maxLength' property for 'text' type questions */}
            {typeValue === 'text' &&
                <>
                    <label htmlFor="textRange">Character Limit</label>
                    <input
                        type="range"
                        id="textRange"
                        ref={textRangeRef}
                        min={requiredRef.current.value === 'yes' ? 1 : 0}
                        max={100} />
                </>
            }

            {/* Sets 'rateMax' property for 'rating' type questions */}
            {typeValue === 'rating' &&
                <>
                    <label htmlFor="rateMax">Maximum Rating Value</label>
                    <input type="number" id="rateMax" ref={rateMaxRef} placeholder="Default is 1-5" />
                </>
            }

            {/* Sets 'choices' property for 'ranking', 'dropdown', 'tagbox', 'radiogroup', and 'checkbox' type questions */}
            {(typeValue !== 'text' && typeValue !== 'rating' && typeValue !== 'comment' && typeValue !== 'boolean') &&
                <>
                    <label htmlFor="choices">Options</label>
                    <input type="text" id="choices" ref={choicesRef} placeholder="Ex: Honda, Mercedes, Toyota, ..." />
                </>
            }

            <button type="submit">Add</button>
        </form>
    )
}

function createQuestionJson(type, isRequired, title, description, textRange, rateMax, choices) {
    const name = title.replace(/\s/g, '')
    switch (type) {
        case 'text':
            return {
                type: type,
                name: name,
                title: title,
                description: description,
                isRequired: isRequired,
                maxLength: textRange
            }
        case 'rating':
            return {
                type: type,
                name: name,
                title: title,
                description: description,
                isRequired: isRequired,
                rateMax: rateMax
            }
        case 'ranking':
        case 'dropdown':
        case 'radiogroup':
        case 'checkbox':
        case 'tagbox':
            return {
                type: type,
                name: name,
                title: title,
                description: description,
                isRequired: isRequired,
                choices: choices
            }
        default:
            return {
                type: type,
                name: name,
                title: title,
                description: description,
                isRequired: isRequired,
            }
    }
}
