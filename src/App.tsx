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
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/lives"
          element={
            <ProtectedRoute>
              <AllLivePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lives/:id"
          element={
            <ProtectedRoute>
              <SingleLivePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <AllMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <SingleMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/series"
          element={
            <ProtectedRoute>
              <AllSeriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/series/:id"
          element={
            <ProtectedRoute>
              <SingleSeriesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
