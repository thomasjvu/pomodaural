import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LayoutProps } from "../types/layout";
import ToggleMenu from "../components/ToggleMenu";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex pb-5">
      <ToggleMenu isOpen={isMenuOpen} handleToggle={handleMenuToggle} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isMenuOpen ? "ml-[0%]" : ""
        }`}
      >
        <Header />
        <div className={`min-h-screen flex items-center justify-center ${isMenuOpen ? "pl-[33%]" : ""}`}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
