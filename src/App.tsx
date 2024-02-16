import "./App.css";
import HomeBody from "./components/Home/Body/HomeBody";
import SharedLayoutHomepage from "./components/Shared/Layout/SharedLayoutHomepage";

function App() {
  return (
    <SharedLayoutHomepage>
      <HomeBody />
    </SharedLayoutHomepage>
  );
}

export default App;
