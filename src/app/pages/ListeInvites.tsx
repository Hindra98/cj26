import { useState } from "react";
import { Search, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// type TableName = "all" | TableName;

interface Guest {
  id: number;
  name: string;
  table: TableName;
  category: "marie" | "mariee" | "ami_marie" | "ami_mariee" | "vip";
}

export function ListeInvites() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTable, setSelectedTable] = useState<TableName | null>(null);

  const guests: Guest[] = [
    { id: 2, name: "Mr/Mme GAMGA", table: "Paix", category: "mariee" },
    { id: 2, name: "Mr/Mme NJEUTCHAM", table: "Paix", category: "mariee" },
    { id: 2, name: "Mr/Mme EVA", table: "Paix", category: "mariee" },
    { id: 2, name: "Mr/Mme AWA", table: "Paix", category: "mariee" },
    { id: 2, name: "Mr TCHOUNDJA", table: "Paix", category: "mariee" },
    { id: 2, name: "Mme MBAKAM", table: "Paix", category: "mariee" },

    { id: 2, name: "Mr/Mme MBA", table: "Rejouissance", category: "mariee" },
    { id: 2, name: "Mr/Mme NDIA", table: "Rejouissance", category: "mariee" },
    { id: 2, name: "Mr/Mme FOTSING", table: "Rejouissance", category: "mariee" },
    { id: 2, name: "Mr/Mme KOUADJIP", table: "Rejouissance", category: "mariee" },
    { id: 2, name: "Mme TCHAPPI LOUISE", table: "Rejouissance", category: "mariee" },
    { id: 2, name: "Mme DEPPO SOLANGE", table: "Rejouissance", category: "mariee" },

    { id: 2, name: "Mr/Mme EBONGUE", table: "Douceur", category: "mariee" },
    { id: 2, name: "Mr/Mme NJOKE", table: "Douceur", category: "mariee" },
    { id: 2, name: "Mr/Mme KIARI", table: "Douceur", category: "mariee" },
    { id: 2, name: "Mr/Mme PRISO", table: "Douceur", category: "mariee" },
    { id: 2, name: "Mr/Mme NDOUMBE", table: "Douceur", category: "mariee" },

    { id: 2, name: "Mr/Mme MOUSSIMA", table: "Humilite", category: "mariee" },
    { id: 2, name: "Mr/Mme WONDJA", table: "Humilite", category: "mariee" },
    { id: 2, name: "Mme KAMGA", table: "Humilite", category: "mariee" },
    { id: 2, name: "Mr/Mme MONDOU", table: "Humilite", category: "mariee" },
    { id: 2, name: "Mr/Mme TCHAPPI", table: "Humilite", category: "mariee" },
    { id: 2, name: "Mme KAMGA LARISSA", table: "Humilite", category: "mariee" },

    { id: 2, name: "Mr/Mme TODOUM", table: "Pardon", category: "mariee" },
    { id: 2, name: "Mr/Mme NGOKO", table: "Pardon", category: "mariee" },
    { id: 2, name: "Mr/Mme SOH", table: "Pardon", category: "mariee" },
    { id: 2, name: "Mr/Mme NAOUSSI", table: "Pardon", category: "mariee" },
    { id: 2, name: "Mme MAGNE AVELINE", table: "Pardon", category: "mariee" },
    { id: 2, name: "Mme FANDJO BRIGITTE", table: "Pardon", category: "mariee" },

    { id: 2, name: "Mr/Mme KAMKOUIMO", table: "Priere", category: "mariee" },
    { id: 2, name: "Mr/Mme MONKAM", table: "Priere", category: "mariee" },
    { id: 2, name: "Mr/Mme SAS", table: "Priere", category: "mariee" },
    { id: 2, name: "Mr/Mme ADELINE", table: "Priere", category: "mariee" },
    { id: 2, name: "Mme POUOMEGNE", table: "Priere", category: "mariee" },
    { id: 2, name: "Mme MAGNI MARIE", table: "Priere", category: "mariee" },
    { id: 2, name: "Mme KAMGA", table: "Priere", category: "mariee" },
    { id: 2, name: "Mme NJIKE", table: "Priere", category: "mariee" },
    { id: 2, name: "Mme KAMGA", table: "Priere", category: "mariee" },

    { id: 2, name: "Mlle NENBA BETTY", table: "Benediction", category: "mariee" },
    { id: 2, name: "Mlle WANDJI ANGE", table: "Benediction", category: "mariee" },
    { id: 2, name: "Mlle DJOU GLORIA", table: "Benediction", category: "mariee" },
    { id: 2, name: "Mlle SUFO HERMINE", table: "Benediction", category: "mariee" },
    { id: 2, name: "Mlle TSAFACK LINDA", table: "Benediction", category: "mariee" },

    { id: 2, name: "Mme FANDJO BRIGITTE", table: "Fidelite", category: "mariee" },
    { id: 2, name: "Mme FANDJO BRIGITTE", table: "Patience", category: "mariee" },
    { id: 2, name: "Mme FANDJO BRIGITTE", table: "Foi", category: "mariee" },



    { id: 3, name: "Pierre ZAMA", table: "Esperance", category: "marie" },
    { id: 4, name: "Sophie ZAMA", table: "Esperance", category: "marie" },
    { id: 5, name: "Ambassadeur MBARGA", table: "Fidelite", category: "vip" },
    { id: 6, name: "Dr. NKOMO", table: "Fidelite", category: "vip" },
    { id: 7, name: "Emmanuel KOUATCHET", table: "Miracle", category: "mariee" },
    {
      id: 8,
      name: "Françoise KOUATCHET",
      table: "Miracle",
      category: "mariee",
    },
    { id: 9, name: "André ZAMA", table: "Esperance", category: "marie" },
    { id: 10, name: "Célestine ZAMA", table: "Esperance", category: "marie" },
    { id: 11, name: "Ministre FOTSO", table: "Fidelite", category: "vip" },
    { id: 12, name: "Madame FOTSO", table: "Fidelite", category: "vip" },
  ];

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const tables: TableName[] = [
    "Abondance",
    "Amour",
    "Benediction",
    "Courage",
    "Douceur",
    "Elevation",
    "Esperance",
    "Espoir",
    "Fidelite",
    "Foi",
    "Gloire",
    "Grace",
    "Humilite",
    "Intelligence",
    "Justice",
    "Maitrise",
    "Miracle",
    "Pardon",
    "Patience",
    "Paix",
    "Priere",
    "Protection",
    "Rejouissance",
    "Sagesse",
    "Victoire",
    "Lumiere","Misericorde"
  ];

  const getGuestsByTable = (tableNumber: TableName) =>
    guests.filter((guest) => guest.table === tableNumber);

  const getCategoryLabel = (category: Guest["category"]) => {
    switch (category) {
      case "marie":
        return "Famille marié";
      case "mariee":
        return "Famille mariée";
      case "ami_marie":
        return "Amis du marié";
      case "ami_mariee":
        return "Amies de la mariée";
      case "vip":
        return "VIP";
      default:
        return "";
    }
  };

  const getCategoryColor = (category: Guest["category"]) => {
    switch (category) {
      case "marie":
        return "#033720";
      case "mariee":
        return "#c95103";
      case "ami_marie":
        return "#dab24b";
      case "ami_mariee":
        return "#cf6112";
      case "vip":
        return "#d8a21e";
      default:
        return "#gray";
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
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
            Liste des Invités
          </h1>
          <p className="text-xl text-gray-600">Plan de table</p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher un invité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors"
            />
          </div>
        </motion.div>

        {/* Tables */}
        {searchTerm === "" ? (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {tables.map((tableNumber, index) => {
              const tableGuests = getGuestsByTable(tableNumber);
              return (
                <motion.div
                  key={tableNumber}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedTable(tableNumber)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#033720" }}
                    >
                      <Users size={24} color="white" />
                    </div>
                    <h3
                      className="text-2xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Table {tableNumber}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {tableGuests.length} invités
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(tableGuests.map((g) => g.category)),
                    ).map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-full text-xs text-white"
                        style={{ backgroundColor: getCategoryColor(cat) }}
                      >
                        {getCategoryLabel(cat)}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Résultats de recherche ({filteredGuests.length})
            </h3>
            <div className="space-y-3">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{guest.name}</p>
                    <p className="text-sm text-gray-500">Table {guest.table}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{
                      backgroundColor: getCategoryColor(guest.category),
                    }}
                  >
                    {getCategoryLabel(guest.category)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Modal Table Details */}
        <AnimatePresence>
          {selectedTable !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTable(null)}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-3xl"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#033720",
                    }}
                  >
                    Table {selectedTable}
                  </h3>
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-3">
                  {getGuestsByTable(selectedTable).length === 0 ? (
                    <p className="text-gray-600">Aucun invité à cette table.</p>
                  ) : getGuestsByTable(selectedTable).map((guest, index) => (
                    <motion.div
                      key={guest.id}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{guest.name}</p>
                        <span
                          className="px-3 py-1 rounded-full text-xs text-white"
                          style={{
                            backgroundColor: getCategoryColor(guest.category),
                          }}
                        >
                          {getCategoryLabel(guest.category)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
