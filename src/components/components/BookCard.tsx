import { FaPlusCircle, FaExternalLinkAlt, FaMinusCircle } from "react-icons/fa"; // Import specific icons
import { BookInterface } from "../../utils/interfaces";

export interface BookCardInterface {
  book: BookInterface;
  onAddBook: () => void;
  onRemoveBook: () => void;
}

export const BookCard = ({ book, onAddBook, onRemoveBook }: BookCardInterface) => {
  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={book.image_url} alt={book.title_without_series} className="book-image" />
      </div>
      <div className="book-info">
        <div className="book-title">{book.title_without_series}</div>
        <div className="book-rating">Rating: {book.average_rating}</div>
        <div className="book-pages">{book.num_pages} pages</div>
      </div>
      <div className="book-actions">
        {book.user_has_book ? (
          <button className="button button-remove-icon" aria-label="Remove from Library" onClick={onRemoveBook}>
            <FaMinusCircle />
          </button>
        ) : (
          <button className="button" aria-label="Add to Library" onClick={onAddBook}>
            <FaPlusCircle />
          </button>
        )}
        <button className="button" aria-label="View on Goodreads" onClick={() => window.open(book.url, "_blank")}>
          <FaExternalLinkAlt />
        </button>
      </div>
    </div>
  );
};
