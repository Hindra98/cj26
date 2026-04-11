import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const useBlogPost = () => {
  const [datas, setData] = useState<GetPostDb[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`*, blog_images(*)`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setData((data as GetPostDb[]) || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { data: datas, loading, error, refetch: fetchPosts };
};
export const useDeleteBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const removePost = async (id: number) => {
    try {
      setLoading(true);
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, removePost, error };
};
export const useUpdateBlogPost = () => {
  const [datas, setData] = useState<GetPostDb | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const uploadPostMedia = async (postId: number, files: File[]) => {
    try {
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
    } catch (err) {
      setError(err);
    }
  };

  const createPost = async (payload: BlogPostCommand) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .insert({
          content: payload.content,
          author_name: payload.author_name,
          author_role: payload.author_role,
          author_avatar: payload.author_avatar,
        })
        .select()
        .single();
      if (error) throw error;
      setData((data as GetPostDb) || []);
      await uploadPostMedia((data as GetPostDb).id, payload.images);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const updatePost = async (payload: BlogPostCommand) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
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
      setData((data as GetPostDb) || []);
      await uploadPostMedia((data as GetPostDb).id, payload.images);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data: datas, loading, error, createPost, updatePost };
};
