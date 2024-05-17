export const LoadingRecommendations = () => {
    return(
        <div className="mini-header" style={{userSelect: "none"}}>
            <div className="header-content">
            <h1 className="header-title">Loading...</h1>
            <div className="header-subtitle"  style={{fontSize: '24px'}}>
                We are currently analyzing your library and getting the best recommendations. This could take a few minutes, please wait!
            </div>
            </div>
            <div className="header-svg">
            <img src={"assets/images/loading.svg"} alt="Your SVG" />
            </div>
        </div>
    )
}