import { ADD_ACTION, MARK_AS_ADDED, MARK_AS_REMOVED, REMOVE_ACTION } from "./constants";

export interface BookInterface {
  average_rating: number;
  book_id: number;
  image_url: string;
  num_pages: number;
  title_without_series: string;
  publication_year: number;
  publisher: string;
  url: string;
  user_has_book?: boolean;
  review_text?: string;
  rating?: number;
}

// Define a type for valid actions using the constants
export type ActionType = typeof ADD_ACTION | typeof REMOVE_ACTION | typeof MARK_AS_REMOVED | typeof MARK_AS_ADDED;

// Define a type for the function that sets books state
export type SetBooksFunction = React.Dispatch<React.SetStateAction<BookInterface[]>>;

// Define a type for the state and setState tuple for book lists
export type BookListStateTuple = [BookInterface[], SetBooksFunction];
export type BookListStateTuplesArray = BookListStateTuple[];
