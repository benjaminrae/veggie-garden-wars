import "./GameOver.css";
import win from "../../assets/gifs/baby-yes.gif";
import lose from "../../assets/gifs/bender-futurama.gif";

const GameOver = ({
    onHighScoresClick,
    onPlayAgain,
    onShowBoards,
    playerName,
    gameStatus,
}) => {
    return (
        <div className="game-over">
            <div className="game-over__screen">
                <h2 className="game-over__title">{`${playerName} Wins!`}</h2>
                <img
                    className="game-over__gif"
                    src={
                        gameStatus.isPlayer1Turn
                            ? win
                            : gameStatus.isVersusCPU
                            ? lose
                            : win
                    }
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
