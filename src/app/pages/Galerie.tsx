import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Masonry from "react-responsive-masonry";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Category = "all" | "dote" | "civil" | "eglise" | "soiree" | "couple" | "famille";

interface Photo {
  id: number;
  url: string;
  category: Category;
  title: string;
}

export function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: "all" as Category, label: "Toutes" },
    { id: "dote" as Category, label: "Dote" },
    { id: "civil" as Category, label: "Civil" },
    { id: "eglise" as Category, label: "Église" },
    { id: "soiree" as Category, label: "Soirée" },
    { id: "couple" as Category, label: "Couple" },
    { id: "famille" as Category, label: "Famille" },
  ];

  const photos: Photo[] = [
    { id: 1, url: "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800", category: "dote", title: "Cérémonie traditionnelle" },
    { id: 2, url: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=800", category: "couple", title: "Joël & Claudia" },
    { id: 3, url: "https://images.unsplash.com/photo-1661332517932-2d441bfb2994?w=800", category: "couple", title: "Portraits du couple" },
    { id: 4, url: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=800", category: "famille", title: "Famille réunie" },
    { id: 5, url: "https://images.unsplash.com/photo-1763368160924-abab3611ea3e?w=800", category: "dote", title: "Tenue traditionnelle" },
    { id: 6, url: "https://images.unsplash.com/photo-1660675133902-acd1b057f75d?w=800", category: "famille", title: "Famille KOUATCHET" },
    { id: 7, url: "https://images.unsplash.com/photo-1707096356962-beca7eebaeb4?w=800", category: "couple", title: "Moment complice" },
    { id: 8, url: "https://images.unsplash.com/photo-1769451742168-7683113b46a8?w=800", category: "famille", title: "Famille ZAMA" },
    { id: 9, url: "https://images.unsplash.com/photo-1766407354000-54a7129f7140?w=800", category: "soiree", title: "Ambiance festive" },
    { id: 10, url: "https://images.unsplash.com/photo-1767293940906-6aa1c13b514b?w=800", category: "soiree", title: "Musique et danse" },
  ];

  const filteredPhotos = selectedCategory === "all"
    ? photos
    : photos.filter((photo) => photo.category === selectedCategory);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(filteredPhotos.findIndex((p) => p.id === photo.id));
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Galerie Photos
          </h1>
          <p className="text-xl text-gray-600">Nos plus beaux moments</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#d8a21e]"
              }`}
              style={selectedCategory === category.id ? { backgroundColor: '#033720' } : {}}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Masonry columnsCount={3} gutter="1rem">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="relative group cursor-pointer rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => handlePhotoClick(photo)}
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-4 text-lg">{photo.title}</p>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={24} color="white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">‹</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">›</span>
              </button>

              <motion.div
                className="max-w-5xl max-h-[90vh] w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-auto rounded-2xl"
                />
                <p className="text-white text-center mt-4 text-xl">{selectedPhoto.title}</p>
                <p className="text-gray-400 text-center mt-2">
                  {currentIndex + 1} / {filteredPhotos.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
