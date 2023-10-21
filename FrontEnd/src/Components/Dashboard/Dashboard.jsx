import './Dashboard.css'

export default function Dashboard() {

    const toggleArrow = (index) => {
        let arrow = document.getElementById(index)
        arrow.innerHTML = (arrow.innerHTML === "⊳") ? "&#x22BF;" : "&#x22B3;"
    }

    let surveys = [
        {
            name: "Example survey",
            description: "Description"
        },
        {
            name: "Example survey",
            description: "Description"
        },
        {
            name: "Example survey",
            description: "Description"
        },
        {
            name: "Example survey",
            description: "Description"
        }] // This variable should contain an array of surveys created by the user to be summarized here
        
    return (
        <>
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <NewSurveyButton>

                </NewSurveyButton>
            </div>

            {surveys.map((survey, index) => {

                return (
                    <details className="survey-summary" key={index}>
                        <summary onClick={() => toggleArrow(index)}>
                            {survey.name}
                            <span className="summary-arrow" id={index} >
                                &#x22B3;
                            </span>
                        </summary>
                        {survey.description}
                    </details>
                )
            })}
        </>
    )
}

// Survey button within the dashboard that creates new surveys onclick
function NewSurveyButton() {

    return (
        <>
            <button className="add-btn" data-descr="Create a new survey...">
                +  {/* Change to text or image if necessary */}
            </button>
        </>
    )
}