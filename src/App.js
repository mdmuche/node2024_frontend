import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Details from "./Details";
import Create from "./Create";
import Update from "./Update";
import Error from "./Error";
import Navcom from "./Navcom";

function App() {
  return (
    <div className="App">
      <Navcom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/update/:uid" element={<Update />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
