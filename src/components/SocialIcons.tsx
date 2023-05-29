import { Link } from "react-router-dom";
import { YoutubeFill, TwitterFill, SoundcloudFill } from "./Icons";

const SocialIcons: React.FC = (): JSX.Element => {

    return (
        <div className="flex w-full gap-4 justify-end items-center font-mono uppercase py-20 text-white">
            <span>Visit us on: </span>
            <Link to="https://soundcloud.com/pomodaural" target="_blank">
                <SoundcloudFill className="w-6 h-6"/>
            </Link>
            <Link to="https://twitter.com/pomodaural" target="_blank">
                <TwitterFill className="w-6 h-6"/>
            </Link>
            <Link to="https://youtube.com/@pomodaural" target="_blank">
                <YoutubeFill className="w-6 h-6"/>
            </Link>
        </div>
    )
}

export default SocialIcons
