import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">Veggie Garden Wars</h1>
            <nav className="header__nav">
                <ul className="header__nav__ul">
                    <li className="header__nav__li">How it works</li>
                    <li className="header__nav__li">High scores</li>
                    <li className="header__nav__li">🔊</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
