import { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Link as LinkIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Post {
  id: number;
  content: string;
  images: string[];
  video?: string;
  link?: {
    url: string;
    title: string;
    description: string;
  };
  createdAt: string;
}

export function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "Nous sommes si heureux de partager avec vous ces moments précieux de notre préparation au mariage ! 🎉",
      images: ["https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=400"],
      createdAt: "2026-04-04",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: "",
    images: [] as string[],
    video: "",
    link: { url: "", title: "", description: "" },
  });

  const handleCreatePost = () => {
    const post: Post = {
      id: Date.now(),
      content: newPost.content,
      images: newPost.images.filter((img) => img !== ""),
      video: newPost.video || undefined,
      link: newPost.link.url ? newPost.link : undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPosts([post, ...posts]);
    setNewPost({ content: "", images: [], video: "", link: { url: "", title: "", description: "" } });
    setShowCreateModal(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Gestion des Posts
          </h1>
          <p className="text-gray-600">Créez et gérez vos publications</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
          style={{ backgroundColor: '#033720' }}
        >
          <Plus size={20} />
          Nouveau post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-gray-800 mb-2">{post.content}</p>
                <p className="text-sm text-gray-500">Publié le {post.createdAt}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>

            {post.images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`Post ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {post.link && (
              <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium">{post.link.title}</p>
                <p className="text-xs text-gray-500">{post.link.url}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
                  Créer un post
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Content */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Message</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Partagez vos pensées..."
                    className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors resize-none"
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    <ImageIcon size={18} />
                    URLs des images
                  </label>
                  {[0, 1, 2].map((idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={newPost.images[idx] || ""}
                      onChange={(e) => {
                        const images = [...newPost.images];
                        images[idx] = e.target.value;
                        setNewPost({ ...newPost, images });
                      }}
                      placeholder={`URL image ${idx + 1}`}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors mb-2"
                    />
                  ))}
                </div>

                {/* Video */}
                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    <Video size={18} />
                    URL de la vidéo
                  </label>
                  <input
                    type="text"
                    value={newPost.video}
                    onChange={(e) => setNewPost({ ...newPost, video: e.target.value })}
                    placeholder="URL de la vidéo (YouTube, Vimeo...)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block mb-2 text-sm font-medium flex items-center gap-2">
                    <LinkIcon size={18} />
                    Lien
                  </label>
                  <input
                    type="text"
                    value={newPost.link.url}
                    onChange={(e) => setNewPost({ ...newPost, link: { ...newPost.link, url: e.target.value } })}
                    placeholder="URL du lien"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors mb-2"
                  />
                  <input
                    type="text"
                    value={newPost.link.title}
                    onChange={(e) => setNewPost({ ...newPost, link: { ...newPost.link, title: e.target.value } })}
                    placeholder="Titre du lien"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors mb-2"
                  />
                  <input
                    type="text"
                    value={newPost.link.description}
                    onChange={(e) => setNewPost({ ...newPost, link: { ...newPost.link, description: e.target.value } })}
                    placeholder="Description du lien"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="flex-1 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
                    style={{ backgroundColor: '#033720' }}
                  >
                    Publier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
