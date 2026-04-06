import { Link } from "react-router";
import { Calendar, MapPin, Users, Heart, ArrowRight, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const programmeCards = [
    {
      date: "Jeudi 09 Avril",
      title: "Mariage traditionnel",
      subtitle: "Dote",
      icon: Heart,
      color: "#c95103",
    },
    {
      date: "Samedi 11 Avril",
      title: "Mariage civil & Bénédiction",
      subtitle: "08h30 - 14h30",
      icon: Calendar,
      color: "#033720",
    },
    {
      date: "Samedi 11 Avril",
      title: "Soirée dansante",
      subtitle: "20h00 - Japoma Cocotier",
      icon: Users,
      color: "#cf6112",
    },
  ];

  const highlights = [
    {
      title: "Notre Histoire",
      description: "Découvrez comment Joël et Claudia se sont rencontrés",
      icon: Heart,
    },
    {
      title: "Lieu de Réception",
      description: "Salle des fêtes de Japoma Cocotier",
      icon: MapPin,
    },
    {
      title: "Programme Complet",
      description: "Tous les détails des événements",
      icon: Calendar,
    },
    {
      title: "Les Familles",
      description: "Familles KOUATCHET & ZAMA",
      icon: Users,
    },
  ];

  const galeriePreview = [
    "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800",
    "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=800",
    "https://images.unsplash.com/photo-1661332517932-2d441bfb2994?w=800",
    "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=800",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(3, 55, 32, 0.9) 0%, rgba(201, 81, 3, 0.8) 100%), url('https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=1920') center/cover`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d8a21e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Joël <span style={{ color: '#d8a21e' }}>&</span> Claudia
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl mb-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="tracking-wide">Familles KOUATCHET & ZAMA</p>
            <p className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: '#d8a21e' }}>
              09 — 11 Avril 2026
            </p>
            <p className="text-lg tracking-widest">Douala — Nyalla Japoma</p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              to="/programme"
              className="px-8 py-4 rounded-full text-lg transition-all hover:scale-105 flex items-center gap-2"
              style={{ backgroundColor: '#d8a21e', color: '#033720' }}
            >
              Voir le programme <ArrowRight size={20} />
            </Link>
            <Link
              to="/galerie"
              className="px-8 py-4 rounded-full text-lg border-2 border-white transition-all hover:bg-white hover:text-[#033720] flex items-center gap-2"
            >
              <ImageIcon size={20} /> Voir la galerie
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Programme Section */}
      <section className="py-20 px-4 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
              Programme
            </h2>
            <p className="text-gray-600 text-lg">Trois jours de célébrations inoubliables</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {programmeCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={32} color="white" />
                  </div>
                  <p className="text-sm tracking-wider mb-2" style={{ color: card.color }}>
                    {card.date}
                  </p>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
              Points Forts
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#d8a21e] transition-all cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon size={32} className="mb-4" style={{ color: '#c95103' }} />
                  <h4 className="text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galerie Preview Section */}
      <section className="py-20 px-4 bg-[#033720] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Galerie Photos
            </h2>
            <p className="text-gray-300 text-lg">Quelques moments capturés</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {galeriePreview.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Galerie ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/galerie"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg transition-all hover:scale-105"
              style={{ backgroundColor: '#d8a21e', color: '#033720' }}
            >
              Voir toute la galerie <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
