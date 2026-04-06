import { useState } from "react";
import { Upload, Trash2, FolderOpen } from "lucide-react";
import { motion } from "motion/react";

type Category = "dote" | "civil" | "eglise" | "soiree" | "couple" | "famille";

interface Photo {
  id: number;
  url: string;
  category: Category;
  uploadedAt: string;
}

export function AdminGalerie() {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=400", category: "dote", uploadedAt: "2026-04-01" },
    { id: 2, url: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=400", category: "couple", uploadedAt: "2026-04-02" },
    { id: 3, url: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=400", category: "soiree", uploadedAt: "2026-04-03" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<Category>("dote");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const categories: { id: Category; label: string }[] = [
    { id: "dote", label: "Dote" },
    { id: "civil", label: "Civil" },
    { id: "eglise", label: "Église" },
    { id: "soiree", label: "Soirée" },
    { id: "couple", label: "Couple" },
    { id: "famille", label: "Famille" },
  ];

  const handleUpload = () => {
    if (newPhotoUrl.trim()) {
      const photo: Photo = {
        id: Date.now(),
        url: newPhotoUrl,
        category: selectedCategory,
        uploadedAt: new Date().toISOString().split("T")[0],
      };
      setPhotos([photo, ...photos]);
      setNewPhotoUrl("");
    }
  };

  const handleDelete = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const photosByCategory = photos.reduce((acc, photo) => {
    if (!acc[photo.category]) acc[photo.category] = [];
    acc[photo.category].push(photo);
    return acc;
  }, {} as Record<Category, Photo[]>);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
          Gestion de la Galerie
        </h1>
        <p className="text-gray-600">Ajoutez et organisez vos photos</p>
      </div>

      {/* Upload Section */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ajouter une photo
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Catégorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">URL de la photo</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://exemple.com/image.jpg"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
              />
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
                style={{ backgroundColor: '#033720' }}
              >
                <Upload size={20} />
                Upload
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            className="bg-white rounded-xl p-4 shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <FolderOpen size={24} className="mx-auto mb-2 text-[#033720]" />
            <p className="text-2xl font-bold">{photosByCategory[cat.id]?.length || 0}</p>
            <p className="text-sm text-gray-600">{cat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Photos by Category */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const categoryPhotos = photosByCategory[cat.id] || [];
          if (categoryPhotos.length === 0) return null;

          return (
            <motion.div
              key={cat.id}
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {cat.label} ({categoryPhotos.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryPhotos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={cat.label}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={20} color="white" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{photo.uploadedAt}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-20">
          <Upload size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-xl text-gray-500">Aucune photo dans la galerie</p>
          <p className="text-gray-400">Commencez par ajouter des photos ci-dessus</p>
        </div>
      )}
    </div>
  );
}
