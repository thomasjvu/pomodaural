import ThemeChanger from "./ThemeChanger"

const Footer: React.FC = (): JSX.Element => {
    
    return (
        <footer className="p-5 fixed bottom-0 right-0">
            <ThemeChanger />
        </footer>
    )
}

export default Footer
