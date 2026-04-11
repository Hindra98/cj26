type Theme = "light" | "dark" | "system" | "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?:string;
  backgroundColor?:string;
  children: React.ReactNode;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}
interface SelectProps {
  items: SelectItemsProps[];
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  title?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

interface SelectItemsProps {
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  value?: string | number | readonly string[];
  title?: string;
  selected?: boolean;
}

interface SwitchProps {
  name?: string;
  id?: string;
  disabled?: boolean;
  checked: boolean;
  className?: string;
  label?: string;
  value?: string;
  title?: string;
  inverse?: boolean;
  onChange?(checked: boolean): void;
}
