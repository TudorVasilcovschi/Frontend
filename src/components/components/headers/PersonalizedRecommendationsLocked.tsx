export const PersonalizedRecommendationsLocked = () => {
    return(
        <div className="mini-header" style={{userSelect: "none"}}>
            <div className="header-content">
            <h1 className="header-title">Content locked</h1>
            <div className="header-subtitle" style={{fontSize: '24px'}}>
                Since you do not have a Goodreads account or you did not bind your existing Goodreads account to this account, the personalized recommendations are not available yet. The recommendations that you are seeing are either based on what other users similar to you are reading, or based on your current library.
            </div>
            <button onClick={() => alert("Future improvement!")} className="import-from-goodreads-button">
                Bind Goodreads Account
            </button>
            </div>
            <div className="header-svg">
            <img src={"assets/images/content-locked.svg"} alt="Your SVG" style={{marginTop: "5rem"}}/>
            </div>
        </div>
    )
}
