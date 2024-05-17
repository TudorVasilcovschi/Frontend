import { useEffect, useState } from "react";
import { getUserBooksFromDataset, getUserBooksFromLibrary } from "../../api/library";
import { useAuth } from "../../context/authContext";
import { BookInterface } from "../../utils/interfaces";
import { Navbar } from "../components/Navbar";
import { contentRecommendations, itemSimilarityRecommendations, similarDescriptionsRecommendations, similarReviewsRecommendations, similarTitlesRecommendations, svdRecommendations, userSimilarityRecommendations } from "../../api/recommendation";
import { BooksTable } from "../components/BookTable";
import { UserBooksTable } from "../components/BookTableLibrary";
import { NormalRecommendations } from "../components/headers/NormalRecommendations";

export const RecommendPage = () => {
  const { token, isDatasetUser } = useAuth();
  const [booksInLibrary, setBooksInLibrary] = useState<BookInterface[]>([]);
  const [top10SimilarTitleBooks, setTop10SimilarTitleBooks] = useState<BookInterface[]>([]);
  const [top10SimilarDescriptionBooks, setTop10SimilarDescriptionBooks] = useState<BookInterface[]>([]);
  const [top10SimilarReviewsBooks, setTop10SimilarReviewsBooks] = useState<BookInterface[]>([]);


  const [selectedBookTitle, setSelectedBookTitle] = useState('');
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermDescription, setSearchTermDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooksInLibrary = async () => {
    setLoading(true); // Indicate that loading has started
    try {
      let fetchedBooks ;
      if (isDatasetUser) {
        fetchedBooks = await getUserBooksFromDataset();
      } else {
        fetchedBooks = await getUserBooksFromLibrary();
      }
      
      setBooksInLibrary(fetchedBooks); // Update the state with the fetched books
    } catch (error) {
      console.error("Error loading books from library", error);
    } finally {
      setLoading(false); // Indicate that loading has finished
    }
  };

  useEffect(() => {
    loadBooksInLibrary();
  }, []);


  const searchBooksByTitle = async (title: string) => {
    console.log("Searching for books with title: ", title);
    try {
      const fetchedBooks = await similarTitlesRecommendations(title);
      setTop10SimilarTitleBooks(fetchedBooks);
    } catch (error) {
      console.error("Error loading books from library", error);
    }
  };

    const searchBooksByDescription = async (description: string) => {
      console.log("Searching for books with description: ", description);
      try {
        const fetchedBooks = await similarDescriptionsRecommendations(description);
        setTop10SimilarDescriptionBooks(fetchedBooks);
      } catch (error) {
        console.error("Error loading books from library", error);
      }
    };

    const searchBooksBySimilarReviews = async (book_id: number) => {
      console.log("Searching for books with similar review as the book with id: ", book_id);
      try {
        const fetchedBooks = await similarReviewsRecommendations(book_id);
        setTop10SimilarReviewsBooks(fetchedBooks);
      } catch (error) {
        console.error("Error loading books from library", error);
      }
    };

    const bookReviewSelected = (bookId: number) => {
      const selectedBook = booksInLibrary.find(book => book.book_id === bookId);
      if (selectedBook) {
        setSelectedBookTitle(selectedBook.title_without_series);
        searchBooksBySimilarReviews(bookId);
      }
    }


  return (<div>
    <Navbar></Navbar>
    <NormalRecommendations></NormalRecommendations>
    <div>
      <div className="search-books-section">
        <div className="search-books-section-left">
          <h1>Recommend by title</h1>
          <div className="search-books-section-title-search">
            <label>Search for title: </label>
            <input
              type="text"
              placeholder="Enter title..."
              value={searchTermTitle}
              onChange={(e) => setSearchTermTitle(e.target.value)} //todo adauga sa reseteze pagina inca odata
              style={{ width: "60%" }}
            />
          </div>
          <br></br>
          <div className="search-books-section-info">
            Get books based on title similarity.
          </div>
          <br></br>
          <button className="search-books-section-button" onClick={() => searchBooksByTitle(searchTermTitle)}>
            Search
          </button>
        </div>
        <div className="search-books-section-right">
          <BooksTable books={top10SimilarTitleBooks}></BooksTable>
        </div>
      </div>

      <div className="search-books-section">
        <div className="search-books-section-left">
          <h1>Recommend by description</h1>
          <div className="search-books-section-title-search">
            <label>Search for description: </label>
            <textarea
              placeholder="Enter description..."
              value={searchTermDescription}
              onChange={(e) => setSearchTermDescription(e.target.value)} //todo adauga sa reseteze pagina inca odata
              style={{ width: "60%" }}
            />
          </div>
          <br></br>
          <div className="search-books-section-info">
            Get books based on description similarity.
          </div>
          <br></br>
          <button className="search-books-section-button" onClick={() => searchBooksByDescription(searchTermDescription)}>
            Search
          </button>
        </div>
        <div className="search-books-section-right">
          <BooksTable books={top10SimilarDescriptionBooks}></BooksTable>
        </div>
      </div>

      <div>
          {token ? (
            loading ? (
              <div>Loading your library...</div>
            ) : booksInLibrary.length > 0 ? (
              <div className="search-books-section">
                <div className="search-books-section-left-similar-reviews">
                  <h1>Recommend by similar reviews</h1>
                  <UserBooksTable userBooks={booksInLibrary} onSelectBook={(bookId) => bookReviewSelected(bookId)}></UserBooksTable>
                  <br></br>
                  <div className="search-books-section-info">
                    Select a book from your library and get recommendations based on similar reviews.
                  </div>
                </div>
                <div className="search-books-section-right-similar-reviews">
                  {selectedBookTitle && <h2>Similar reviews to book: {selectedBookTitle}</h2>}
                  <BooksTable books={top10SimilarReviewsBooks}></BooksTable>
                </div>
              </div>
            ) : (
              <div>Your library is empty.</div>
            )
          ) : (
          <div>You need to have an account and be logged in to view your library.</div>
        )}
      </div>

    </div>
  </div>);
};
