import React from "react";
import "tailwindcss/tailwind.css";
// import EntryModal from "./entryModal";
import EntryForm from "./entry-form";

function Entry() {
  return (
    <div className="mx-8">
      <div>
        {" "}
        <h1 className="text-slate-800 px-6 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
          {" "}
          My Daily Dairy Entry{" "}
        </h1>
        <EntryForm />
      </div>
    </div>
  );
}

export default Entry;
