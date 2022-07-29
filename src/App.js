import { Routes, Route } from "react-router-dom";
import { Footer } from "antd/lib/layout/layout";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CryptoDetails from "./components/CryptoDetails";

const App = () => (
  <>
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/crypto/:coinId"  element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <div className="footer">
          <Footer>&copy; Shahid Afridi</Footer>
        </div>
      </div>
    </div>
  </>
);

export default App;
