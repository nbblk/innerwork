"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPost } from "../lib/api";
import { Post, UnsplashImageSize } from "../lib/types";
import { useRouter } from "next/navigation";
import { fetchRandomImage } from "../lib/unsplash";

export type WriteFormProps = Pick<Post, "title" | "content">;

export default function WriteTemplate() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WriteFormProps>();

  const onSubmit: SubmitHandler<WriteFormProps> = async ({
    title,
    content,
  }: WriteFormProps) => {
    if (errors.title || errors.content) return;
    const image_url = (await fetchRandomImage()) ?? "";
    createPost({ title, content, image_url }).then(() => {
      route.push("/posts");
    });
  };

  return (
    <section className="w-full min-h-screen mt-40 p-24 border">
      <h1 className="text-5xl text-center">Write</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-screen flex flex-col justify-center items-start p-8 gap-8"
      >
        <input
          type="text"
          placeholder="title"
          className="w-full border border-2 border-black p-4"
          {...register("title", { required: true })}
        />
        <textarea
          placeholder="content"
          className="w-full h-full border border-2 border-black p-4"
          {...register("content", { required: true })}
        />
        <button
          type="submit"
          className="self-center border px-8 py-3 border-2 border-black rounded-full text-white bg-black hover:opacity-50 hover:text-white transition hover:transition-colors text-2xl font-light"
        >
          {isSubmitting ? "Uploading..." : "Create"}
        </button>
      </form>
    </section>
  );
}
