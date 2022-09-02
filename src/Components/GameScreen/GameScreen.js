import "./GameScreen.css";
import { useState, useEffect, useMemo } from "react";
import GameGrid from "../GameGrid/GameGrid";
import VeggieTable from "../VeggieTable/VeggieTable";
import robotGif from "../../assets/gifs/starbase-angry-robot-sound.gif";
import loading from "../../assets/gifs/loading-loading-forever.gif";

const GameScreen = ({
    gridDimensions,
    gameStatus,
    onUpdateVeggies,
    onPlayerGridChange,
    onReset,
    onConfirmPlacement,
    onFire,
    showBoardComparison,
    onPlayAgain,
    onHighScoresClick,
    player2Data,
    player1Data,
}) => {
    const [buttonDirections, setButtonDirections] = useState([
        { direction: "up", directionSymbol: "⬆", isSelected: true },
        { direction: "down", directionSymbol: "⬇", isSelected: false },
        { direction: "left", directionSymbol: "⬅", isSelected: false },
        { direction: "right", directionSymbol: "➡", isSelected: false },
    ]);
    const [isAttacking, setIsAttacking] = useState(true);
    const [isComputerContinue, setIsComputerContinue] = useState(false);

    useEffect(() => {
        if (!isComputerContinue) {
            return;
        }
        const timeout = setTimeout(() => {
            onConfirmPlacement();
        }, 3000);

        return () => {
            setIsComputerContinue(false);
            clearTimeout(timeout);
        };
    }, [isComputerContinue, onConfirmPlacement, setIsComputerContinue]);

    const { arePlayerVeggiesPlaced, playerGrid, playerVeggies, playerName } =
        gameStatus.isPlayer1Turn ? player1Data : player2Data;

    const secondPlayerGrid = gameStatus.isPlayer1Turn
        ? player2Data.playerGrid
        : player1Data.playerGrid;

    const isOneCellSelected = useMemo(
        () => playerGrid.some((cell) => cell.isSelected),
        [playerGrid]
    );

    const handleResetClick = (event) => {
        onReset();
    };

    const handleDirectionClick = (event) => {
        let newButtonDirections = buttonDirections.map((direction) => {
            direction.isSelected = false;
            return direction;
        });
        newButtonDirections.forEach((direction) => {
            if (direction.direction === event.target.value) {
                direction.isSelected = true;
            }
        });
        setButtonDirections(newButtonDirections);
    };

    const handleAttackingClick = () => {
        setIsAttacking(true);
    };

    const handleMyVeggiesClick = () => {
        setIsAttacking(false);
    };

    const handleFireClick = () => {
        if (!isOneCellSelected) {
            return;
        }
        const targetId = playerGrid.find((cell) => cell.isSelected).id;
        onFire(targetId);
    };

    const handleConfirmClick = () => {
        if (gameStatus.isVersusCPU) {
            onConfirmPlacement();
            setIsComputerContinue(true);
        }
        if (playerVeggies.every((veggie) => veggie.isPlaced)) {
            onConfirmPlacement();
        }
    };

    const handlePlayAgainClick = () => {
        setIsAttacking(true);
        onPlayAgain();
    };

    const createButtonClassName = () => {
        if (!arePlayerVeggiesPlaced) {
            return playerVeggies.every((veggie) => veggie.isPlaced)
                ? "game-screen__button"
                : "game-screen__button--blocked";
        }
        return isOneCellSelected
            ? "game-screen__button"
            : "game-screen__button--blocked";
    };

    return (
        <div className="game-screen">
            {!gameStatus.isPlayer1Turn &&
                gameStatus.isVersusCPU &&
                !gameStatus.isWon && (
                    <div className="game-screen__computer-turn">
                        <div className="computer-turn__container">
                            <div className="computer-turn__icon">
                                🤖 The robot is taking its turn
                                <img
                                    className="computer-turn__loading"
                                    src={loading}
                                    alt=""
                                />
                            </div>
                            <div className="computer-turn__title">
                                "Me cago en tus huertos!"
                            </div>
                            <img
                                className="computer-turn__gif"
                                src={robotGif}
                                alt=""
                            />
                        </div>
                    </div>
                )}
            {showBoardComparison && (
                <div className="game-screen__button-container">
                    <button
                        className="game-screen__button"
                        onClick={onHighScoresClick}
                    >
                        See high scores
                    </button>
                    <button
                        className="game-screen__button"
                        onClick={handlePlayAgainClick}
                    >
                        Play again
                    </button>
                </div>
            )}

            <div className="game-screen__container">
                <div className="game-screen__left-container">
                    {showBoardComparison && (
                        <h2 className="game-screen__title">
                            {`${playerName} 🏆`}
                        </h2>
                    )}
                    {!arePlayerVeggiesPlaced && (
                        <div className="game-screen__button-container">
                            <div>Set direction:</div>
                            {buttonDirections.map((direction, index) => {
                                return (
                                    <button
                                        className={
                                            direction.isSelected
                                                ? "game-screen__button--small-active"
                                                : "game-screen__button--small"
                                        }
                                        value={direction.direction}
                                        key={index}
                                        onClick={handleDirectionClick}
                                    >
                                        {direction.directionSymbol}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    {arePlayerVeggiesPlaced && !showBoardComparison && (
                        <div className="game-screen__button-container">
                            <button
                                className={
                                    isAttacking
                                        ? "game-screen__button--inactive"
                                        : "game-screen__button--active"
                                }
                                onClick={handleMyVeggiesClick}
                            >
                                My veggies
                            </button>
                            <button
                                className={
                                    isAttacking
                                        ? "game-screen__button--active"
                                        : "game-screen__button--inactive"
                                }
                                onClick={handleAttackingClick}
                            >
                                Attacking
                            </button>
                        </div>
                    )}
                    <GameGrid
                        gridDimensions={gridDimensions}
                        arePlayerVeggiesPlaced={arePlayerVeggiesPlaced}
                        currentVeggie={playerVeggies.find(
                            (veggie) => veggie.isSelected
                        )}
                        number={playerVeggies.filter((veggie) =>
                            veggie.isSelected ? veggie.number : ""
                        )}
                        playerGrid={playerGrid}
                        onPlayerGridChange={onPlayerGridChange}
                        onUpdateVeggies={onUpdateVeggies}
                        playerVeggies={playerVeggies}
                        buttonDirections={buttonDirections}
                        isAttacking={isAttacking}
                        showBoardComparison={showBoardComparison}
                    />
                </div>
                <div className="game-screen__right-container">
                    {showBoardComparison && (
                        <>
                            <h2 className="game-screen__title">
                                {gameStatus.isPlayer1Turn
                                    ? player2Data.playerName
                                    : player1Data.playerName}
                            </h2>

                            <GameGrid
                                gridDimensions={gridDimensions}
                                arePlayerVeggiesPlaced={arePlayerVeggiesPlaced}
                                currentVeggie={playerVeggies.find(
                                    (veggie) => veggie.isSelected
                                )}
                                number={playerVeggies.filter((veggie) =>
                                    veggie.isSelected ? veggie.number : ""
                                )}
                                playerGrid={secondPlayerGrid}
                                onPlayerGridChange={onPlayerGridChange}
                                onUpdateVeggies={onUpdateVeggies}
                                playerVeggies={playerVeggies}
                                buttonDirections={buttonDirections}
                                isAttacking={isAttacking}
                                showBoardComparison={showBoardComparison}
                            />
                        </>
                    )}
                    {!showBoardComparison && (
                        <>
                            <h2 className="game-screen__title">
                                {playerName}
                                <br />
                                {arePlayerVeggiesPlaced
                                    ? "Take your turn"
                                    : "Place your veggies"}
                            </h2>
                            <VeggieTable
                                playerVeggies={playerVeggies}
                                player2Data={player2Data}
                                onUpdateVeggies={onUpdateVeggies}
                                arePlayerVeggiesPlaced={arePlayerVeggiesPlaced}
                                player1Data={player1Data}
                                gameStatus={gameStatus}
                            />
                            <div className="game-screen__button-container">
                                {!arePlayerVeggiesPlaced && (
                                    <button
                                        className="game-screen__button"
                                        onClick={handleResetClick}
                                    >
                                        Reset
                                    </button>
                                )}
                                <button
                                    // className={
                                    //     playerVeggies.every(
                                    //         (veggie) => veggie.isPlaced
                                    //     )
                                    //         ? "game-screen__button"
                                    //         : isOneCellSelected
                                    //         ? "game-screen__button"
                                    //         : "game-screen__button--blocked"
                                    // }
                                    className={createButtonClassName()}
                                    onClick={
                                        arePlayerVeggiesPlaced
                                            ? handleFireClick
                                            : handleConfirmClick
                                    }
                                >
                                    {arePlayerVeggiesPlaced
                                        ? "Fire!"
                                        : "Confirm"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
