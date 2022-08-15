import "./Welcome.css";
import { useState, useEffect } from "react";

const Welcome = (props) => {
    const [displayMode, setDisplayMode] = useState(0); // first: 0, single player: 1, two player: 2
    const [showWelcome, setShowWelcome] = useState(true);
    const [showSinglePlayer, setShowSinglePlayer] = useState(false);
    const [showTwoPlayer, setShowTwoPlayer] = useState(false);

    const handlePlayerButtonClick = (event) => {
        if (+event.target.value === 1) {
            setShowSinglePlayer(true);
            setShowWelcome(false);
            setShowTwoPlayer(false);
        } else if (+event.target.value === 2) {
            setShowSinglePlayer(false);
            setShowWelcome(false);
            setShowTwoPlayer(true);
        }
        props.onPlayerSelect(+event.target.value);
    };

    const handleStartGameButtonClick = (event) => {
        props.onStartGame();
    };
    return (
        <div className="welcome ">
            {showWelcome && (
                <div className="welcome__first-screen welcome__screen">
                    <h2 className="welcome__title">
                        Welcome to the neighborhood!
                    </h2>
                    <h3 className="welcome__question">
                        How many of you are joining us today?
                    </h3>
                    <div className="welcome__button-container">
                        <button
                            onClick={handlePlayerButtonClick}
                            className="welcome__button"
                            value="1"
                        >
                            One
                        </button>
                        <button
                            onClick={handlePlayerButtonClick}
                            className="welcome__button"
                            value="2"
                        >
                            Two
                        </button>
                    </div>
                </div>
            )}
            {showSinglePlayer && (
                <div className="welcome__single-player-screen welcome__screen">
                    <div className="welcome__icon">🤖</div>
                    <div>
                        There's a new neighbour in town and its Veggie Garden is
                        better than the rest. It's a robot, so it can work day
                        and night tending to its garden.
                    </div>
                    <div>
                        There's only one solution:{" "}
                        <strong>this means war!</strong>
                    </div>
                    <div>
                        Use your catapult to fire on VegBot's garden and try to
                        destroy all its crops, before it destroys yours!
                    </div>
                    <div className="welcome__button-container">
                        <button
                            className="welcome__button"
                            onClick={handlePlayerButtonClick}
                            value="2"
                        >
                            Two Player
                        </button>
                        <button
                            className="welcome__button"
                            onClick={handleStartGameButtonClick}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}
            {showTwoPlayer && (
                <div className="welcome__two-player-screen welcome__screen ">
                    <div className="welcome__icon">🏆</div>
                    <div>
                        The town fair is coming up. You and your neighbour are
                        both rumoured to be contenders for the “Best Veggie
                        Garden” trophy. Competition is tough, but you both want
                        to win.
                    </div>
                    <div>
                        There's only one way to win that ribbon, you've got to
                        destroy your neighbour's garden. But be careful, if you
                        still want that trophy, you'll not only have to destroy
                        your neighbour's garden, but{" "}
                        <strong>50% of your garden must remain intact.</strong>
                    </div>
                    <div>
                        Use your catapults to fire on your neighbour's garden
                        and try to destroy all their crops.
                    </div>
                    <div className="welcome__button-container">
                        <button
                            className="welcome__button"
                            onClick={handlePlayerButtonClick}
                            value="1"
                        >
                            Single Player
                        </button>
                        <button
                            className="welcome__button"
                            onClick={handleStartGameButtonClick}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;
