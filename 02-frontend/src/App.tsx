import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
