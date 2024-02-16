import "./index.css";
import FetchData from "./components/fetchData.jsx";
import Nav from "./components/Nav.jsx";

// TODO: Global Search to get the value from search (Nav) and give it to the fetchData Comp 
// TODO: If the news is a "Advertise, o2 etc" don't show 

// TODO: Change the Design to a modern looking

// FIXME: Broken Pictures from api


const Home = () => {
  return (
    <div>
      <Nav />
      <FetchData />
    </div>
  );
};

export default Home;
