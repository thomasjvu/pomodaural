import { useEffect } from "react"
import { themeChange } from "theme-change"
import { themeList } from '../types/theme'
import { capitalizeFirstLetter } from "../utils/strings"

const ThemeChanger: React.FC = (): JSX.Element => {

    useEffect(() => {
        themeChange(false)
    }, [])
    
    return (
        <>
            <select data-choose-theme className="bg-white px-3 py-2 border border-neutral-300 rounded font-mono text-black">
                {themeList.map((theme) => (
                    <option key={theme} value={theme}>{capitalizeFirstLetter(theme)}</option> 
                ))}
            </select>
        </>
    )
}

export default ThemeChanger
