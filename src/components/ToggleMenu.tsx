import Logo from "./Logo";
import About from "./About";
import SocialIcons from "./SocialIcons";

interface ToggleMenuProps {
  isOpen: boolean;
  handleToggle: () => void;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ isOpen, handleToggle }) => {
  return (
    <div id="toggle-menu" className="relative z-50">
      <div
        className={`sidebar ${
          isOpen ? "fixed h-full top-0 left-0 w-full xl:w-1/3 z-100" : "hidden"
        } bg-neutral flex justify-center py-10`}
      >
        {isOpen && (
          <div className="flex flex-col items-center gap-10 px-16 w-full">
            <Logo />
            <About />
            <SocialIcons />
          </div>
        )}
      </div>
      <button
        className={`z-[999] toggle-button fixed top-0 left-0 p-5 ${
          isOpen ? "text-white" : "text-base"
        }`}
        onClick={handleToggle}
      >
        {isOpen ? "⟵ About" : "⟶ About"}
      </button>
    </div>
  );
};

export default ToggleMenu;
