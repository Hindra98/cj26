import {
  FileText,
  Image,
  Users,
  TrendingUp,
  Calendar,
  Square,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CountDown from "../../components/CountDown";

export function AdminDashboard() {
  const stats = [
    { label: "Posts publiés", value: "12", icon: FileText, color: "#033720" },
    { label: "Photos", value: "156", icon: Image, color: "#c95103" },
    { label: "Invités", value: "180", icon: Users, color: "#cf6112" },
    { label: "Tables", value: "18", icon: Square, color: "#d8a21e" },
  ];

  const recentActivity = [
    { action: "Nouveau post créé", time: "Il y a 2 heures", type: "post" },
    { action: "5 photos ajoutées", time: "Il y a 5 heures", type: "photo" },
    { action: "10 invités ajoutés", time: "Hier", type: "guest" },
    {
      action: "Programme mis à jour",
      time: "Il y a 2 jours",
      type: "programme",
    },
  ];

  const weddingDates = new Date("2026-04-09T20:30:00");
  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "#033720" }}
        >
          Dashboard
        </h1>
        <p className="text-gray-600">Vue d'ensemble de votre site de mariage</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon size={24} color="white" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <p
                className="text-4xl mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Activité récente
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#033720" }}
                >
                  {activity.type === "post" && (
                    <FileText size={18} color="white" />
                  )}
                  {activity.type === "photo" && (
                    <Image size={18} color="white" />
                  )}
                  {activity.type === "guest" && (
                    <Users size={18} color="white" />
                  )}
                  {activity.type === "programme" && (
                    <Calendar size={18} color="white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2
            className="text-2xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/posts"
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#033720] transition-colors text-center group"
            >
              <FileText
                size={32}
                className="mx-auto mb-3 text-gray-400 group-hover:text-[#033720] transition-colors"
              />
              <p className="font-medium">Nouveau post</p>
            </a>
            <a
              href="/admin/galerie"
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#c95103] transition-colors text-center group"
            >
              <Image
                size={32}
                className="mx-auto mb-3 text-gray-400 group-hover:text-[#c95103] transition-colors"
              />
              <p className="font-medium">Upload photos</p>
            </a>
            <a
              href="/admin/invites"
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#cf6112] transition-colors text-center group"
            >
              <Users
                size={32}
                className="mx-auto mb-3 text-gray-400 group-hover:text-[#cf6112] transition-colors"
              />
              <p className="font-medium">Ajouter invité</p>
            </a>
            <a
              href="/admin/cards"
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#d8a21e] transition-colors text-center group"
            >
              <Square
                size={32}
                className="mx-auto mb-3 text-gray-400 group-hover:text-[#d8a21e] transition-colors"
              />
              <p className="font-medium">Gérer cards</p>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Info Banner */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-[#033720] to-[#c95103] rounded-2xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3
          className="text-2xl mb-2"
        >
          {CountDown(weddingDates)}
        </h3>
        <p>
          Le grand jour approche. N'oubliez pas de vérifier la liste des invités
          et le programme.
        </p>
      </motion.div>
    </div>
  );
}
