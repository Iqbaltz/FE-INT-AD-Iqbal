import React from "react";

export default function EditPage() {
  return (
    <div className="my-4">
      <form className="flex flex-col space-y-4 bg-white mx-auto p-4 rounded-xl max-w-[400px]">
        <h2 className="font-bold text-yellow-500">Edit Yap</h2>
        <input
          className="bg-yellow-50 px-2 py-1"
          type="text"
          placeholder="Yap Title"
        />
        <textarea
          name="body"
          placeholder="Yap Body"
          className="bg-yellow-50 px-2 py-1"
        ></textarea>
        <button className="bg-yellow-400 px-2 py-1 text-white" type="submit">
          Edit Yap
        </button>
      </form>
    </div>
  );
}
