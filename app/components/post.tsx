import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  title: string;
  body: string;
  author: string;
};

const Post = ({ id, title, body, author }: Props) => {
  return (
    <div className="bg-white px-8 py-4 rounded-xl">
      <div className="flex justify-between">
        <h1 className="font-semibold">{title}</h1>
        <div className="flex gap-2">
          <Link href={`/yap/edit/${id}`}>
            <button className="text-yellow-400">edit</button>
          </Link>
          |<button className="text-red-500">delete</button>
        </div>
      </div>
      <p className="my-1">&quot;{body}&quot;</p>
      <p>~{author}</p>
    </div>
  );
};

export default Post;
