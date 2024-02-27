import "./App.css";
import { BetSlipProvider } from "./contexts/BetSlipContextProvider";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BetSlipProvider>
      <MainPage />
    </BetSlipProvider>
  );
}

export default App;
