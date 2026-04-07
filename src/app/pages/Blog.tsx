import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Blog() {
  const posts: GetBlogPost[] = [
    {
      id: 1,
      author: {
        name: "Joël & Claudia",
        avatar: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=100",
        role: "Les mariés",
      },
      createdAt: "Il y a 2 jours",
      content: "Nous sommes si heureux de partager avec vous ces moments précieux de notre préparation au mariage ! 🎉 Merci à tous pour votre soutien et votre amour. 💕",
      images: [
        "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=800",
        "https://images.unsplash.com/photo-1661332517932-2d441bfb2994?w=800",
      ],
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      author: {
        name: "Famille KOUATCHET",
        avatar: "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=100",
        role: "Famille du marié",
      },
      createdAt: "Il y a 3 jours",
      content: "Préparatifs de la dote traditionnelle ! Une journée remplie d'émotions et de traditions. 🌍✨",
      images: [
        "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800",
      ],
      likes: 189,
      comments: 32,
    },
    {
      id: 3,
      author: {
        name: "Organisation Mariage",
        avatar: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=100",
        role: "Organisateurs",
      },
      createdAt: "Il y a 5 jours",
      content: "Découvrez notre magnifique salle de réception à Japoma Cocotier ! Un lieu magique pour une soirée inoubliable. 🏛️✨",
      link: {
        url: "https://example.com",
        title: "Salle des fêtes Japoma Cocotier",
        description: "Une salle élégante et spacieuse pour célébrer votre mariage",
        image: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=800",
      },
      likes: 156,
      comments: 28,
    },
  ];

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
          <h1 className="text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Blog & Actualités
          </h1>
          <p className="text-xl text-gray-600">Suivez nos préparatifs</p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
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
                    src={post.author?.avatar}
                    alt={post.author?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{post.author?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {post.author?.role} • {post.createdAt}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
              </div>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className={`grid ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1`}>
                  {post.images.map((image, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={image}
                        alt={`Post image ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Post Link Preview */}
              {post.link && (
                <div className="mx-6 mb-4 border border-gray-200 rounded-2xl overflow-hidden hover:border-[#d8a21e] transition-colors cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={post.link.image}
                      alt={post.link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <LinkIcon size={14} />
                      <span>{new URL(post.link.url).hostname}</span>
                    </div>
                    <h4 className="font-medium mb-1">{post.link.title}</h4>
                    <p className="text-sm text-gray-600">{post.link.description}</p>
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#c95103] transition-colors">
                    <Heart size={20} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#033720] transition-colors">
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#d8a21e] transition-colors">
                  <Share2 size={20} />
                  <span>Partager</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Create Post Button (shows admin panel preview) */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-[#033720] to-[#c95103] rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Vous voulez publier ?
          </h3>
          <p className="mb-4">Connectez-vous au panel admin pour créer de nouveaux posts</p>
          <a
            href="/admin/posts"
            className="inline-block px-6 py-3 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: '#d8a21e', color: '#033720' }}
          >
            Accéder au panel admin
          </a>
        </motion.div>
      </div>
    </div>
  );
}
