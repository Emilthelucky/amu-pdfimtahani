import './Navigation.css'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <>
            <div className="navigation-container">
                <Link to="/" className="image-container">
                    Imtahan ver
                </Link>
                <p className="qeyd">
                    Qeyd: Saytda olsun ux tərəfdə olsun funksionallıq tərəfdə
                    çox əksiklik var sayt ümümi 10 saata qurulub. Bunu nəzərə
                    alın. digər semestr bütün funksialar sizə təmin olunmuş
                    şəkildə qarşınızda olacaq.
                </p>
                <ul className="navigations">
                    <li>
                        <Link to="/">Ev</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
