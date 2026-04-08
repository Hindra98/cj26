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
  uploadedAt?: string;
}

interface BlogPostCommand {
  content: string;
  images: File[];
  author: {
    name: string;
    avatar?: File;
    role: string;
  };
}

interface GetBlogPost {
  id: number;
  content: string;
  images?: string[];
  video?: string;
  link?: {
    url: string;
    title: string;
    description: string;
    image?: string;
  };
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  likes?: number;
  comments?: number;
  createdAt: string;
}
interface GetPostDb {
  id: number;
  content: string;
  images?: string[];
  type?: "photo" | "video";
  author_name: string;
  author_avatar: string;
  author_role: string;
  createdAt: string;
}
