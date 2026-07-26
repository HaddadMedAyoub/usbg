// components/ArticleContent.tsx
"use client";

import { sanitizeHtml } from "@/lib/sanitizeHtml";

type Props = {
  html?: string | null;
  text?: string | null;
};

export default function ArticleContent({ html, text }: Props) {
  if (html) {
    const safeHtml = sanitizeHtml(html);

    return (
      <div
        dir="rtl"
        className="
          article-html
          prose prose-invert max-w-none
          prose-headings:text-white
          prose-headings:font-black
          prose-p:text-gray-300
          prose-p:leading-9
          prose-li:text-gray-300
          prose-strong:text-white
          prose-a:text-[#F7C600]
          prose-a:no-underline hover:prose-a:underline
          prose-blockquote:text-gray-300
          prose-blockquote:border-r-4
          prose-blockquote:border-[#F7C600]
          prose-blockquote:pr-4
          prose-img:rounded-2xl
          prose-hr:border-[#2a2a2a]
        "
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

  return (
    <div
      dir="rtl"
      className="text-gray-300 leading-9 text-[15px] sm:text-base whitespace-pre-wrap"
    >
      {text}
    </div>
  );
}