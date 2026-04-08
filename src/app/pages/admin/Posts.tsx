import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  X,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { images } from "../../assets";
import { Select } from "../../components/figma/Input";

export function AdminPosts() {
  const [posts, setPosts] = useState<GetPostDb[]>([
    {
      id: 1,
      content:
        "Nous sommes si heureux de partager avec vous ces moments précieux de notre préparation au mariage ! 🎉",
      images: [images.couple, images.couple3],
      createdAt: "2026-04-04",
      author_name: "Joël & Claudia",
      author_avatar: images.couple,
      author_role: "Les mariés",
    },
  ]);

  const authors = [
    {
      name: "Joël & Claudia",
      role: "Les mariés",
      avatar: images.couple,
    },
    {
      name: "Famille KOUATCHET",
      role: "Famille de la mariée",
      avatar: images.miff_femme2,
    },
    {
      name: "Famille ZAMA",
      role: "Famille du marié",
      avatar: images.miff_homme,
    },
    {
      name: "Organisation Mariage",
      role: "Organisateurs",
      avatar: images.couple2,
    },
  ];

  const defaultBlogPost: BlogPostCommand = {
    content: "",
    images: [],
    author: {
      name: authors[0].name,
      role: authors[0].role,
      avatar: undefined,
    },
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [blogPostCommand, setBlogPostCommand] =
    useState<BlogPostCommand>(defaultBlogPost);
  const [error, setError] = useState("");

  const handleCreatePost = () => {
    const post: GetPostDb = {
      id: Date.now(),
      content: blogPostCommand.content,
      author_name: blogPostCommand.author.name,
      author_role: blogPostCommand.author.role,
      author_avatar: authors.find(
        (aut) => aut.name === blogPostCommand.author.name,
      )?.avatar,
      images: blogPostCommand.images.map((img) => URL.createObjectURL(img)),
      createdAt:
        new Date().toISOString().split("T")[0] +
        " à " +
        new Date().toLocaleTimeString(),
    };
    setPosts([post, ...posts]);
    setShowCreateModal(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    if (selectedFiles.length > 0) {
      const validFiles = selectedFiles.filter(
        (file) =>
          (file.type.includes("image/") || file.type.includes("video/")) &&
          file.size <= 50 * 1024 * 1024,
      );

      if (validFiles.length !== selectedFiles.length) {
        setError(
          "Certains fichiers ont été rejetés (format non valide ou taille dépassée). Veuillez vérifier votre sélection.",
        );
      } else {
        setError("");
      }
      const renamedFiles = validFiles.map((file, idx) => {
        const ext = file.name.split(".").pop();
        const name = `Fichier_${new Date().getTime()}.${ext}`;
        return new File([file], name, { type: file.type });
      });
      setBlogPostCommand({ ...blogPostCommand, images: renamedFiles });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-4xl mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#033720",
            }}
          >
            Gestion des Posts
          </h1>
          <p className="text-gray-600">Créez et gérez vos publications</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105 cursor-pointer"
          style={{ backgroundColor: "#033720" }}
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
                <p className="text-sm text-gray-500">
                  Publié le {post.createdAt}
                </p>
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

            {post.images && post.images?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.images?.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`Post ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
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
                <h2
                  className="text-3xl"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#033720",
                  }}
                >
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
                  <label className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    value={blogPostCommand.content}
                    onChange={(e) => {
                      setBlogPostCommand({
                        ...blogPostCommand,
                        content: e.target.value,
                      });
                    }}
                    placeholder="Partagez vos pensées..."
                    className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="mb-2 text-sm font-medium flex items-center gap-2">
                    <User size={18} />
                    Auteur
                  </label>

                  <Select
                    name="authors"
                    className=""
                    title="Selectionner l'auteur du post"
                    items={authors.map((aut) => ({
                      name: aut.role,
                      value: aut.role,
                    }))}
                    onChange={(e) => {
                      setBlogPostCommand({
                        ...blogPostCommand,
                        author: {
                          ...blogPostCommand.author,
                          role: e.target.value,
                          name:
                            authors.find((aut) => aut.role === e.target.value)
                              ?.name || "",
                        },
                      });
                    }}
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="mb-2 text-sm font-medium flex items-center gap-2">
                    <ImageIcon size={18} />
                    Photos/Videos
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={fileChanged}
                    className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors cursor-pointer"
                    accept="image/*, video/*"
                    required
                    capture
                    multiple
                  />
                </div>

                {blogPostCommand.images.length > 0 && (
                  <div className="mt-4 pb-1 border-b border-gray-200">
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-4">
                      <span>Aperçu des photos sélectionnées :</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setBlogPostCommand(defaultBlogPost);
                        }}
                        className="flex items-center gap-2 p-1 rounded-sm text-white bg-[#033720] transition-all active:scale-90 cursor-pointer hover:bg-[#033720f0]"
                      >
                        <X />
                      </button>
                    </p>
                    <div className="flex gap-4 items-center overflow-x-auto">
                      {blogPostCommand.images.map((file, idx) => (
                        <a
                          key={idx}
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.type.includes("image/") ? (
                            <img
                              key={idx}
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded-md shadow cursor-pointer"
                            />
                          ) : file.type.includes("video/") ? (
                            <video
                              width="120"
                              height="80"
                              controls={false}
                              className="rounded-md shadow cursor-pointer h-20 object-cover"
                            >
                              <source
                                src={URL.createObjectURL(file)}
                                type={file.type}
                              />
                              Votre navigateur ne supporte pas la vidéo.
                            </video>
                          ) : (
                            file.name
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
                    style={{ backgroundColor: "#033720" }}
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
