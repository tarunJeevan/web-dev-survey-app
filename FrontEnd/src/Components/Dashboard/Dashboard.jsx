import './Dashboard.css'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SurveyCard from './SurveyCard'

export function Dashboard() {
    const [query, setQuery] = useState("")
    const [surveys, setSurveys] = useState([
        {
            id: crypto.randomUUID(),
            name: "Example survey 1",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey 2",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey 3",
            description: "Description"
        },
        {
            id: crypto.randomUUID(),
            name: "Example survey 4",
            description: "Description"
        }])

    const toggleArrow = (index) => {
        // Use useRef?
        let arrow = document.getElementById(index)
        arrow.innerHTML = (arrow.innerHTML === "⊳") ? "&#x22BF;" : "&#x22B3;"
    }

    // Get a list of surveys filtered by name
    const filteredList = useMemo(() => {
        return surveys.filter(survey => {
            return survey.name.toLowerCase().includes(query.toLowerCase())
        })
    }, [surveys, query])

    return (
        <>
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <NewSurveyButton>

                </NewSurveyButton>

                {/* Search bar to find surveys */}
                <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder='Filter by survey name...' />
            </div>

            <div className='survey-container'>
                {filteredList.map((survey, index) => {

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