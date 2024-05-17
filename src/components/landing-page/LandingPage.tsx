import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const LandingPage = () => {
  const navigate = useNavigate(); // Call useNavigate hook to get the navigate function

  return (
    <div className="mainBackground">
      <Navbar></Navbar>
      <div className="feature-section">
        <h1>Personalized Reading Journey</h1>
        <p>
          Dive into the world of books where every recommendation is a gateway to a new realm, perfectly aligned with
          your reading preferences. Imagine a system where artificial intelligence becomes your personal librarian,
          meticulously analyzing your interests, past reads, and hidden desires to bring forth books that resonate with
          you on a profound level. It's not just about what's popular; it's about what stirs your soul. From the
          hallowed classics that have withstood the test of time to the latest groundbreaking works that are redefining
          genres, our AI sifts through the vast sea of literature to present you with choices that promise to enlighten,
          entertain, and inspire. With each suggestion, you're not just picking up another book; you're embarking on a
          journey uniquely yours, one page-turning adventure at a time.
        </p>
        <button
          onClick={() => {
            navigate("/recommend-personalized"); // Use the navigate function to change the route
          }}
        >
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  );
};
