import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { addToLibrary, getUserBooksFromDataset, getUserBooksFromLibrary, removeFromLibrary, searchBooksByTitle } from "../../api/library";
import { Navbar } from "../components/Navbar";
import { BookInterface } from "../../utils/interfaces";
import { DatasetBookTable } from "../components/tables/datasetUserTable/DatasetBookTable";
import { StandardLibraryPage } from "./StandardLibraryPage";

export const UserLibraryPage = () => {
  const { isDatasetUser } = useAuth();
  return (
    <div>
      <Navbar></Navbar>
      {isDatasetUser ? (
        <DatasetLibraryPage></DatasetLibraryPage>
      ) : (
        <StandardLibraryPage></StandardLibraryPage>
      )}
    </div>
  );
}

export const DatasetLibraryPage = () => {
  const [booksFromDataset, setBooksFromDataset] = useState<BookInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBooksFromDataset = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await getUserBooksFromDataset();
      setBooksFromDataset(fetchedBooks);
    } catch (error) {
      console.error("Error loading books from library", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooksFromDataset();
  }, []);

  return(
    <div>
      <div className="mini-header">
        <div className="header-content">
          <h1 className="header-title">Discover your library</h1>
          <p className="header-subtitle">
            <p>
              Welcome to a personalized chapter of your reading journey. As a treasured reader with a history of sharing insights, your reviews have already woven a rich tapestry of literature. Here, in your curated library, each book holds a story you've encountered, each review a reflection of your thoughts.
            </p>
            <i>
              Wander through your reviews, revisit the narratives that stirred your spirit, and re-engage with the dialogues you've contributed to. This space is a homage to the reading milestones you've shared with us.
            </i>
            <br></br>
            <br></br>
            <b>
              Please note, as a valued contributor from our GoodReads dataset, your library here is a special collection of the books you've reviewed. While new additions are not possible in this unique library view (unless imported), we invite you to explore and enjoy the reflections of your literary past.
            </b>
          </p>
        </div>
        <div className="header-svg">
          <img src={"assets/images/library-page-image.svg"} alt="Your SVG" />
        </div>
      </div>
      <div style={{ margin: "50px", userSelect: "none" }}>
        {loading ? (
          <div>Loading books from the library...</div>
        ) : booksFromDataset.length > 0 ? (
          <>
            <DatasetBookTable userBooks={booksFromDataset}></DatasetBookTable> 
            <button className="import-from-goodreads-button" onClick={() => alert("Future improvement!")}> Import from goodreads</button>
          </>
        ) : (
          <div>Your library is empty.</div>
        )}
      </div>
    </div>
  )
}