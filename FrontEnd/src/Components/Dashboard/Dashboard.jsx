import './Dashboard.css'
import SurveyCard from './SurveyCard'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {

    const toggleArrow = (index) => {
        let arrow = document.getElementById(index)
        arrow.innerHTML = (arrow.innerHTML === "⊳") ? "&#x22BF;" : "&#x22B3;"
    }

    // This variable should contain an array of surveys created by the user to be summarized here
    let surveys = [
        {
            id: crypto.randomUUID(),
            name: "Example survey",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey",
            description: "Description"
        }]

    return (
        <>
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <NewSurveyButton>

                </NewSurveyButton>
            </div>

            <div className='survey-container'>
                {surveys.map((survey, index) => {

                    return (
                        <details className="survey-details" key={survey.id}>
                            <summary onClick={() => toggleArrow(index)}>
                                {survey.name}
                                <span className="summary-arrow" id={index} >
                                    &#x22B3;
                                </span>
                            </summary>
                            <SurveyCard surveyID={survey.id} />
                        </details>
                    )
                })}
            </div>
        </>
    )
}

// Survey button within the dashboard that creates new surveys onclick
function NewSurveyButton() {
    const navigate = useNavigate()

    return (
        <>
            <button className="add-btn" data-descr="Create a new survey..." onClick={() => navigate("/creator")}>
                Add  {/* Change to text or image if necessary */}
            </button>
        </>
    )
}