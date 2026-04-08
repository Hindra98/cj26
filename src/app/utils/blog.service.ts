import { supabase } from "./supabase";

export const createPost = async (payload: BlogPostCommand) => {
  const { data } = await supabase
    .from("blog_posts")
    .insert({
      content: payload.content,
      author_name: payload.author.name,
      author_role: payload.author.role,
    })
    .select()
    .single();

  return data;
};

export const uploadPostImages = async (postId: number, files: File[]) => {
  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    await supabase.storage.from("images").upload(`posts/${fileName}`, file);

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`posts/${fileName}`);

    await supabase.from("blog_images").insert({
      post_id: postId,
      url: data.publicUrl,
    });
  }
};

export const getPosts = async () => {
  const { data } = await supabase
    .from("blog_posts")
    .select(
      `*, blog_images(*)`,
    )
    .order("created_at", { ascending: false });

  return data as GetPostDb[];
};
