import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsUpDown,PenBox } from "lucide-react";
import { Switch as ShadSwitch } from "../ui/switch";

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
