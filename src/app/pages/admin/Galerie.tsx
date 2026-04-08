import { useState } from "react";
import { Upload, Trash2, FolderOpen, X } from "lucide-react";
import { motion } from "motion/react";
import { Select } from "../../components/figma/Input";
import { useGallery } from "../../hooks/useGallery";
import { createGallery, uploadGalleryMedia } from "../../utils/gallery.service";

export function AdminGalerie() {
  const [photos, setPhotos] = useState<GetGallery[]>(
  useGallery()
  // [
  //   {
  //     id: 1,
  //     url: "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=400",
  //     title: "Examples",
  //     type: "photo",
  //     category: "dote",
  //     uploadedAt: "2026-04-01",
  //   },
  //   {
  //     id: 2,
  //     url: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=400",
  //     title: "Examples",
  //     type: "photo",
  //     category: "couple",
  //     uploadedAt: "2026-04-02",
  //   },
  //   {
  //     id: 3,
  //     url: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=400",
  //     title: "Examples",
  //     type: "photo",
  //     category: "soiree",
  //     uploadedAt: "2026-04-03",
  //   },
  // ]
);

  const [selectedCategory, setSelectedCategory] = useState<Category>("dote");
  const [newPhotoFiles, setNewPhotoFiles] = useState<File[]>([]);
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [error, setError] = useState("");

  const categories: { id: Category; label: string }[] = [
    { id: "dote", label: "Dote" },
    { id: "civil", label: "Civil" },
    { id: "eglise", label: "Église" },
    { id: "soiree", label: "Soirée" },
    { id: "couple", label: "Couple" },
    { id: "famille", label: "Famille" },
  ];

  const handleUpload = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newPhotoFiles.length > 0 && newPhotoTitle.trim() !== "") {
      const photo: GetGallery[] = newPhotoFiles.map((file) => ({
        id: Date.now(),
        url: URL.createObjectURL(file),
        category: selectedCategory,
        title: newPhotoTitle.trim() || "Nouvelle photo",
        type: file.type.includes("video/") ? "video" : "photo",
        uploadedAt:
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      }));
      // uploadGalleryMedia(newPhotoFiles[0]);
      createGallery({
        url: newFileName,
        title: photo[0].title,
        category: photo[0].category,
        type: photo[0].type || "photo",
      });
      setPhotos([...photo, ...photos]);
      setNewPhotoFiles([]);
      setNewPhotoTitle("");
      setError("");
    } else {
      setError("Veuillez remplir tous les champs.");
    }
  };
  const fileChanged = async(event: React.ChangeEvent<HTMLInputElement>) => {
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
      const t = await uploadGalleryMedia(renamedFiles[0]);
      setNewFileName(t)

      setNewPhotoFiles(renamedFiles);
    }
  };

  const handleDelete = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const photosByCategory = photos.reduce(
    (acc, photo) => {
      if (!acc[photo.category]) acc[photo.category] = [];
      acc[photo.category].push(photo);
      return acc;
    },
    {} as Record<Category, GetGallery[]>,
  );
  const gal = useGallery();

  console.log("gal: ", gal);

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "#033720" }}
        >
          Gestion de la Galerie {newFileName}
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
        <h2
          className="text-2xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ajouter une photo
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Titre</label>
              <input
                type="text"
                value={newPhotoTitle}
                onChange={(e) => setNewPhotoTitle(e.target.value)}
                placeholder="Couple, Famille, Soirée..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors w-full"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">
                Catégorie
              </label>
              <Select
                name="category"
                className=""
                title="Modifier la catégorie de la photo"
                items={categories.map((cat) => ({
                  name: cat.label,
                  value: cat.id,
                }))}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as Category);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Photos</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="file"
                name="files"
                onChange={fileChanged}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors cursor-pointer"
                accept="image/*, video/*"
                required
                capture
                multiple
              />
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: "#033720" }}
              >
                <Upload size={20} />
                Upload
              </button>
            </div>
          </div>
          {newPhotoFiles.length > 0 && (
            <div className="mt-4 pb-1 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-4">
                <span>Aperçu des photos sélectionnées :</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPhotoFiles([]);
                  }}
                  className="flex items-center gap-2 p-1 rounded-sm text-white bg-[#033720] transition-all active:scale-90 cursor-pointer hover:bg-[#033720f0]"
                >
                  <X />
                </button>
              </p>
              <div className="flex gap-4 items-center overflow-x-auto">
                {newPhotoFiles.map((file, idx) => (
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
        </form>
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
            <p className="text-2xl font-bold">
              {photosByCategory[cat.id]?.length || 0}
            </p>
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
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cat.label} ({categoryPhotos.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryPhotos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    {photo.type === "photo" ? (
                    <img
                      src={photo.url}
                      alt={cat.label}
                      className="w-full aspect-square object-cover rounded-xl"
                    />):(
                      <video
                        src={photo.url}
                        controls
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 size={20} color="white" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {photo.uploadedAt}
                    </p>
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
          <p className="text-gray-400">
            Commencez par ajouter des photos ci-dessus
          </p>
        </div>
      )}
    </div>
  );
}
