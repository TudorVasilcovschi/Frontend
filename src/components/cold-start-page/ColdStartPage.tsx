import { useEffect, useState } from "react";
import { topAverageRatingBooks, topEBooks, topPaperBooks, topShortBooks } from "../../api/recommendation";
import BookList from "../components/BookList";
import { Navbar } from "../components/Navbar";
import { BookInterface, BookListStateTuple } from "../../utils/interfaces";
import { ADD_ACTION, REMOVE_ACTION, MARK_AS_REMOVED, MARK_AS_ADDED } from "../../utils/constants";
import { handleBookListChange } from "../../utils/functions";

export const ColdStartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [top10ShortBooks, setTop10ShortBooks] = useState<BookInterface[]>([]);
  const [top10AverageRatingBooks, setTop10AverageRatingBooks] = useState<BookInterface[]>([]);
  const [top10PaperBooks, setTop10PaperBooks] = useState<BookInterface[]>([]);
  const [top10EBooks, setTop10EBooks] = useState<BookInterface[]>([]);

  // Prepare book lists and their setState functions
  const bookLists: BookListStateTuple[] = [
    [top10ShortBooks, setTop10ShortBooks],
    [top10AverageRatingBooks, setTop10AverageRatingBooks],
    [top10PaperBooks, setTop10PaperBooks],
    [top10EBooks, setTop10EBooks],
  ];

  const getRecommendations = async () => {
    const [response1, response2, response3, response4] = await Promise.all([
      topShortBooks(),
      topAverageRatingBooks(),
      topPaperBooks(),
      topEBooks(),
    ]);
    setTop10ShortBooks(response1.recommendations);
    setTop10AverageRatingBooks(response2.recommendations);
    setTop10PaperBooks(response3.recommendations);
    setTop10EBooks(response4.recommendations);
  };

  useEffect(() => {
    getRecommendations().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Wrapper functions for handling book list changes
  const handleAddBook = (bookId: number) => handleBookListChange(bookId, MARK_AS_ADDED, bookLists);
  const handleMarkAsRemovedBook = (bookId: number) => handleBookListChange(bookId, MARK_AS_REMOVED, bookLists);

  return (
    <div>
      <Navbar></Navbar>

      <div className="mini-header">
        <div className="header-content">
          <h1 className="header-title">Top 10 Recommended Short Books</h1>
          <p className="header-subtitle">
            <p>
              Hundreds of books are published each year in many different languages around the world. Books are printed
              on paper, and are portable. They can be carried around anywhere, and be read at anytime. Books are a
              storehouse of knowledge. There are academic books on the various subjects. There are textbooks for the
              different levels of study right from school through college and on for higher studies. There are books in
              the fiction and non-fiction categories, and there are several genres in each of these categories. There
              are books in genres like health, nature, environment, spirituality, religion, self-help and history,
              besides many others, in the non-fiction category. Fiction may belong to horror, romance, comedy, thriller
              or fantasy genres, and may be in prose, poetry or drama forms. Books cater to different tastes and
              preferences of the people. Books are also translated into various languages so that knowledge and literary
              wealth is shared by everyone. Now books are available on the internet too.
            </p>
            <i>
              Books are our best friends. When I am sick and in bed, unable to play, books give me company. I also have
              nice bedside books that I read before I fall asleep at night. I love to read detective and fantasy stories
              in the English language. I like reading old books like the Sherlock Holmes series by Arthur Conan Doyle. I
              also like reading short stories in Tamil and Hindi. Sometimes when I am reading I get so enchanted and
              engrossed that I even forget to eat my dinner.
            </i>
          </p>
        </div>
        <div className="header-svg">
          <img src={"assets/images/Bibliophile-bro.svg"} alt="Your SVG" />
        </div>
      </div>

      <BookList
        title="Top 10 Short Books"
        books={top10ShortBooks}
        onAddBook={handleAddBook}
        onRemoveBook={handleMarkAsRemovedBook}
      />

      <div className="mini-header">
        <div className="header-svg">
          <img src={"assets/images/Bibliophile-bro2.svg"} alt="Your SVG" />
        </div>
        <div className="header-content">
          <h1 className="header-title">Top 10 Recommended Average Rating Books</h1>
          <p className="header-subtitle">
            In the world of literature, where the sea of stories is boundless and the tales are as varied as the stars
            in the night sky, the Top Average Rating Books stand as beacons of excellence. These are the novels that
            have enchanted readers and critics alike, earning accolades and the highest of ratings across the board.
            From the intricate tapestries of fantasy realms to the stark realities of non-fiction, these titles have
            been meticulously rated by a community of readers who seek to immortalize the narratives that have touched
            their hearts and provoked their minds. They are not just books; they are the collective affirmation of
            quality, the pinnacle of what authors can achieve through the written word. Here, you find stories that
            resonate with the human experience, characters that live beyond the final page, and adventures that continue
            to echo long after the book is closed. The Top Average Rating Books are more than a list; they are a
            celebration of storytelling at its finest, a showcase where each page turn reveals another layer of human
            emotion and intellectual depth.
          </p>
        </div>
      </div>
      <BookList
        title="Top 10 Average Rating Books"
        books={top10AverageRatingBooks}
        onAddBook={handleAddBook}
        onRemoveBook={handleMarkAsRemovedBook}
      />

      <div className="mini-header">
        <div className="header-content">
          <h1 className="header-title">Top 10 Recommended Paper Books</h1>
          <p className="header-subtitle">
            In an age of digital screens and ephemeral media, the Top 10 Paper Books hark back to the tangible joy of
            reading. There's something inherently magical about flipping through the pages of a book, feeling the
            texture of paper between your fingers, and inhaling the scent of ink and pulp that whispers of other worlds.
            This selection of paperbacks pays homage to the traditionalist in every reader, those who find solace in the
            weight of a book in their hands, the rustle of pages turning, and the quiet moments stolen from the day to
            indulge in literary wanderlust. Within the pages of these top contenders, you'll discover a curated
            collection of narratives that have shaped thoughts, influenced cultures, and provided an escape from the
            rush of modern life. Each book here is a vessel of imagination, a physical artifact that connects the reader
            to the tactile roots of reading. Whether nestled in a cozy armchair, basking under the warmth of the sun, or
            tucked into a café corner, these paper books are your portal to other lives and distant places.
          </p>
        </div>
        <div className="header-svg">
          <img src={"assets/images/Bibliophile-bro3.svg"} alt="Your SVG" />
        </div>
      </div>
      <BookList
        title="Top 10 Paper Books"
        books={top10PaperBooks}
        onAddBook={handleAddBook}
        onRemoveBook={handleMarkAsRemovedBook}
      />

      <div className="mini-header">
        <div className="header-svg">
          <img src={"assets/images/Bibliophile-bro4.svg"} alt="Your SVG" />
        </div>
        <div className="header-content">
          <h1 className="header-title">Top 10 Recommended E-Books</h1>
          <p className="header-subtitle">
            Embracing the digital revolution with open arms, the Top 10 E-Books section is a testament to the future of
            reading. These electronic volumes represent the cutting edge of convenience and accessibility, providing a
            vast library at your fingertips. With e-books, literature transcends physical boundaries, allowing stories
            to be enjoyed anywhere, at any time, with just the click of a button. For those who crave the modernity of
            technology without sacrificing the essence of reading, this selection offers the best of both worlds. The
            top e-books are more than just files; they are the synapses of a global brain, ideas that are effortlessly
            shared and experiences that are instantly available. They are the quiet revolution in your pocket or purse,
            the companions of the digital nomad, and the treasures of the minimalist. In this curated list, you'll find
            genres that span the spectrum, from thrilling science fiction sagas that explore the cosmos to profound
            personal memoirs that navigate the complexities of the human psyche. The top e-books are your ticket to an
            unbounded universe, where every story is a star, waiting to be explored.
          </p>
        </div>
      </div>
      <BookList
        title="Top 10 eBooks"
        books={top10EBooks}
        onAddBook={handleAddBook}
        onRemoveBook={handleMarkAsRemovedBook}
      />

      <div className="footer"></div>
    </div>
  );
};
