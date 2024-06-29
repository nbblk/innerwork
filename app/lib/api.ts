import { supabase } from "./supabase";
import { Post } from "./types";

export const createPost = async ({
  title,
  content,
  image_url,
}: Pick<Post, "title" | "content" | "image_url">): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, image_url }])
    .single();
  if (error) throw error;
  console.log(data);
  return data;
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, image_url")
      .order("id", { ascending: false });

    if (error) {
      throw error as Error; // Add type assertion here
    }

    // If data is null or undefined, return an empty array or handle accordingly
    return data ?? [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  title: string,
  content: string
): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const deletePost = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};
