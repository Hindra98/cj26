import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const useGallery = () => {
  const [datas, setData] = useState<GetGallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select(`*`)
        .order("uploaded_at", { ascending: false });
      if (error) throw error;
      setData((data as GetGallery[]) || []);
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
