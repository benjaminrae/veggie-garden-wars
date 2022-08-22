import "./Header.css";
import { useState, useRef, useEffect } from "react";

const Header = (props) => {
    const [showNav, setShowNav] = useState(true);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [width, setWidth] = useState(0);

    const header = useRef(null);

    useEffect(() => {
        updateWindowWidth();
        window.addEventListener("resize", updateWindowWidth);
    }, []);

    useEffect(() => {
        if (width < 630) {
            setShowNav(false);
            setHamburgerOpen(false);
        } else {
            setShowNav(true);
            setHamburgerOpen(false);
        }
    }, [width]);

    const updateWindowWidth = () => {
        setWidth(header.current.clientWidth);
    };

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <header className="header" ref={header}>
            <h1 className={hamburgerOpen ? "" : "header__title"}>
                {hamburgerOpen ? " " : "Veggie Garden Wars"}
            </h1>
            {(showNav || hamburgerOpen) && (
                <nav className="header__nav">
                    <ul className="nav__ul">
                        <li
                            className="nav__li"
                            onClick={props.onHowItWorksClick}
                        >
                            How it works
                        </li>
                        <li
                            className="nav__li"
                            onClick={props.onHighScoresClick}
                        >
                            High scores
                        </li>
                        <li className="nav__li" onClick={props.onVolumeClick}>
                            {props.isMuted ? "🔈" : "🔊"}
                        </li>
                    </ul>
                </nav>
            )}
            {!showNav && (
                <div className="header__hamburger" onClick={toggleHamburger}>
                    <div
                        className={
                            hamburgerOpen
                                ? "hamburger__icon--open"
                                : "hamburger__icon"
                        }
                    >
                        &#9776;
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
