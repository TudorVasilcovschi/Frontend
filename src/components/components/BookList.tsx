import { BookCard } from "./BookCard";
import { BookInterface } from "../../utils/interfaces";

export interface BookListInterface {
  title: string;
  books: BookInterface[];
  onAddBook: (bookId: number) => void;
  onRemoveBook: (bookId: number) => void;
}

const BookList = ({ title, books, onAddBook, onRemoveBook }: BookListInterface) => {
  if (!books || books.length === 0) {
    return <div>No books to display</div>;
  }

  return (
    <div>
      <h2 className="list-title">{title}</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.book_id}
            book={book}
            onAddBook={() => onAddBook(book.book_id)}
            onRemoveBook={() => onRemoveBook(book.book_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
