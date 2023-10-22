import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserMail,
  setFilterType,
  setFilteredMails,
} from "../store/emailSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { emailList, filterType } = useSelector((store) => store.email);
  const getmails = (type) => {
    const emails = localStorage.getItem(type);
    const filter = emailList.filter((mail) => emails?.includes(mail.id));
    dispatch(setFilteredMails(filter));
    dispatch(setFilterType(type));
    dispatch(getUserMail(null));
  };
  const unreadMails = (type) => {
    const emails = localStorage.getItem(type);
    const filter = emailList.filter((mail) => !emails?.includes(mail.id));
    dispatch(setFilteredMails(filter));
    dispatch(setFilterType("unreadMails"));
    dispatch(getUserMail(null));
  };

  return (
    <header>
      <div className="flex items-center gap-8">
        <p>Filter By: </p>
        <div className="flex gap-4">
          <span
            className={`cursor-pointer rounded-xl py-1 px-2 ${
              filterType === "unreadMails"
                ? "bg-red-400 text-white font-semibold"
                : ""
            } `}
            onClick={() => unreadMails("readMails")}
          >
            Unread
          </span>
          <span
            className={`cursor-pointer  rounded-xl py-1 px-2 ${
              filterType === "readMails"
                ? "bg-red-400  text-white font-semibold"
                : ""
            } `}
            onClick={() => getmails("readMails")}
          >
            Read
          </span>
          <span
            className={`cursor-pointer  rounded-xl py-1 px-2 ${
              filterType === "favEmails"
                ? "bg-red-400  text-white font-semibold"
                : ""
            } `}
            onClick={() => getmails("favEmails")}
          >
            Favourite
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
