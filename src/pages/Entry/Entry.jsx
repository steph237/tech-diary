import React from "react";
import "tailwindcss/tailwind.css";

function Entry(props) {
  const { handleLogout } = props;
  return (
    <div className="mx-8">
      <div>
        {" "}
        <h1 className="text-slate-800 px-6 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
          {" "}
          My Daily Dairy Entry{" "}
        </h1>
        <form>
          <div className="flex">
            {" "}
            <input
              type="text"
              placeholder="Enter a title..."
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <input
              type="date"
              className="w-64 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>{" "}
          </div>

          <div className="pb-6"></div>
          <div>
            <textarea
              id="message"
              rows="8"
              className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="What happened today..."
            ></textarea>
          </div>
          <div className="entry-submit space-x-4 py-4">
            <div>
              <p className="cursor-pointer  py-4 text-blue-600 text-lg">
                {" "}
                View all entries{" "}
              </p>
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onclick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default Entry;
