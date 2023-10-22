import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filterType: "all",
  emailList: null,
  mail: null,
  favMails: [],
  readMails: [],
  filteredEmails: null,
};
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    getEmailLists: (state, action) => {
      state.emailList = action.payload;
    },
    getUserMail: (state, action) => {
      state.mail = action.payload;
    },
    addFavEmails: (state, action) => {
      state.favMails = [...state.favMails, ...action.payload];
      localStorage.setItem("favEmails", JSON.stringify(state.favMails));
    },
    addreadMails: (state, action) => {
      state.readMails = [...state.readMails, ...action.payload];
      localStorage.setItem("readMails", JSON.stringify(state.readMails));
    },

    setFilteredMails: (state, action) => {
      state.filteredEmails = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const {
  getEmailLists,
  getUserMail,
  addFavEmails,
  addreadMails,
  setFilteredMails,
  setFilterType,
} = emailSlice.actions;

export default emailSlice.reducer;
