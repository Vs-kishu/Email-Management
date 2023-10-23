import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavEmails, addreadMails } from "../store/emailSlice";
import { getDateTime } from "../utils/helperfunction";

const EmailBody = ({ mail }) => {
  const dispatch = useDispatch();
  const { favMails, readMails } = useSelector((store) => store.email);
  const { body, name, date } = mail;
  const { year, month, day, hours, minutes, amOrPm } = getDateTime(date);
  const isRead = readMails.includes(body.id);
  const isFav = favMails.includes(body.id);

  const addToFav = () => {
    if (favMails) {
      const alreadyAdded = favMails.find((id) => id === mail.body.id);
      if (alreadyAdded) {
        alert("error!  already added");
        return;
      }
    }
    dispatch(addFavEmails(mail.body.id));
    alert("added to favourite");
  };
  const addToRead = () => {
    if (readMails) {
      const alreadyAdded = readMails.find((id) => id === mail.body.id);
      if (alreadyAdded) {
        alert("error!  already added");
        return;
      }
    }
    dispatch(addreadMails(mail.body.id));
    alert("added to read mails");
  };
  return (
    <section className="w-full xl:w-[150rem]  border-2 rounded-lg border-slate-400 bg-white py-4 px-4">
      <header className="flex justify-between items-center">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 flex-shrink-0 bg-red-500 rounded-full flex justify-center items-center text-4xl font-medium text-white">
            {name.split("")[0].toUpperCase()}
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-3xl text-slate-500">{name}</h3>
            <div className="flex gap-4">
              <span>{`${day}/${month}/${year}`}</span>
              <span>{`${hours % 12 || 12}:${minutes} ${amOrPm}`}</span>
            </div>
          </div>
        </div>
        <button
          onClick={addToFav}
          className="bg-red-600 text-white font-semibold py-1 px-2 rounded-full"
        >
          {isFav ? "Added" : "Mark as Favorite"}
        </button>
      </header>
      <div
        className="text-gray-600 email-body pl-20 pr-4 mt-10 text-sm"
        dangerouslySetInnerHTML={{ __html: body.body }}
      />
      <div className="mt-10 flex justify-center">
        <button onClick={addToRead}>
          {isRead ? "completed" : "Mark as read"}
        </button>
      </div>
    </section>
  );
};

export default EmailBody;
