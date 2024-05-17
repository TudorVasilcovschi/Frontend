import { useEffect, useState } from "react";
import { getUserBooksFromDataset, getUserBooksFromLibrary } from "../../api/library";
import { useAuth } from "../../context/authContext";
import { BookInterface } from "../../utils/interfaces";
import { Navbar } from "../components/Navbar";
import { RootState, useAppDispatch, useAppSelector } from "../../storeRedux/store";
import { setRecommendations } from '../../storeRedux/reducers/recommendationsSlice';
import { collabFilteringRecommendations, contentFilteringRecommendations, svdFilteringRecommendations } from "../../api/recommendation";
import { DatasetRecommendBookTable } from "../components/tables/datasetUserTable/DatasetRecommendBooksTable";
import { LoadingRecommendations } from "../components/headers/LoadingRecommendations";
import { PersonalizedRecommendationsUnlocked } from "../components/headers/PersonalizedRecommendationsUnlocked";
import { PersonalizedRecommendationsLocked } from "../components/headers/PersonalizedRecommendationsLocked";



export const PersonalizedRecommendPage = () => {
  const { token, isDatasetUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { collab, content, svd } = useAppSelector((state: RootState) => state.recommendations);

  // Function to fetch recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const collabResults = await collabFilteringRecommendations();
      const contentResults = await contentFilteringRecommendations();
      const svdResults = await svdFilteringRecommendations();

      dispatch(setRecommendations({
        collab: collabResults,
        content: contentResults,
        svd: svdResults
      }));
    } catch (error) {
      console.error("Error loading recommendation results", error);
    } finally {
      setLoading(false);
    }
  };

  
useEffect(() => {
  if(isDatasetUser) {
    const shouldFetch = (!collab?.length && !content?.length && !svd?.length) && token;
    if (shouldFetch) {
      fetchRecommendations();
    } else {
      setLoading(false); // Ensure to turn off loading if data already exists
    } 
  }
}, [collab, content, svd, token, dispatch]); 

  return (<div>
    <Navbar></Navbar>
    <div>
      <div>
        {!isDatasetUser ? (
          <PersonalizedRecommendationsLocked></PersonalizedRecommendationsLocked>
        ) : loading ? (
          <LoadingRecommendations></LoadingRecommendations>
        ) : (
          <>
            <PersonalizedRecommendationsUnlocked fetchRecommendations={fetchRecommendations}></PersonalizedRecommendationsUnlocked>
            <div style={{ margin: "50px", userSelect: "none" }}>
              <h2>Collaborative Filtering Recommendations</h2>
              <DatasetRecommendBookTable userBooks={collab || []} />

              <h2>Content-Based Filtering Recommendations</h2>
              <DatasetRecommendBookTable userBooks={content || []} />

              <h2>SVD Recommendations</h2>
              <DatasetRecommendBookTable userBooks={svd || []} />
            </div>
        </>
      )}
      </div>
    </div>
  </div>);
};
