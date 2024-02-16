import { movieFilter } from "../../services/MovieService";

export interface Button {
  label: movieFilter | string;
  onClick: () => void;
  cName: string;
  icon?: JSX.Element;
}

export function createButton(label: string, onClick: () => void, cName: string, icon?: JSX.Element): Button {
  return {
    label,
    onClick,
    cName,
    icon,
  };
}
