import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useBlogPost } from "../hooks/useGallery";
import { formatDate } from "../utils/wedding.func";
import { PostSkeleton } from "../components/figma/Loader";
import { Plus } from "lucide-react";

export function Blog() {
  const { data: posts, loading, error, refetch } = useBlogPost();

  return (
    <div className="min-h-screen py-20 px-4 bg-[#f8f8f8]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-6xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#033720",
            }}
          >
            Blog & Actualités
          </h1>
          <p className="text-xl text-gray-600">Suivez nos préparatifs</p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {loading ? (
            [...Array(3)].map((_, idx) => <PostSkeleton key={idx} />)
          ) : error ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-red-500">
                Erreur lors du chargement des posts. Veuillez réessayer.
              </p>

              <button
                onClick={refetch}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "#d8a21e" }}
              >
                <Plus size={20} />
                Rafraichir
              </button>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun post pour le moment. Revenez bientôt !
            </p>
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Post Header */}
                <div className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={post.author_avatar}
                      alt={post.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{post.author_name}</h3>
                    <p className="text-sm text-gray-500">
                      {post.author_role} • {formatDate(post.created_at)}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Post Images */}
                {post.blog_images && post.blog_images.length > 0 && (
                  <div
                    className={`grid ${post.blog_images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1`}
                  >
                    {post.blog_images.map((image, idx) => (
                      <div key={idx} className="aspect-square overflow-hidden">
                        {image.type === "video" ? (
                          <video
                            controls
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          >
                            <source src={image.url} />
                            Votre navigateur ne supporte pas la vidéo.
                          </video>
                        ) : (
                          <ImageWithFallback
                            src={image.url}
                            alt={`Post image ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            ))
          )}
        </div>

        {/* Create Post Button (shows admin panel preview) */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-[#033720] to-[#c95103] rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3
            className="text-2xl mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vous voulez publier ?
          </h3>
          <p className="mb-4">
            Connectez-vous au panel admin pour créer de nouveaux posts
          </p>
          <a
            href="/admin/posts"
            className="inline-block px-6 py-3 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: "#d8a21e", color: "#033720" }}
          >
            Accéder au panel admin
          </a>
        </motion.div>
      </div>
    </div>
  );
}
