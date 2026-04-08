import { useEffect, useState } from "react";
import { getGallery } from "../utils/gallery.service";
import { getPosts } from "../utils/blog.service";

export const useGallery = () => {
  const [data, setData] = useState<GetGallery[]>([]);

  useEffect(() => {
    getGallery().then(setData);
  }, []);

  return data;
};

export const useBlogPost = () => {
  const [data, setData] = useState<GetPostDb[]>([]);

  useEffect(() => {
    getPosts().then(setData);
  }, []);

  return data;
};
