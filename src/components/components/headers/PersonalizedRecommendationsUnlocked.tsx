interface PersonalizesdRecommendationsUnlockedProps {
    fetchRecommendations: () => void;
}

export const PersonalizedRecommendationsUnlocked = ({fetchRecommendations}: PersonalizesdRecommendationsUnlockedProps) => {
    return(
        <div className="mini-header" style={{userSelect: "none"}}>
            <div className="header-content">
            <h1 className="header-title">Recommendations</h1>
            <div className="header-subtitle"  style={{fontSize: '24px'}}>
                Since you aleardy have a Goodreads account, you have unlocked these personalized recommendations. The recommendations that you are seeing are either based on what other users similar to you are reading, or based on your current library.
            </div>
            <button onClick={fetchRecommendations} className="import-from-goodreads-button">
                Refresh Recommendations
            </button>
            </div>
            <div className="header-svg">
            <img src={"assets/images/content-unlocked.svg"} alt="Your SVG" style={{marginTop: "5rem"}}/>
            </div>
        </div>
    )
}