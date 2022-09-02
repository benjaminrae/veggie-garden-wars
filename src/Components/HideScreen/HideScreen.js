import "./HideScreen.css";

const HideScreen = ({
    isPlayer1Turn,
    onTakeTurn,
    player1Name,
    player2Name,
}) => {
    const handleTakeTurnClick = () => {
        onTakeTurn();
    };

    return (
        <div className="hide-screen">
            <div className="hide-screen__screen">
                <div className="hide-screen__icon">🙈</div>
                <h2 className="hide-screen__title">
                    {isPlayer1Turn ? player1Name : player2Name}, it's your turn
                </h2>
                <div>
                    Hide the screen from{" "}
                    {isPlayer1Turn ? player2Name : player1Name}!
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
