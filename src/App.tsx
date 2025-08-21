import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AllLivePage from "./pages/lives/AllLivePage";
import SingleLivePage from "./pages/lives/SingleLivePage";
import AllMoviePage from "./pages/movies/AllMoviePage";
import AllSeriesPage from "./pages/series/AllSeriesPage";
import SingleSeriesPage from "./pages/series/SingleSeriesPage";
import HomePage from "./pages/homepage/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SingleMoviePage from "./pages/movies/SingleMoviePage";
import NavigationHandler from "./components/shared/NavigationHandler";

function App() {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lives" element={<AllLivePage />} />
        <Route path="/lives/:id" element={<SingleLivePage />} />
        <Route path="/movies" element={<AllMoviePage />} />
        <Route path="/movies/:id" element={<SingleMoviePage />} />
        <Route path="/series" element={<AllSeriesPage />} />
        <Route path="/series/:id" element={<SingleSeriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
