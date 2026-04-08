import { supabase } from "./supabase";

export const uploadImage = async (file: File, type: "posts" | "gallery") => {
  const fileName = `${Date.now()}-${file.name}`;

  const folder = file.type.includes("video") ? "videos" : "images";

  const { data, error } = await supabase.storage
    .from(folder)
    .upload(`${type}/${fileName}`, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from(folder)
    .getPublicUrl(`${type}/${fileName}`);

  return publicUrl.publicUrl;
};
