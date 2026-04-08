import { supabase } from "./supabase";

export const uploadGalleryMedia = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;

  const folder = file.type.includes("video") ? "videos" : "images";

  const { error } = await supabase.storage
    .from("images")
    .upload(`gallery/${fileName}`, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(`gallery/${fileName}`);

  return data.publicUrl;
};


export const uploadPostImages = async (galleryId: number, files: File[]) => {
  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    await supabase.storage.from("images").upload(`gallery/${fileName}`, file);

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`gallery/${fileName}`);

    await supabase.from("gallery_images").insert({
      gallery_id: galleryId,
      url: data.publicUrl,
    });
  }
};


export const createGallery = async (payload: GalleryCommand) => {
  await supabase.from("gallery").insert({
    url: payload.url,
    title: payload.title,
    category: payload.category,
    type: payload.type,
  });
};

export const getGallery = async () => {
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return data as GetGallery[];
};
