import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailCard from "../components/EmailCard";
import { getEmailLists } from "../store/emailSlice";
import EmailBody from "./EmailBody";

const EmailLists = () => {
  const dispatch = useDispatch();
  const { emailList, mail, filteredEmails } = useSelector(
    (store) => store.email
  );
  const [page, setPage] = useState(1);
  const fetchAllEmails = async () => {
    const res = await fetch(
      `https://flipkart-email-mock.vercel.app/?page=${page}`
    );
    const data = await res.json();
    dispatch(getEmailLists(data.list));
  };
  useEffect(() => {
    fetchAllEmails();
    // eslint-disable-next-line
  }, [page]);

  if (!emailList) {
    return <h1>Loading....</h1>;
  }

  return (
    <section>
      <div className="mt-5 flex flex-col xl:flex-row gap-4">
        {filteredEmails ? (
          <div className="bg-slate-50 flex flex-col w-full gap-4">
            {filteredEmails?.map((email) => (
              <div key={email.id}>
                <EmailCard mail={email} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 flex flex-col w-full gap-4">
            {emailList?.map((email) => (
              <div key={email.id}>
                <EmailCard mail={email} />
              </div>
            ))}
          </div>
        )}

        {mail && <EmailBody mail={mail} />}
      </div>
      {filteredEmails ? (
        ""
      ) : (
        <div className="text-center flex gap-4  justify-center mt-5">
          <button
            className="bg-gray-500 rounded-lg py-1 px-2"
            onClick={() => setPage(1)}
          >
            1
          </button>
          <button
            className="bg-gray-500 rounded-lg py-1 px-2"
            onClick={() => setPage(2)}
          >
            2{" "}
          </button>
        </div>
      )}
    </section>
  );
};

export default EmailLists;
