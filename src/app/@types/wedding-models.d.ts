
type Category = "dote" | "civil" | "eglise" | "soiree" | "couple" | "famille";

interface GalleryCommand {
  id: number;
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
  type: "photo" | "video";
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
