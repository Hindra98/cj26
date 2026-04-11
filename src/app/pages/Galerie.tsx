import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Masonry from "react-responsive-masonry";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useGallery } from "../hooks/useGallery";
import { GallerySkeleton } from "../components/figma/Loader";

type Categorie = "all" | Category;

export function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState<Categorie>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GetGallery | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: "all" as Categorie, label: "Toutes" },
    { id: "dote" as Categorie, label: "Dote" },
    { id: "civil" as Categorie, label: "Civil" },
    { id: "eglise" as Categorie, label: "Église" },
    { id: "soiree" as Categorie, label: "Soirée" },
    { id: "couple" as Categorie, label: "Couple" },
    { id: "famille" as Categorie, label: "Famille" },
  ];

  const { data: photos, loading, error: dataError, refetch } = useGallery();

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const handlePhotoClick = (photo: GetGallery) => {
    setSelectedPhoto(photo);
    setCurrentIndex(filteredPhotos.findIndex((p) => p.id === photo.id));
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
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
          <h1
            className="text-6xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#033720",
            }}
          >
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
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#d8a21e] cursor-pointer"
              }`}
              style={
                selectedCategory === category.id
                  ? { backgroundColor: "#033720" }
                  : {}
              }
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
          {loading ? (
            [...Array(3)].map((_, idx) => <GallerySkeleton key={idx} />)
          ) : dataError ? (
            <div className="flex flex-col items-center gap-4 col-span-3">
              <p className="text-center text-red-500">
                Erreur lors du chargement des photos. Veuillez réessayer.
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
          ) : filteredPhotos.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucune photo pour le moment. Revenez bientôt !
            </p>
          ) : (
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
          )}
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
                className="absolute cursor-pointer top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={24} color="white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute cursor-pointer left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">
                  <ChevronLeft />
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute cursor-pointer right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">
                  <ChevronRight />
                </span>
              </button>

              <motion.div
                className="max-w-5xl max-h-[90vh] w-auto flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-auto h-full max-h-[80vh] rounded-2xl"
                />
                <p className="text-white text-center mt-4 text-xl">
                  {selectedPhoto.title}
                </p>
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
