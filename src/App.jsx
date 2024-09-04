import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="bg-cyan-950">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto/:id" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
