import { useRef } from "react"


export function QuestionForm({ typeValue }) {
    const requiredRef = useRef()

    return (
        <form action="">
            {/* Sets 'title' property */}
            <label htmlFor="questionTitle">Question Title</label>
            <input type="text" name="title" id="questionTitle" required />

            {/* Sets 'description' property */}
            <label htmlFor="questionDesc">Description (Optional)</label>
            <input type="text" name="description" id="questionDesc" />

            {/* Sets 'isRequired' property */}
            <label htmlFor="isRequired">Make the question required?</label>
            <input type="checkbox" name="required" id="isRequired" value={"yes"} ref={requiredRef} />

            {typeValue == 'text' &&
                <>
                    <label htmlFor="textRange">Character Limit</label>
                    <input
                        type="range"
                        id="textRange"
                        min={requiredRef.current.value == 'yes' ? 1 : 0}
                        max={100} />
                    {/* TODO: Convert the value of this input into 'maxLength' numeric property */}
                </>
            }

            {typeValue == 'rating' &&
                <>
                    <label htmlFor="rateMax">Maximum Rating Value</label>
                    <input type="number" id="rateMax" placeholder="Default is 1-5" />
                    {/* TODO: Convert the value of this input to 'rateMax' property */}
                </>
            }

            {(typeValue !== 'text' && typeValue !== 'rating' && typeValue !== 'comment' && typeValue !== 'boolean') &&
                <>
                    <label htmlFor="choices">Options</label>
                    <input type="text" id="choices" placeholder="Ex: Honda, Mercedes, Toyota, ..." />
                    {/* TODO: Convert the value of this input to a choices array */}
                </>
            }
        </form>
    )
}
