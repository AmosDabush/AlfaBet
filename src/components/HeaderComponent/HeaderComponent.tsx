import "./HeaderComponent.css";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
interface HeaderComponentProps {
  toggleBetSlip: () => void;
  isSlipOpen: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  toggleBetSlip,
  isSlipOpen,
}: HeaderComponentProps) => {
  return (
    <div
      style={isSlipOpen ? {} : { display: "flex", justifyContent: "flex-end" }}
      className="HeaderComponentContainer"
    >
      <div onClick={toggleBetSlip}>
        <TextSnippetIcon />
      </div>
    </div>
  );
};

export default HeaderComponent;
