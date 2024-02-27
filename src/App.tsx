import "./App.css";
import { BetSlipProvider } from "./contexts/BetSlipContext";
import MainPage from "./pages/MainPage";

function App() {

  return (
    <BetSlipProvider>
      <MainPage />
    </BetSlipProvider>
  );
}

export default App;
