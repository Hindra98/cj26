import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  ArrowRight,
  Search,
  X,
  Image as ImageIcon,
  LucideProps,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { JSX, useState } from "react";
import CountDown from "../components/CountDown";
import { images } from "../assets";
interface Highlight{
    title: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    view: JSX.Element;
}

const Rencontre = () => 
              <div className="space-x-3">
                  <motion.div
                className="aspect-square rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 2 * 0.05 }}
                whileHover={{ scale: 1.05 }}
                  >
                <ImageWithFallback
                  src={"https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800"}
                  alt={`Joel & Claudia`}
                  className="w-full h-full object-cover"
                />
                  </motion.div>
                  <motion.div
                    className="p-4 rounded-xl border border-gray-100 bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 4 * 0.05 }}
                  >
                     <div className="space-y-2">
                      <h2 className="text-xl text-[#033720] font-medium">Coup de foudre</h2>
                      <p className="text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit consequatur numquam praesentium voluptatum. Et at quia atque culpa similique sequi officia doloremque nobis quibusdam tempore eum, voluptatem, soluta sed.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim suscipit consequatur numquam praesentium voluptatum. Et at quia atque culpa similique sequi officia doloremque nobis quibusdam tempore eum, voluptatem, soluta sed.
                      </p>
                      </div> 
                  </motion.div>
              </div>;

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

  const highlights:Highlight[] = [
    {
      title: "Notre Histoire",
      description: "Découvrez comment Joël et Claudia se sont rencontrés",
      icon: Heart,
      view: <Rencontre/>,
    },
    {
      title: "Lieu de Réception",
      description: "Salle des fêtes de Japoma Cocotier",
      icon: MapPin,
      view: <Rencontre/>,
    },
    {
      title: "Programme Complet",
      description: "Tous les détails des événements",
      icon: Calendar,
      view: <Rencontre/>,
    },
    {
      title: "Les Familles",
      description: "Familles KOUATCHET & ZAMA",
      icon: Users,
      view: <Rencontre/>,
    },
  ];

  const galeriePreview = [
    "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800",
    "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=800",
    "https://images.unsplash.com/photo-1661332517932-2d441bfb2994?w=800",
    "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=800",
  ];

  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);
  // const img = URL.createObjectURL(images.couple);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(3, 55, 32, 0.9) 0%, rgba(201, 81, 3, 0.8) 100%), url('${images.couple}') center/cover`,
          // background: `linear-gradient(135deg, rgba(3, 55, 32, 0.9) 0%, rgba(201, 81, 3, 0.8) 100%), url('https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=1920') center/cover`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d8a21e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
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
            Joël <span style={{ color: "#d8a21e" }}>&</span> Claudia
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl mb-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="tracking-wide">Familles KOUATCHET & ZAMA</p>
            <p
              className="text-3xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#d8a21e",
              }}
            >
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
              style={{ backgroundColor: "#d8a21e", color: "#033720" }}
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
          
          <motion.h3
            className="text-3xl md:text-5xl tracking-widest pt-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
          {CountDown()}
        </motion.h3>
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
            <h2
              className="text-5xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#033720",
              }}
            >
              Programme
            </h2>
            <p className="text-gray-600 text-lg">
              Trois jours de célébrations inoubliables
            </p>
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
                  <p
                    className="text-sm tracking-wider mb-2"
                    style={{ color: card.color }}
                  >
                    {card.date}
                  </p>
                  <h3
                    className="text-2xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
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
            <h2
              className="text-5xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#033720",
              }}
            >
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
                  onClick={()=>setSelectedHighlight(index)}
                >
                  <Icon
                    size={32}
                    className="mb-4"
                    style={{ color: "#c95103" }}
                  />
                  <h4
                    className="text-xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
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
            <h2
              className="text-5xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
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
              style={{ backgroundColor: "#d8a21e", color: "#033720" }}
            >
              Voir toute la galerie <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Highlights Details */}
      <AnimatePresence>
        {selectedHighlight>0 && selectedHighlight<5 && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHighlight(0)}
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
                  {highlights[selectedHighlight].title}
                </h3>
                <button
                  onClick={() => setSelectedHighlight(0)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
{highlights[selectedHighlight].view}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
