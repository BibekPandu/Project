import { Routes, Route } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Home from "./Components/Home/Home"; // Or whatever your Home component is

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
