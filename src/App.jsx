import "./index.css";
import FetchData from "./components/fetchData.jsx";
import { useState } from "react";
import Nav from "./components/Nav.jsx";

function App() {
  
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Nav setSearch={setSearch} handleSearch={handleSearch} />
      <FetchData search={search} />
    </>
  );
}

export default App;
