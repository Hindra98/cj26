import { supabase } from "./supabase";

export const createPost = async (payload: BlogPostCommand) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      content: payload.content,
      author_name: payload.author_name,
      author_role: payload.author_role,
      author_avatar: payload.author_avatar,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GetPostDb;
};

export const updatePost = async (payload: BlogPostCommand) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      content: payload.content,
      author_name: payload.author_name,
      author_role: payload.author_role,
      author_avatar: payload.author_avatar,
    })
    .eq("id", payload.id)
    .select()
    .single();

  if (error) throw error;
  return data as GetPostDb;
};

export const deletePost = async (id: number) => {
  try {
    // 1. récupérer les médias
    const { data: media, error: mediaError } = await supabase
      .from("blog_images")
      .select("url, type")
      .eq("post_id", id);

    if (mediaError) throw mediaError;

    // 2. supprimer fichiers storage

    if (media && media.length > 0) {
      const image_paths = media
        .filter((m) => m.type.includes("image"))
        .map((m) => {
          const url = new URL(m.url);
          return url.pathname.split(`/images/`)[1];
        });

      const videos_paths = media
        .filter((m) => m.type.includes("video"))
        .map((m) => {
          const url = new URL(m.url);
          return url.pathname.split(`/videos/`)[1];
        });

      console.log("image_paths", image_paths);
      console.log("videos_paths", videos_paths);

      if (image_paths.length > 0)
        await supabase.storage.from("images").remove(image_paths);
      if (videos_paths.length > 0)
        await supabase.storage.from("videos").remove(videos_paths);
    }

    // 3. supprimer media DB
    await supabase.from("blog_images").delete().eq("post_id", id);

    // 4. supprimer post
    await supabase.from("blog_posts").delete().eq("id", id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadPostImages = async (postId: number, files: File[]) => {
  let i = 1;

  for (const file of files) {
    const fileName = `${Date.now()}-${i}-${file.name}`;
    i++;
    const folder = file.type.includes("video") ? "videos" : "images";
    await supabase.storage.from(folder).upload(`posts/${fileName}`, file);

    const { data } = supabase.storage
      .from(folder)
      .getPublicUrl(`posts/${fileName}`);

    await supabase.from("blog_images").insert({
      post_id: postId,
      url: data.publicUrl,
      type: file.type.includes("video") ? "video" : "photo",
    });
  }
};

export const getPosts = async () => {
  const { data } = await supabase
    .from("blog_posts")
    .select(`*, blog_images(*)`)
    .order("created_at", { ascending: false });

  return data as GetPostDb[];
};
