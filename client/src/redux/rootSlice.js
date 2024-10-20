import { createSlice } from "@reduxjs/toolkit";

// Define the initial state and reducers for the root slice
const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false, // Indicates whether the app is in a loading state
    portfolioData: null, // Stores the portfolio data fetched from the backend
    reloadData: false, // Controls whether the data should be reloaded
    projectData: null,
  },
  reducers: {
    // Sets loading to true
    ShowLoading: (state) => {
      state.loading = true;
    },
    // Sets loading to false
    HideLoading: (state) => {
      state.loading = false;
    },
    // Updates the portfolio data in the state
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    // Sets the reloadData flag to determine if data should be refreshed
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    //Sets project detail
    SetProjectData: (state, action) => {
      state.projectData = action.payload;
    },
  },
});

// Export the reducer and the actions
export default rootSlice.reducer;
export const {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  ReloadData,
  SetProjectData,
} = rootSlice.actions;
