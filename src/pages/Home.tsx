import PomodoroTimer from "../components/PomodoroTimer"
import Layout from "../layouts/Layout"

const Home: React.FC = () => {
    
    return (
        <Layout>
            <div id="page-home" className="flex flex-col justify-center items-center gap-20 w-1/2">
                <div className="flex justify-between w-1/2">
                    <h1 className="font-display text-lg text-pink-300">Pomodaural</h1>
                    <button className="btn">Help</button>
                </div>
                <PomodoroTimer />
            </div>
        </Layout>
    )
}

export default Home
