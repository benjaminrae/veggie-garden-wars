import "./GameOver.css";
import win from "../../assets/gifs/baby-yes.gif";
import lose from "../../assets/gifs/bender-futurama.gif";

const GameOver = (props) => {
    return (
        <div className="game-over">
            <div className="game-over__screen">
                <h2 className="game-over__title">
                    {props.isPlayer1Turn
                        ? "Player 1 Wins!"
                        : props.isVersusCPU
                        ? "CPU Wins 😢"
                        : "Player 2 Wins!"}
                </h2>
                <img
                    className="game-over__gif"
                    src={
                        props.isPlayer1Turn
                            ? win
                            : props.isVersusCPU
                            ? lose
                            : win
                    }
                    alt=""
                />
                <div className="game-over__button-container">
                    <button className="game-over__button" onClick={() => {}}>
                        See Boards
                    </button>
                    <button
                        className="game-over__button"
                        onClick={props.onHighScoresClick}
                    >
                        See High Scores
                    </button>
                    <button className="game-over__button" onClick={() => {}}>
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
