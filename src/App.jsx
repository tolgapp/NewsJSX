import "./index.css";
import FetchData from "./components/fetchData.jsx";
import Nav from "./components/Nav.jsx";
import SearchProvider from "./context/Search.jsx";

function App() {

  return (
    <>
      <SearchProvider>
        <Nav />
        <FetchData />
      </SearchProvider>
    </>
  );
}

export default App;
