import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Board from "./pages/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Board />} />
          <Route path="/home" element={<Home />} />
        </Route >
      </Routes>
    </BrowserRouter>
  );
}

export default App;
