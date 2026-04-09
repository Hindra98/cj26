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

export const createGallery = async (payload: GalleryCommand) => {
  const { data, error } = await supabase
    .from("gallery")
    .insert({
      url: payload.url,
      title: payload.title,
      category: payload.category,
      type: payload.type,
    })
    .select()
    .single();
  if (error) throw error;
  return data as GetGallery;
};

export const updateGallery = async (payload: GalleryCommand) => {
  const { data, error } = await supabase
    .from("gallery")
    .update({
      url: payload.url,
      title: payload.title,
      category: payload.category,
      type: payload.type,
    })
    .eq("id", payload.id)
    .select()
    .single();
  if (error) throw error;
  return data as GetGallery;
};

export const deleteGallery = async (id: number) => {
  try {
    // 1. récupérer les médias
    const { data: media, error: mediaError } = await supabase
      .from("gallery")
      .select("url, type")
      .eq("id", id);

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

    // 3. supprimer post
    await supabase.from("gallery").delete().eq("id", id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadGalleryImages = async (
  files: File[],
  payload: {
    title: string;
    category: Category;
  },
) => {
  let i = 1;
  for (const file of files) {
    const fileName = `${Date.now()}-${i}-${file.name}`;
    i++;
    const folder = file.type.includes("video") ? "videos" : "images";

    await supabase.storage.from(folder).upload(`gallery/${fileName}`, file);

    const { data } = supabase.storage
      .from(folder)
      .getPublicUrl(`gallery/${fileName}`);

    await createGallery({
      url: data.publicUrl,
      title: payload.title,
      category: payload.category,
      type: file.type.includes("video") ? "video" : "photo",
    });
  }
};

export const getGallery = async () => {
  const { data } = await supabase
    .from("gallery")
    .select(`*, gallery_images(*)`)
    .order("uploaded_at", { ascending: false });

  return data as GetGallery[];
};
