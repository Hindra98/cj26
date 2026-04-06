export function AdminProgramme() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
          Gestion du Programme
        </h1>
        <p className="text-gray-600">Modifiez les détails des événements</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Jeudi 09 Avril 2026
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Titre</label>
              <input
                type="text"
                defaultValue="Mariage traditionnel (Dote)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                defaultValue="Cérémonie traditionnelle unissant les familles KOUATCHET et ZAMA"
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Samedi 11 Avril 2026
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#033720] pl-4">
              <h3 className="text-xl mb-3">08h30 - Mariage civil</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue="Mairie de Nkolbong"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
                <input
                  type="text"
                  defaultValue="Suivi d'un cocktail"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
              </div>
            </div>

            <div className="border-l-4 border-[#cf6112] pl-4">
              <h3 className="text-xl mb-3">14h30 - Bénédiction nuptiale</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue="Paroisse St Thomas d'Aquin"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
                <input
                  type="text"
                  defaultValue="À Ange Raphael"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
              </div>
            </div>

            <div className="border-l-4 border-[#d8a21e] pl-4">
              <h3 className="text-xl mb-3">20h00 - Soirée dansante</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  defaultValue="Salle des fêtes de Japoma Cocotier"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
                <input
                  type="text"
                  defaultValue="Face école primaire Duchesne"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#033720]"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full px-6 py-4 rounded-xl text-white text-lg transition-all hover:scale-105"
          style={{ backgroundColor: '#033720' }}
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
