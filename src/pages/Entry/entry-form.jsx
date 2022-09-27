import React from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

function EntryForm(props) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("Please enter title..."),
    entrybody: yup.string().required("Please enter text..."),
    date: yup.date().required("Please select date... "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const entryRef = collection(db, "diary-entry");

  const onCreateEntry = async (data) => {
    await addDoc(entryRef, {
      ...data,
      //   title: data.title,
      //   entrybody: data.entrybody,
      //   date: data.date,
      username: user?.email,
      userId: user?.uid,
    });
    console.log(data);
  };

  const logout = async () => {
    await signOut(auth);
    console.log("fuck");
  };

  return (
    <div className="mx-8">
      <div>
        <form onSubmit={handleSubmit(onCreateEntry)}>
          <div className="flex">
            {" "}
            <input
              type="text"
              {...register("title")}
              placeholder="Enter a title..."
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <input
              type="date"
              {...register("date")}
              placeholder="Enter a date..."
              className="w-64 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>{" "}
          </div>
          <p style={{ color: "red" }}> {errors.title?.message}</p>
          {/* <p style={{ color: "red" }}> {errors.date?.message}</p> */}
          <div className="pb-6"></div>
          <div>
            <textarea
              id="message"
              rows="8"
              {...register("entrybody")}
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="What happened today..."
            ></textarea>
            <p style={{ color: "red" }}> {errors.entrybody?.message}</p>
          </div>
          <div className="entry-submit space-x-4 py-4">
            <div>
              <p className="cursor-pointer  py-4 text-blue-600 text-lg">
                {" "}
                View all entries{" "}
              </p>
            </div>
            <input
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
            />
          </div>
        </form>
      </div>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        logout
      </button>
      <p>the user is{user?.email}</p>
    </div>
  );
}

export default EntryForm;
