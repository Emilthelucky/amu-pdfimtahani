import './Navigation.css'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <>
            <div className="navigation-container">
                <Link to="/" className="image-container">
                    Imtahan ver
                </Link>
                <ul className="navigations">
                    <li>
                        <Link to="/">Ev</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
