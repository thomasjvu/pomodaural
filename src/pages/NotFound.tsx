import { Link } from "react-router-dom"

const NotFound = () => {

    return (
        <div>
            <h1>This page cannot be found</h1>
            <Link to="/" className="btn">Go back to studying</Link>
        </div>
    )
}

export default NotFound
