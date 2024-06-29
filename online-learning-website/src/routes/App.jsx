import Navbar from "../Component/Navbar";
import ScrollBar from "../Component/ScrollBar";
import Footer from "../Component/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import AutoLogin from "../Component/authComponent/AutoLogin";
function App() {
  return (
    <>
      <ScrollToTop />
      <AutoLogin />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollBar />
    </>
  );
}

export default App;
