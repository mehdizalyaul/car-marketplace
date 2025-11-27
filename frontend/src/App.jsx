import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import "./styles/global.css";
import CarDetails from "./pages/CarDetails";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/cars" element={<Main />} />
        </Route>
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </>
  );
}

export default App;
