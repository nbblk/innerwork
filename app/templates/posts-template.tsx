import Image from "next/image";
import { getPosts } from "../lib/api";

export default async function PostsTemplate() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <section className="mt-40 p-24 flex flex-col gap-8">
      <h1 className="text-5xl text-center">Posts</h1>
      <ul className="w-full min-h-screen border grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4">
        {posts.map(({ id, title, content, image_url }) => (
          <li key={id} className="border flex flex-col justify-between">
            <Image
              src={image_url}
              alt="thumbnail"
              className="object-cover h-full border"
            />
            <div>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
