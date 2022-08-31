import "./GameScreen.css";
import { useState, useEffect, useMemo } from "react";
import GameGrid from "../GameGrid/GameGrid";
import VeggiePlaceTable from "../VeggiePlaceTable/VeggiePlaceTable";
import robotGif from "../../assets/gifs/starbase-angry-robot-sound.gif";
import loading from "../../assets/gifs/loading-loading-forever.gif";

const GameScreen = ({
    height,
    width,
    isPlayer1Turn,
    arePlayerVeggiesPlaced,
    playerVeggies,
    playerGrid,
    onUpdateVeggies,
    onPlayerGridChange,
    onReset,
    onConfirmPlacement,
    onFire,
    showBoardComparison,
    secondPlayerGrid,
    onPlayAgain,
    isVersusCPU,
    onHighScoresClick,
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
        if (isVersusCPU) {
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

    console.log(createButtonClassName());
    return (
        <div className="game-screen">
            {!isPlayer1Turn && isVersusCPU && (
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
                            {isPlayer1Turn ? "Player 1 🏆" : "Player 2 🏆"}
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
                        height={height}
                        width={width}
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
                                {isPlayer1Turn ? "Player 2" : "Player 1"}
                            </h2>

                            <GameGrid
                                height={height}
                                width={width}
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
                                {isPlayer1Turn ? "Player 1" : "Player 2"}
                                <br />
                                {arePlayerVeggiesPlaced
                                    ? "Take your turn"
                                    : "Place your veggies"}
                            </h2>
                            {arePlayerVeggiesPlaced || (
                                <VeggiePlaceTable
                                    playerVeggies={playerVeggies}
                                    onUpdateVeggies={onUpdateVeggies}
                                />
                            )}
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
