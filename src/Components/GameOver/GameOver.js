import "./GameOver.css";
import win from "../../assets/gifs/baby-yes.gif";
import lose from "../../assets/gifs/bender-futurama.gif";

const GameOver = ({
    isPlayer1Turn,
    isVersusCPU,
    onHighScoresClick,
    onPlayAgain,
    onShowBoards,
}) => {
    return (
        <div className="game-over">
            <div className="game-over__screen">
                <h2 className="game-over__title">
                    {isPlayer1Turn
                        ? "Player 1 Wins!"
                        : isVersusCPU
                        ? "CPU Wins 😢"
                        : "Player 2 Wins!"}
                </h2>
                <img
                    className="game-over__gif"
                    src={isPlayer1Turn ? win : isVersusCPU ? lose : win}
                    alt=""
                />
                <div className="game-over__button-container">
                    <button
                        className="game-over__button"
                        onClick={onShowBoards}
                    >
                        See Boards
                    </button>
                    <button
                        className="game-over__button"
                        onClick={onHighScoresClick}
                    >
                        See High Scores
                    </button>
                    <button className="game-over__button" onClick={onPlayAgain}>
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
