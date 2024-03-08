import { movieFilter } from "../../services/MovieService";

export interface Button {
  label: movieFilter | string;
  onClick: () => void;
  cName: string;
  cNameSelected?:string,
  icon?: JSX.Element;
  path?:string;
}

export function createButton(label: string, onClick: () => void, cName: string,path?:string, icon?: JSX.Element): Button {
  return {
    label,
    onClick,
    cName,
    icon,
    path,
  };
}
