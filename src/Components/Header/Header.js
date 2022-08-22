import "./Header.css";

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="header__title">Veggie Garden Wars</h1>
            <nav className="header__nav">
                <ul className="nav__ul">
                    <li className="nav__li" onClick={props.onHowItWorksClick}>
                        How it works
                    </li>
                    <li className="nav__li" onClick={props.onHighScoresClick}>
                        High scores
                    </li>
                    <li className="nav__li" onClick={props.onVolumeClick}>
                        {props.isMuted ? "🔈" : "🔊"}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
