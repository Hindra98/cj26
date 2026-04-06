import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export function AdminCards() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: "Notre Histoire", description: "Découvrez comment Joël et Claudia se sont rencontrés", icon: "❤️" },
    { id: 2, title: "Lieu de Réception", description: "Salle des fêtes de Japoma Cocotier", icon: "📍" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", icon: "" });

  const handleSubmit = () => {
    if (editingCard) {
      setCards(cards.map((c) => (c.id === editingCard.id ? { ...editingCard, ...formData } : c)));
    } else {
      const newCard: Card = {
        id: Date.now(),
        ...formData,
      };
      setCards([...cards, newCard]);
    }
    setShowModal(false);
    setEditingCard(null);
    setFormData({ title: "", description: "", icon: "" });
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setFormData({ title: card.title, description: card.description, icon: card.icon });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Gestion des Cards
          </h1>
          <p className="text-gray-600">Gérez les points forts de la page d'accueil</p>
        </div>
        <button
          onClick={() => {
            setEditingCard(null);
            setFormData({ title: "", description: "", icon: "" });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:scale-105"
          style={{ backgroundColor: '#033720' }}
        >
          <Plus size={20} />
          Nouvelle card
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{card.icon}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
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
                  {editingCard ? "Modifier card" : "Nouvelle card"}
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
                  <label className="block mb-2 text-sm font-medium">Icône (emoji)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="❤️"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Titre</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Notre Histoire"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description de la card..."
                    className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors resize-none"
                  />
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
                    {editingCard ? "Modifier" : "Créer"}
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
