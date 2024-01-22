import "../styles/ButtonGroup.css";

export interface Button {
  label: string;
  onClick: () => void;
  cName: string;
}

interface ButtonGroupProps {
  buttons: Button[];
  type: "filter" | "genre";
}

function ButtonGroup({ buttons, type }: ButtonGroupProps) {
  return (
    <div className="toolbar">
      <div className={"btn-group-" + type}>
        {buttons.slice(0, 4).map((button, index) => (
          <button className={button.cName} key={index} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
