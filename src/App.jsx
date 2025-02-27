import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherPage from "./Components/WeatherPage";
import CountriesPage from "./Components/countriesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/weather/:country/:capital" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;

