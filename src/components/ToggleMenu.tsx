import Logo from "./Logo";
import ThemeChanger from "./ThemeChanger";

interface ToggleMenuProps {
  isOpen: boolean;
  handleToggle: () => void;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ isOpen, handleToggle }) => {
  return (
    <div id="toggle-menu">
      <div
        className={`sidebar ${
          isOpen ? "fixed h-full top-0 left-0 w-1/3" : "hidden"
        } bg-neutral flex justify-center py-10`}
      >
        {isOpen && (
          <nav className="flex flex-col items-center gap-10">
            <Logo />
            <ul className="flex flex-col justify-center items-center gap-5 font-mono">
              <li className="btn btn-secondary w-full">Focus</li>
              <li className="btn btn-secondary w-full">Relaxation</li>
              <li className="btn btn-secondary w-full">Creativity</li>
            </ul>
            <ThemeChanger />
          </nav>
        )}
      </div>
      <button
        className={`z-[999] toggle-button absolute top-0 left-0 p-5 ${
          isOpen ? "text-white" : "text-pink-200"
        }`}
        onClick={handleToggle}
      >
        {isOpen ? "⟵ Menu" : "⟶ Menu"}
      </button>
    </div>
  );
};

export default ToggleMenu;
