import "./HideScreen.css";

const HideScreen = ({ isPlayer1Turn, onTakeTurn }) => {
    const handleTakeTurnClick = () => {
        onTakeTurn();
    };

    return (
        <div className="hide-screen">
            <div className="hide-screen__screen">
                <div className="hide-screen__icon">🙈</div>
                <h2 className="hide-screen__title">
                    {isPlayer1Turn ? "Player 1" : "Player 2"} it's your turn
                </h2>
                <div>
                    Hide the screen from{" "}
                    {isPlayer1Turn ? "player 2" : "player 1"}!
                </div>
                <button
                    className="hide-screen__button"
                    onClick={handleTakeTurnClick}
                >
                    Take turn
                </button>
            </div>
        </div>
    );
};

export default HideScreen;
