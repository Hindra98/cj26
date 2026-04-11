import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsUpDown, PenBox } from "lucide-react";
import { Switch as ShadSwitch } from "../ui/switch";
import { CJ_THEME, themeConstants } from "../../utils/constants";
import { Loader } from "./Loader";

export const Switch = ({
  name = "",
  id,
  disabled = false,
  checked = false,
  className = "",
  value = "",
  label = "",
  title = "",
  inverse = false,
  onChange,
}: SwitchProps) => {
  return (
    <motion.label
      whileFocus={{ scale: 1.05 }}
      className={`${className} text-md flex gap-4 items-center cursor-pointer w-full ${
        inverse ? "flex-row-reverse" : "flex-row"
      }`}
      title={title}
      htmlFor={id}
    >
      <span className="w-full">{label}</span>
      <ShadSwitch
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        className="cursor-pointer"
        checked={checked}
        onCheckedChange={onChange}
      />
    </motion.label>
  );
};

export const Select = ({
  name = "",
  id = "",
  className = "",
  disabled = false,
  title = "",
  items = [],
  onChange,
}: SelectProps) => {
  return (
    <motion.div
      whileFocus={{ scale: 1.05 }}
      className={`${className} input-hindra text-md flex gap-2 items-center relative`}
      title={title}
    >
      <motion.select
        id={id}
        name={name}
        className={
          "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#033720] transition-colors cursor-pointer appearance-none"
        }
        disabled={disabled}
        onChange={onChange}
      >
        {items.map((item, idx) => (
          <motion.option
            key={idx}
            value={item.value}
            id={item?.id}
            disabled={item?.disabled}
            className={`${item.className} cursor-pointer bg-background text-foreground`}
            selected={item?.selected}
          >
            {item.name}
          </motion.option>
        ))}
      </motion.select>
      <ChevronsUpDown className="size-4 absolute right-1" />
    </motion.div>
  );
};

interface ModeSelectorProps {
  onToggle?: (theme: Theme) => void;
  className: string;
  isText?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  onToggle,
  className,
  isText = false,
}) => {
  // État local pour le thème. Initialisez-le par défaut à 'light'
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(CJ_THEME) || themeConstants.LIGHT) as Theme,
  );

  // Appliquer le thème au `document` et sauvegarder la préférence
  useEffect(() => {
    document.documentElement.className = theme; // Ajoute la classe au root
    localStorage.setItem(CJ_THEME, theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prevTheme) =>
      prevTheme === themeConstants.LIGHT
        ? (themeConstants.DARK as Theme)
        : (themeConstants.LIGHT as Theme),
    );

    // Appelez la fonction de rappel si elle est fournie
    const newTheme =
      theme === themeConstants.LIGHT
        ? themeConstants.DARK
        : themeConstants.LIGHT;
    if (onToggle) {
      onToggle(newTheme as Theme);
    }
  };

  return (
    <div className={` ${className} flex items-center gap-2`}>
      {isText && (
        <span className="text-sm font-medium text-foreground">Light</span>
      )}

      {/* Le conteneur principal (la piste du commutateur) 
        Nous utilisons 'peer' pour cibler le bouton de bascule lorsque l'input est actif.
      */}
      <label
        htmlFor="theme-toggle"
        className="relative inline-block w-14 h-8 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 dark:bg-gray-700"
      >
        {/* L'input checkbox caché */}
        <input
          id="theme-toggle"
          type="checkbox"
          checked={theme === "dark"}
          onChange={handleToggle}
          className="sr-only peer" // sr-only cache visuellement l'input, mais le rend accessible
        />

        {/* L'indicateur (la pastille) 
          Il bascule entre les icônes et se déplace avec la propriété 'translate-x'
        */}
        <span
          className={`absolute left-0 top-0 h-8 w-14 rounded-full transition-all duration-300 pointer-events-none overflow-hidden
          ${theme === "dark" ? "bg-indigo-600" : "bg-yellow-400"}`}
        >
          {/* Etoile pour la nuit */}
          {theme === "dark" && (
            <span className="relative w-full h-full flex bg-ambe-600">
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-1.5 top-1 left-7/12"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-0.5 top-2/12 left-1/12"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-1.5 top-2/12 left-4/12"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-1 top-6/12 left-1"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-1.5 top-8/12 left-4/12"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-0.5 top-9/12 left-1/12"></i>
              <i className="absolute flex rounded-full bg-white/30 shadow hadow-yellow-200 size-1.5 top-10/12 left-10/12"></i>
            </span>
          )}
          {/* Icône de soleil/lune pour l'indicateur */}
          <div
            className={`absolute w-6 h-6 rounded-full top-1 transition-transform duration-300 flex items-center justify-center 
              ${
                theme === "dark"
                  ? "translate-x-full left-1 bg-gray-800"
                  : "translate-x-0 left-1 bg-white"
              }`}
          >
            {/* Icône: Lune 🌙 (Mode Dark/Sombre) || Soleil ☀️ (Mode Light/Clair) */}
            {theme === "dark" ? (
              <span role="img" aria-label="moon" className="text-xl">
                🌙
              </span>
            ) : (
              <span role="img" aria-label="sun" className="text-xl">
                ☀️
              </span>
            )}
          </div>
        </span>

        {/* L'ombre de la piste pour le thème sombre (déplacée à gauche) */}
        <span
          className={`absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-300 
            ${theme === "dark" ? "translate-x-full" : "translate-x-0"}`}
        ></span>
      </label>
      {isText && (
        <span className="text-sm font-medium text-foreground">Dark</span>
      )}
    </div>
  );
};

export const Button = ({
  loading = false,
  backgroundColor = "",
  className = "",
  children = "",
  handleClick,
  ...props
}: ButtonProps) => {
  const cl = `border-t-[${backgroundColor}]`;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 cursor-pointer ${className}`}
      style={{ backgroundColor: `${backgroundColor}` }}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div
          className={`w-4 h-4 border-2 border-gray-300 rounded-full animate-spin`}
          style={{ borderTopColor: `${backgroundColor}` }}
        />
      )}
      {children}
    </button>
  );
};
