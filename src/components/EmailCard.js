import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMail } from "../store/emailSlice";
import { getDateTime } from "../utils/helperfunction";

const EmailCard = ({ mail }) => {
  const dispatch = useDispatch();
  const {
    emailList,
    mail: activeMail,
    favMails,
    readMails,
  } = useSelector((store) => store.email);
  const [Loading, setLoading] = useState(false);

  const {
    id,
    date,
    from: { name, email },
    short_description,
    subject,
  } = mail;
  const { year, month, day, hours, minutes, amOrPm } = getDateTime(date);
  const isFav = favMails.includes(id);
  const isRead = readMails.includes(id);
  const getMail = async (emailId) => {
    setLoading(true);
    const mailUserDetail = emailList.find((mail) => mail.id === emailId);
    const {
      date,
      from: { name },
    } = mailUserDetail;
    console.log(mailUserDetail);

    const res = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${emailId}`
    );
    const data = await res.json();
    dispatch(getUserMail({ body: data, name, date }));
    setLoading(false);
  };
  return (
    <div
      onClick={() => getMail(id)}
      className={`border-2 ${
        Loading && "animate-pulse"
      } rounded-lg border-slate-400 ${
        id === activeMail?.body.id ? "bg-amber-50" : "bg-white"
      }  py-4 px-8 flex  items-start gap-4 cursor-pointer`}
    >
      <div className="w-16 h-16 flex-shrink-0 bg-red-500 rounded-full flex justify-center items-center text-4xl font-medium text-white">
        {name.split("")[0].toUpperCase()}
      </div>
      <div className="flex flex-col gap-2 text-slate-600">
        <p>
          From:
          <span
            className={` text-gray-600 whitespace-nowrap ${
              activeMail ? "font-medium" : "font-bold"
            }`}
          >
            {" "}
            {name}
            {` <${email}>`}
          </span>
        </p>
        <p>
          Subject:{" "}
          <span
            className={` text-gray-600 ${
              activeMail ? "font-medium" : "font-bold"
            }`}
          >
            {subject}
          </span>
        </p>
        <p>{short_description}</p>
        <div className="flex gap-4">
          <span>{`${day}/${month}/${year}`}</span>
          <span>{`${hours % 12 || 12}:${minutes} ${amOrPm}`}</span>
          {isFav && (
            <span className="text-sm font-bold text-red-600">Favorite</span>
          )}
          {isRead && (
            <span className="text-sm font-bold text-red-600">Read</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
