// components/RichTextEditor.tsx
"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

type Props = {
    value?: string;
    onChange: (payload: { html: string; json: any; text: string }) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),
            Image,
        ],
        content: value || "<p></p>",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "min-h-[320px] rounded-2xl border border-[#2a2a2a] bg-[#111] px-4 py-4 text-white prose prose-invert max-w-none focus:outline-none",
                dir: "rtl",
            },
        },
        onUpdate({ editor }) {
            onChange({
                html: editor.getHTML(),
                json: editor.getJSON(),
                text: editor.getText(),
            });
        },
    });

    useEffect(() => {
        if (!editor) return;
        if (typeof value === "string" && value !== editor.getHTML()) {
            editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Quote
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const url = window.prompt("ضع رابط الصورة");
                        if (url) editor.chain().focus().setImage({ src: url }).run();
                    }}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Image URL
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const url = window.prompt("ضع الرابط");
                        if (url) {
                            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                        }
                    }}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Link
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs text-white"
                >
                    Unlink
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}