import ThemeChanger from "./ThemeChanger"

const Footer: React.FC = (): JSX.Element => {
    
    return (
        <footer className="flex justify-end p-5">
            <ThemeChanger />
        </footer>
    )
}

export default Footer
