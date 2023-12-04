import { useRef, useState } from "react"

export function QuestionForm({ typeValue, setSurveyJson, setShowDetails }) {
    const requiredRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const textRangeRef = useRef()
    const rateMaxRef = useRef()
    const choicesRef = useRef()

    const [rangeValue, setRangeValue] = useState(50)

    const addQuestion = e => {
        e.preventDefault()

        const isRequired = requiredRef.current.checked
        const questionTitle = titleRef.current.value
        const questionDescription = descRef.current.value
        const textMaxLength = typeValue === 'text' ? Number(textRangeRef.current.value) : 0
        const maxRating = typeValue === 'rating' ? Number(rateMaxRef.current.value) : 0
        const choicesArray = (typeValue !== 'text' && typeValue !== 'comment' && typeValue !== 'boolean' && typeValue !== 'rating')
            ? choicesRef.current.value.split(',')
            : []

        setSurveyJson(prevModel => {
            const name = questionTitle.replace(/\s/g, '')
            const page = prevModel.activePage || prevModel.getPageByName('Page1')

            const question = page.addNewQuestion(typeValue, name)
            question.title = questionTitle
            question.description = questionDescription
            question.isRequired = isRequired

            switch (typeValue) {
                case 'text':
                    question.maxLength = textMaxLength
                    break
                case 'rating':
                    question.rateMax = maxRating
                    break
                case 'ranking':
                case 'dropdown':
                case 'radiogroup':
                case 'checkbox':
                case 'tagbox':
                    question.choices = choicesArray
                    break
                default:
                    break
            }

            return prevModel
        })

        requiredRef.current.value = ''

        setShowDetails(false)
    }

    return (
        <form onSubmit={addQuestion} className="add-question-form">
            {/* Sets 'title' property */}
            <label htmlFor="questionTitle">Question Title</label>
            <input type="text" name="title" id="questionTitle" ref={titleRef} required autoFocus />

            {/* Sets 'description' property */}
            <label htmlFor="questionDesc">Description (Optional)</label>
            <input type="text" name="description" id="questionDesc" ref={descRef} defaultValue={''} />

            {/* Sets 'isRequired' property */}
            <label htmlFor="isRequired">Make the question required?</label>
            <input type="checkbox" name="required" id="isRequired" ref={requiredRef} />

            {/* Sets 'maxLength' property for 'text' type questions */}
            {typeValue === 'text' &&
                <>
                    <label htmlFor="textRange">Character Limit</label>
                    <div className="text-range">
                        <input
                            type="range"
                            id="textRange"
                            ref={textRangeRef}
                            min={0}
                            max={100}
                            value={rangeValue}
                            onChange={e => setRangeValue(e.target.value)}
                        />
                        <output>Max: {rangeValue}</output>
                    </div>
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
