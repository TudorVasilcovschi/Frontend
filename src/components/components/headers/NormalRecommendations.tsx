
export const NormalRecommendations = () => {
    return(
        <div className="mini-header" style={{userSelect: "none"}}>
            <div className="header-content">
            <h1 className="header-title">Recommendations</h1>
            <div className="header-subtitle"  style={{fontSize: '24px'}}>
            Explore a wide range of books that share similarities with your favorite titles by entering either the name of the book, a brief description of its contents, or simply by selecting a book from your own collection. Whether you're looking for something similar to a recent favorite or trying to find books that match a specific style or theme, this tool helps you broaden your literary horizons with personalized recommendations based on your input.            </div>
            </div>
            <div className="header-svg">
            <img src={"assets/images/normal-recom.svg"} alt="Your SVG" style={{marginTop: "5rem"}}/>
            </div>
        </div>
    )
}