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
            className={`cursor-pointer ${
              filterType === "unreadMails" ? "bg-red-400" : ""
            } `}
            onClick={() => unreadMails("readMails")}
          >
            Unread
          </span>
          <span
            className={`cursor-pointer ${
              filterType === "readMails" ? "bg-red-400" : ""
            } `}
            onClick={() => getmails("readMails")}
          >
            Read
          </span>
          <span
            className={`cursor-pointer ${
              filterType === "favEmails" ? "bg-red-400" : ""
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
