import { useState } from "react";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Category = "marie" | "mariee" | "vip";

interface Guest {
  id: number;
  name: string;
  table: number;
  category: Category;
}

export function AdminInvites() {
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: "Jean-Paul KOUATCHET", table: 1, category: "marie" },
    { id: 2, name: "Marie KOUATCHET", table: 1, category: "marie" },
    { id: 3, name: "Pierre ZAMA", table: 2, category: "mariee" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [formData, setFormData] = useState({ name: "", table: 1, category: "marie" as Category });

  const handleSubmit = () => {
    if (editingGuest) {
      setGuests(guests.map((g) => (g.id === editingGuest.id ? { ...editingGuest, ...formData } : g)));
    } else {
      const newGuest: Guest = {
        id: Date.now(),
        name: formData.name,
        table: formData.table,
        category: formData.category,
      };
      setGuests([...guests, newGuest]);
    }
    setShowModal(false);
    setEditingGuest(null);
    setFormData({ name: "", table: 1, category: "marie" });
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setFormData({ name: guest.name, table: guest.table, category: guest.category });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const tables = Array.from(new Set(guests.map((g) => g.table))).sort();
  const guestsByTable = guests.reduce((acc, guest) => {
    if (!acc[guest.table]) acc[guest.table] = [];
    acc[guest.table].push(guest);
    return acc;
  }, {} as Record<number, Guest[]>);

  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case "marie": return "Famille marié";
      case "mariee": return "Famille mariée";
      case "vip": return "VIP";
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "marie": return "#033720";
      case "mariee": return "#c95103";
      case "vip": return "#d8a21e";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Gestion des Invités
          </h1>
          <p className="text-gray-600">{guests.length} invités • {tables.length} tables</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#033720] text-[#033720] transition-all hover:bg-[#033720] hover:text-white">
            <Upload size={20} />
            Importer CSV
          </button>
          <button
            onClick={() => {
              setEditingGuest(null);
              setFormData({ name: "", table: 1, category: "marie" });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#033720' }}
          >
            <Plus size={20} />
            Ajouter invité
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["marie", "mariee", "vip"] as Category[]).map((cat) => {
          const count = guests.filter((g) => g.category === cat).length;
          return (
            <motion.div
              key={cat}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: getCategoryColor(cat) }}
              >
                {count}
              </div>
              <p className="font-medium">{getCategoryLabel(cat)}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tables */}
      <div className="space-y-6">
        {tables.map((tableNumber) => (
          <motion.div
            key={tableNumber}
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Table {tableNumber} ({guestsByTable[tableNumber].length} invités)
            </h3>
            <div className="space-y-3">
              {guestsByTable[tableNumber].map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: getCategoryColor(guest.category) }}
                    >
                      {guest.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <span
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: getCategoryColor(guest.category) }}
                      >
                        {getCategoryLabel(guest.category)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(guest)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(guest.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
                  {editingGuest ? "Modifier invité" : "Ajouter invité"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean DUPONT"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Numéro de table</label>
                  <input
                    type="number"
                    value={formData.table}
                    onChange={(e) => setFormData({ ...formData, table: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  >
                    <option value="marie">Famille marié</option>
                    <option value="mariee">Famille mariée</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
                    style={{ backgroundColor: '#033720' }}
                  >
                    {editingGuest ? "Modifier" : "Ajouter"}
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
