import Image from "next/image";
import { getPosts } from "../lib/api";

export default async function PostsTemplate() {
  const posts = await getPosts();
  console.log("=======posts", posts);

  return (
    <section className="mt-40 p-24 flex flex-col gap-8">
      <h1 className="text-5xl text-center">Posts</h1>
      <ul className="w-full min-h-screen grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">
        {posts.map(({ id, title, content, image_url }) => (
          <li key={id} className="flex flex-col justify-between items-center">
            <Image
              src={image_url}
              alt="thumbnail"
              className="object-cover hover:opacity-80 cursor-pointer"
              width={500}
              height={500}
            />
            <div>
              <h2 className="text-center">{title}</h2>
              <p className="text-center">{content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
