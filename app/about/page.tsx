import { getKbArticlesByCode } from "@/sdk/queries/kb";
import React from "react";

export const revalidate = 1;

export default async function AboutUs() {
  const { articles: aboutUsArticles } = await getKbArticlesByCode("about_us");

  return (
    <div className="min-h-screen flex items-centr justify-center mt-20">
      <div className="max-w-3xl w-full p-8">
        <div
          className="text-lg text-gray-800"
          dangerouslySetInnerHTML={{ __html: aboutUsArticles[0]?.content }}
        ></div>
      </div>
    </div>
  );
}
