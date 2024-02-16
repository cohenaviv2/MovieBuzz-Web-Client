export interface Button {
  label: string;
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
