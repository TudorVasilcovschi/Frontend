import { addToLibrary, removeFromLibrary } from "../api/library";
import { ADD_ACTION, MARK_AS_ADDED, MARK_AS_REMOVED, REMOVE_ACTION } from "./constants";
import { ActionType, BookInterface, BookListStateTuplesArray, SetBooksFunction } from "./interfaces";

// Utility function to handle marking a book as added
export const updateBookListMarkAsAdded = (books: BookInterface[], setBooks: SetBooksFunction, bookId: number): void => {
  const updatedBooks = books.map((book) => {
    if (book.book_id === bookId) {
      return { ...book, user_has_book: true };
    }
    return book;
  });
  setBooks(updatedBooks);
};

// Utility function to handle marking as removed a book (the book is not deleted from the list/table)
export const updateBookListMarkAsRemoved = (
  books: BookInterface[],
  setBooks: SetBooksFunction,
  bookId: number
): void => {
  const updatedBooks = books.map((book) => {
    if (book.book_id === bookId) {
      return { ...book, user_has_book: false };
    }
    return book;
  });
  setBooks(updatedBooks);
};

// Utility function to handle removing a book (the book is deleted from the list/table)
export const updateBookListRemove = (books: BookInterface[], setBooks: SetBooksFunction, bookId: number): void => {
  const updatedBooks = books.filter((book) => book.book_id !== bookId);
  setBooks(updatedBooks);
};

// Utility function to handle adding a book (the book is added to the list/table)
export const updateBookListAdd = (books: BookInterface[], setBooks: SetBooksFunction, book: BookInterface): void => {
  const updatedBooks = [...books, { ...book, user_has_book: true }];
  setBooks(updatedBooks);
};

// Define updating frontend and backend
export const handleBookListChange = async (bookId: number, action: ActionType, bookLists: BookListStateTuplesArray) => {
  try {
    // Decide on the operation to perform based on the action
    const operation =
      action === ADD_ACTION || action === MARK_AS_ADDED
        ? addToLibrary
        : action === REMOVE_ACTION || action === MARK_AS_REMOVED
        ? removeFromLibrary
        : null;
    // call API backend
    if (operation) {
      await operation(bookId);
    }

    // Decide on the update function to use
    const updateFunction =
      action === MARK_AS_ADDED
        ? updateBookListMarkAsAdded
        : action === REMOVE_ACTION
        ? updateBookListRemove
        : action === MARK_AS_REMOVED
        ? updateBookListMarkAsRemoved
        : null;
    // update all lists from frontend
    if (updateFunction) {
      bookLists.forEach(([books, setBooks]) => {
        updateFunction(books, setBooks, bookId);
      });
    } else {
      console.warn("Invalid action provided:", action);
    }
  } catch (error) {
    console.error("Error updating book status in the library", error);
  }
};
