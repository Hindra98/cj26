type Category = "dote" | "civil" | "eglise" | "soiree" | "couple" | "famille";

type TableName =
  | "Miracle"
  | "Foi"
  | "Esperance"
  | "Fidelite"
  | "Patience"
  | "Victoire"
  | "Gloire"
  | "Misericorde"
  | "Pardon"
  | "Justice"
  | "Paix"
  | "Priere"
  | "Espoir"
  | "Lumiere"
  | "Amour"
  | "Benediction"
  | "Elevation"
  | "Humilite"
  | "Abondance"
  | "Rejouissance"
  | "Douceur"
  | "Courage"
  | "Sagesse"
  | "Maitrise"
  | "Grace"
  | "Intelligence"
  | "Protection";

interface GalleryCommand {
  id?: number;
  url: string;
  category: Category;
  title: string;
  type: "photo" | "video";
  uploadedAt?: string;
}

interface GetGallery {
  id: number;
  url: string;
  category: Category;
  title: string;
  type?: "photo" | "video";
  uploaded_at: string;
}

interface BlogPostCommand {
  id?: number;
  content: string;
  images: File[];
  
  author_name: string;
  author_avatar: string;
  author_role: string;
  created_at?: string;
  blog_images?:   BlogImage[];
}

interface GetPostDb {
  id: number;
  content: string;
  author_name: string;
  author_avatar: string;
  author_role: string;
  created_at: string;
  blog_images:   BlogImage[];
}
interface BlogImage {
  id?:      number;
  url:     string;
  post_id?: number;
  type?: "photo" | "video";
}
