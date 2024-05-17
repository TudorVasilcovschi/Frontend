import axios from "./axios";

const RECOMMENDATION_ENDPOINT = "/recommend";
const TOP_SHORT_BOOKS = "/top-short-books-recommendations";
const TOP_AVERAGE_RATING_BOOKS = "/top-book-average-rating-recommendations";
const TOP_PAPER_BOOKS = "/top-paper-books-recommendations";
const TOP_E_BOOKS = "/top-e-books-recommendations";
const SIMILAR_TITLES_BOOKS = "/top-similar-title-books";
const SIMILAR_DESCRIPTIONS_BOOKS = "/top-similar-description-books";
const SIMILAR_REVIEWS_BOOKS = "/top-similar-reviews-books";
const SIMILAR_USERS_CHOICE_BOOKS = "/top-users-choice-books";
const CONTENT_RECOMMENDATION_BOOKS = "/content-recommendations";
const USER_SIMILARITY_RECOMMENDATION_BOOKS = "/user-similarity-recommendations";
const ITEM_SIMILARITY_RECOMMENDATION_BOOKS = "/item-similarity-recommendations";
const SVD_RECOMMENDATION_BOOKS = "/svd-recommendations";

const handleError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    alert("An error occurred while fetching recommendations: " + error.response.data.message);
  } else if (error.request) {
    // The request was made but no response was received
    alert("No response received while fetching recommendations");
  } else {
    // Something happened in setting up the request that triggered an Error
    alert("Error: " + error.message);
  }
}


// == COLD START ==
export const topShortBooks = async () => {
  console.log("Getting short books");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      RECOMMENDATION_ENDPOINT + TOP_SHORT_BOOKS,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topAverageRatingBooks = async () => {
  console.log("Getting average rating books");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      RECOMMENDATION_ENDPOINT + TOP_AVERAGE_RATING_BOOKS,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topPaperBooks = async () => {
  console.log("Getting paper books");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      RECOMMENDATION_ENDPOINT + TOP_PAPER_BOOKS,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topEBooks = async () => {
  console.log("Getting e-books");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      RECOMMENDATION_ENDPOINT + TOP_E_BOOKS,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// == Recommendations with given input ==
export const similarTitlesRecommendations = async (title: string) => {
  console.log("Getting similar titles recommendations");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + SIMILAR_TITLES_BOOKS, {
        params: { title: title },
      }
    );
    return response.data.books;
  } catch (error) {
    handleError(error);
  }
};

export const similarDescriptionsRecommendations = async (description: string) => {
  console.log("Getting similar descriptions recommendations");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + SIMILAR_DESCRIPTIONS_BOOKS,{
        params: { description: description },
      }
    );
    return response.data.books;
  } catch (error) {
    handleError(error);
  }
};

export const similarReviewsRecommendations = async (bookId: number) => {
  console.log("Getting similar revoews recommendations");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + SIMILAR_REVIEWS_BOOKS, {
        params: { book_id: bookId }
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const collabFilteringRecommendations = async () => {
  console.log("Getting collab  recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + USER_SIMILARITY_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const contentFilteringRecommendations = async () => {
  console.log("Getting content recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + CONTENT_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const svdFilteringRecommendations = async () => {
  console.log("Getting content recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + SVD_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};


// export const similarUsersRecommendations = async (userId: string) => {
//   console.log("Getting similar users recommendations");
//   const storedToken = localStorage.getItem("token");

//   try {
//     const response = await axios.get(
//       RECOMMENDATION_ENDPOINT + SIMILAR_USERS_CHOICE_BOOKS, {
//         params: { user_id: userId },
//         headers: {
//           Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
//         },
//       }
//     );
//     return response.data.books;
//   } catch (error: any) {
//     handleError(error);
//   }
// };

export const contentRecommendations = async () => {
  console.log("Getting content recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + CONTENT_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const userSimilarityRecommendations = async () => {
  console.log("Getting user similarity recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + USER_SIMILARITY_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const itemSimilarityRecommendations = async (bookId: number) => {
  console.log("Getting item similarity recommendations");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + ITEM_SIMILARITY_RECOMMENDATION_BOOKS, {
        params: { book_id: bookId }
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};

export const svdRecommendations = async () => {
  console.log("Getting svd recommendations");
  const storedToken = localStorage.getItem("token");

  try {
    const response = await axios.get(
      RECOMMENDATION_ENDPOINT + SVD_RECOMMENDATION_BOOKS, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the JWT token in the request headers
        },
      }
    );
    return response.data.books;
  } catch (error: any) {
    handleError(error);
  }
};