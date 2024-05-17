import { useState, useEffect } from "react";
import { searchBooksByTitle, addToLibrary, removeFromLibrary, getUserBooksFromLibrary } from "../../api/library";
import { useAuth } from "../../context/authContext";
import { BookInterface } from "../../utils/interfaces";
import { BooksTable } from "../components/BookTable";
import { UserBooksTable } from "../components/BookTableLibrary";
import { FindNewBooks } from "../components/headers/FindNewBooks";
import { YourLibrary } from "../components/headers/YourLibrary";

export const StandardLibraryPage = () => {
    const { token } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<BookInterface[]>([]);
    const [booksInLibrary, setBooksInLibrary] = useState<BookInterface[]>([]);
    const [loading, setLoading] = useState(false);
  
    // search books by title
    const searchBooks = async (title: string) => {
      console.log("Searching for books with title:", title);
      try {
        const fetchedBooks = await searchBooksByTitle(title);
        setSearchResults(fetchedBooks); // Update the state with the fetched books
      } catch (error) {
        console.error("Error loading books from library", error);
      } finally {
        setLoading(false); // Indicate that loading has finished
      }
    };
  
    // update tables after adding/removing from library
    const updateBookInSearchResults = (bookId: number, userHasBook: boolean) => {
      setSearchResults(
        searchResults.map((book) => {
          if (book.book_id === bookId) {
            return { ...book, user_has_book: userHasBook };
          }
          return book;
        })
      );
    };
  
    const handleRemoveBookFromLibrary = (bookId: number) => {
      // Filter out the book that needs to be removed
      setBooksInLibrary(booksInLibrary.filter((book) => book.book_id !== bookId));
    };
  
    const handleAddBookToLibrary = (book: BookInterface) => {
      // Include the new book in the booksInLibrary state
      setBooksInLibrary([...booksInLibrary, { ...book, user_has_book: true }]);
    };
  
    const handleAddBook = (bookId: number) => {
      addToLibrary(bookId)
        .then((addedBook) => {
          // If the API call is successful and the added book details are returned, update the frontend state
          handleAddBookToLibrary(addedBook);
          updateBookInSearchResults(bookId, true);
        })
        .catch((error) => {
          console.error("Error adding book to the library", error);
        });
    };
  
    const handleRemoveBook = (bookId: number) => {
      removeFromLibrary(bookId)
        .then(() => {
          // If the API call is successful, update the frontend state
          updateBookInSearchResults(bookId, false);
          handleRemoveBookFromLibrary(bookId);
        })
        .catch((error) => {
          console.error("Error removing book from the library", error);
        });
    };
  
    // get user books
    const loadBooksInLibrary = async () => {
      setLoading(true); // Indicate that loading has started
      try {
        const fetchedBooks = await getUserBooksFromLibrary();
        setBooksInLibrary(fetchedBooks); // Update the state with the fetched books
      } catch (error) {
        console.error("Error loading books from library", error);
      } finally {
        setLoading(false); // Indicate that loading has finished
      }
    };
  
    useEffect(() => {
      if (token) {
        loadBooksInLibrary();
      }
    }, [token]);
  
    if (!token) return <div>You are not logged in!</div>;
  
    return (
      <div>
        <FindNewBooks></FindNewBooks>
        <div className="search-books-section" style={{userSelect: "none"}}>
          <div className="search-books-section-left">
            <h1>Find Your Next Read</h1>
            <div className="search-books-section-title-search">
              <label>Search for title: </label>
              <input
                type="text"
                placeholder="Enter title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} //todo adauga sa reseteze pagina inca odata
                style={{ width: "60%" }}
              />
            </div>
            <br></br>
            <button className="search-books-section-button" onClick={() => searchBooks(searchTerm)}>
              Search
            </button>
          </div>
          <div className="search-books-section-right">
            <BooksTable books={searchResults} onAddBook={handleAddBook} onRemoveBook={handleRemoveBook}></BooksTable>
          </div>
        </div>
  
        <YourLibrary></YourLibrary>
        <div style={{ margin: "50px" }}>
          {loading ? (
            <div>Loading your library...</div>
          ) : booksInLibrary.length > 0 ? (
            <UserBooksTable userBooks={booksInLibrary} onRemoveBook={handleRemoveBook}></UserBooksTable>
          ) : (
            <div>Your library is empty.</div>
          )}
        </div>
      </div>
    );
  };
  