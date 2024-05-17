import axios from "./axios";

export const addToLibrary = async (bookId: number) => {
  console.log("Adding book to library:", bookId);
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "/library/add-book",
      { book_id: bookId },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );

    console.log(response);
    // alert("Book successfully added to the library!");
    return response.data.book;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while adding the book to the library: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while adding the book to the library");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};

export const removeFromLibrary = async (bookId: number) => {
  console.log("Removing book from library:", bookId);
  const storedToken = localStorage.getItem("token");

  try {
    await axios.delete("/library/remove-book", {
      headers: {
        Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
      },
      data: { book_id: bookId },
    });
    // alert("Book successfully removed from the library!");
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while removing the book from the library: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while removing the book from the library");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};

export const getUserBooksFromLibrary = async () => {
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get("/library/get-books", {
      headers: {
        Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
      },
    });

    console.log("Books retreived successfully");
    return response.data.books;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while fetching books from the library: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while fetching books from the library");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};

export const getUserBooksFromDataset = async () => {
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get("/library/get-dataset-books", {
      headers: {
        Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
      },
    });

    console.log("Books retreived successfully");
    return response.data.books;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while fetching books from the library: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while fetching books from the library");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};

export const searchBooksByTitle = async (title: string) => {
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get("/library/get-books-by-title", {
      params: { title: title }, // Include the title as a query parameter
      headers: {
        Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
      },
    });

    console.log("Books retreived successfully");
    return response.data.books;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while fetching books from the library: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while fetching books from the library");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};

export const getBookByTitle = async (title: string) => {
  console.log("Getting book: ", title);
  const storedToken = localStorage.getItem("token");

  try {
    await axios.post(
      "/library/get-book",
      { book_title: title },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );

    alert("Book successfully found");
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      alert("An error occurred while searching for the book: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received while searching for the book");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  }
};
