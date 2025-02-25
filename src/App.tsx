import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { HelmetProvider } from "react-helmet-async";

export default function ChiaTienDiChoi() {
  return (
    <HelmetProvider>
      <Header />
      <div className="h-16 md:h-17" />
      <Home />
    </HelmetProvider>
  );
}
