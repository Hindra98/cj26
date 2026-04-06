import { Calendar, MapPin, Church, Music } from "lucide-react";
import { motion } from "motion/react";

export function Programme() {
  const events = [
    {
      date: "Jeudi 09 Avril 2026",
      time: null,
      title: "Mariage traditionnel (Dote)",
      description: "Cérémonie traditionnelle unissant les familles KOUATCHET et ZAMA",
      location: null,
      icon: Calendar,
      color: "#c95103",
      image: "https://images.unsplash.com/photo-1655682604826-7530b331b3e7?w=800",
    },
  ];

  const saturdayEvents = [
    {
      time: "08h30",
      title: "Mariage civil",
      description: "Cérémonie officielle à la mairie",
      location: "Mairie de Nkolbong",
      sublocation: "Suivi d'un cocktail",
      icon: Calendar,
      color: "#033720",
      image: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?w=800",
    },
    {
      time: "14h30",
      title: "Bénédiction nuptiale",
      description: "Cérémonie religieuse",
      location: "Paroisse St Thomas d'Aquin",
      sublocation: "À Ange Raphael",
      icon: Church,
      color: "#cf6112",
      image: "https://images.unsplash.com/photo-1661332517932-2d441bfb2994?w=800",
    },
    {
      time: "20h00",
      title: "Soirée dansante",
      description: "Célébration festive avec DJ et animations",
      location: "Salle des fêtes de Japoma Cocotier",
      sublocation: "Face école primaire Duchesne",
      icon: Music,
      color: "#d8a21e",
      image: "https://images.unsplash.com/photo-1634024319238-3f7c736255bc?w=800",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
            Programme du Mariage
          </h1>
          <p className="text-xl text-gray-600">09 — 11 Avril 2026</p>
          <div className="mt-6 inline-block px-6 py-3 rounded-full" style={{ backgroundColor: '#f8f8f8' }}>
            <p className="text-lg">Thème : <span style={{ color: '#c95103' }}>Terra Cotta</span></p>
          </div>
        </motion.div>

        {/* Jeudi - Mariage traditionnel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-10 flex flex-col justify-center">
                    <div
                      className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6"
                      style={{ backgroundColor: event.color }}
                    >
                      <Icon size={32} color="white" />
                    </div>
                    <p className="text-sm tracking-wider mb-2" style={{ color: event.color }}>
                      {event.date}
                    </p>
                    <h2 className="text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {event.title}
                    </h2>
                    <p className="text-gray-600 text-lg">{event.description}</p>
                  </div>
                  <div
                    className="h-80 md:h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Samedi - Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
              Samedi 11 Avril 2026
            </h2>
            <p className="text-gray-600">Une journée complète de célébrations</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#033720] via-[#cf6112] to-[#d8a21e]"></div>

            <div className="space-y-12">
              {saturdayEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative pl-24"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    {/* Time badge */}
                    <div
                      className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg"
                      style={{ backgroundColor: event.color }}
                    >
                      <span className="text-sm">{event.time}</span>
                    </div>

                    {/* Event card */}
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                      <div className="grid md:grid-cols-2">
                        <div className="p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon size={24} style={{ color: event.color }} />
                            <h3 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-6">{event.description}</p>
                          {event.location && (
                            <div className="flex items-start gap-3 text-gray-700">
                              <MapPin size={20} className="mt-1 flex-shrink-0" style={{ color: event.color }} />
                              <div>
                                <p className="font-medium">{event.location}</p>
                                {event.sublocation && (
                                  <p className="text-sm text-gray-500">{event.sublocation}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className="h-64 md:h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${event.image}')` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Info section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-[#033720] to-[#c95103] rounded-3xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Informations pratiques
          </h3>
          <p className="text-lg mb-2">Dress code : Tenue traditionnelle ou élégante</p>
          <p className="text-lg">Couleurs du thème : Terra Cotta (tons chauds de terre)</p>
        </motion.div>
      </div>
    </div>
  );
}
