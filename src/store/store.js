import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";
const storedFavMails = JSON.parse(localStorage.getItem("favEmails"));
const storedreadMails = JSON.parse(localStorage.getItem("readMails"));

const store = configureStore({
  reducer: {
    email: emailSlice,
  },
  preloadedState: {
    email: {
      favMails: storedFavMails || [],
      readMails: storedreadMails || [],
    },
  },
});

export default store;
