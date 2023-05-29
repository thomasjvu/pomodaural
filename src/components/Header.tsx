// import Logo from "./Logo"
import { useState } from "react";
import ToggleMenu from "./ToggleMenu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
        <header>
          <ToggleMenu isOpen={isMenuOpen} handleToggle={handleMenuToggle} />
        </header>
    )
}

export default Header

