
import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Header from './components/Header';
import "./styles/global.css";
function App() {

  return (
    <>
<Header/>
  <Routes>
    <Route element={<Layout/>}>
    <Route path="/" element={<Main/>}/>
    </Route>
  </Routes>
  </>
  )
}

export default App;
