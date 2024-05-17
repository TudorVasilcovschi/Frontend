export const FindNewBooks = () => {
    return (
        <div className="mini-header">
          <div className="header-content">
            <h1 className="header-title">Find new books</h1>
            <div className="header-subtitle">
              <p>
                Welcome to your very own literary sanctuary. Here, every story unfolds a new horizon, every book is a
                doorway to endless possibilities. Within this space, you can effortlessly view your treasured collection
                of narratives and novels, all carefully cataloged and easily accessible at any moment.
              </p>
              <i>
                Embark on the path to your next great read with our flexible search feature. Set the search mode to 'True'
                for an exact match, pinpointing titles that include your query as a standalone word, ensuring precision
                and relevance in every result. Alternatively, set the search mode to 'False' to enable a more expansive
                search, identifying titles that contain your query within any part of a word, casting a wider net for your
                literary catch.
              </i>
              <br></br>
              <br></br>
              <i>
                As your library grows and crosses the threshold of 20 books, a new realm of discovery awaits you. Our
                tailored recommendation system activates, offering both content-based suggestions that resonate with your
                reading habits, and collaborative filtering techniques that bring you choices inspired by fellow readers
                with similar tastes. It's like having a personal librarian who knows your every literary love.
              </i>
            </div>
          </div>
          <div className="header-svg">
            <img src={"assets/images/library-page-image.svg"} alt="Your SVG" />
          </div>
        </div>
    )
}