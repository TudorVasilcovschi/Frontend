import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useState } from "react";
import { BookInterface } from "../../utils/interfaces";

interface BooksTableInterface {
  books: BookInterface[];
  onAddBook?: (book_id: number) => any;
  onRemoveBook?: (book_id: number) => any;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export const INITIAL_PAGE_NUMBER = 0;
export const ROWS_PER_PAGE = 5;

export const BooksTable = ({ books, onAddBook, onRemoveBook }: BooksTableInterface) => {
  // State for pagination
  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  // Handle change page (go to next page when you click left/right arrow)
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle change rows per page (when user selects from the dropdown how many )
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(INITIAL_PAGE_NUMBER);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
            { (onAddBook || onRemoveBook) && (<TableCell>Actions</TableCell>)}
              <TableCell>Title</TableCell>
              <TableCell>Publication Year</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Link to Goodreads</TableCell>
              <TableCell>Number of Pages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {((rowsPerPage > 0) ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : books).map(
              (book) => (
                <TableRow key={book.book_id} sx={{ backgroundColor: book.user_has_book ? "#d2e29b" : "inherit" }}>
                  { (onAddBook || onRemoveBook) && (
                  <TableCell>
                    {book.user_has_book ? (
                      // Check if onRemoveBook is defined before rendering the IconButton
                      onRemoveBook && (
                        <IconButton onClick={() => onRemoveBook(book.book_id)} aria-label="Delete from library">
                          <RemoveIcon />
                        </IconButton>
                      )
                    ) : (
                      // Check if onAddBook is defined before rendering the IconButton
                      onAddBook && (
                        <IconButton onClick={() => onAddBook(book.book_id)} aria-label="Add to library">
                          <AddIcon />
                        </IconButton>
                      )
                    )}
                  </TableCell>
                )}
                  <TableCell component="th" scope="row">
                    {book.title_without_series}
                  </TableCell>
                  <TableCell>{book.publication_year}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.average_rating}</TableCell>
                  {/* <TableCell>
                    <img src={book.image_url} alt={book.title_without_series} style={{ width: "75%" }} />
                  </TableCell> */}
                  <TableCell>
                    <a href={book.url} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  </TableCell>
                  <TableCell>{book.num_pages}</TableCell>
                </TableRow>
              )
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 5, 10, { label: "All", value: -1 }]}
              colSpan={3}
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    </Paper>
  );
};
