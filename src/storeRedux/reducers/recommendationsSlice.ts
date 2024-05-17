import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookInterface } from '../../utils/interfaces';

interface RecommendationsState {
  collab: BookInterface[] | null;
  content: BookInterface[] | null;
  svd: BookInterface[] | null;
}

const initialState: RecommendationsState = {
  collab: [],
  content: [],
  svd: [],
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendations(state, action: PayloadAction<RecommendationsState>) {
      state.collab = action.payload.collab;
      state.content = action.payload.content;
      state.svd = action.payload.svd;
    },
    resetRecommendations: (state) => {
      state.collab = [];
      state.content = [];
      state.svd = [];
    },
  }
});

export const { setRecommendations, resetRecommendations } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
