import "./GameScreen.css";
import GameGrid from "../GameGrid/GameGrid";
import VeggiePlaceTable from "../VeggiePlaceTable/VeggiePlaceTable";
import { useState } from "react";

const GameScreen = (props) => {
    const [buttonDirections, setButtonDirections] = useState([
        { direction: "up", directionSymbol: "⬆", isSelected: true },
        { direction: "down", directionSymbol: "⬇", isSelected: false },
        { direction: "left", directionSymbol: "⬅", isSelected: false },
        { direction: "right", directionSymbol: "➡", isSelected: false },
    ]);
    const [isAttacking, setIsAttacking] = useState(true);

    const handleResetClick = (event) => {
        props.onReset();
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
        const targetId = props.playerGrid.find((cell) => cell.isSelected).id;
        props.onFire(targetId);
    };

    const handleConfirmClick = () => {
        if (props.playerVeggies.every((veggie) => veggie.isPlaced)) {
            props.onConfirmPlacement();
        }
    };

    const handlePlayAgainClick = () => {
        setIsAttacking(true);
        props.onPlayAgain();
    };

    return (
        <div className="game-screen">
            {props.showBoardComparison && (
                <div className="game-screen__button-container">
                    <button className="game-screen__button" onClick={() => {}}>
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
                    {props.showBoardComparison && (
                        <h2 className="game-screen__title">
                            {props.isPlayer1Turn
                                ? "Player 1 🏆"
                                : "Player 2 🏆"}
                        </h2>
                    )}
                    {!props.arePlayerVeggiesPlaced && (
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
                    {props.arePlayerVeggiesPlaced &&
                        !props.showBoardComparison && (
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
                        height={props.height}
                        width={props.width}
                        arePlayerVeggiesPlaced={props.arePlayerVeggiesPlaced}
                        currentVeggie={props.playerVeggies.find(
                            (veggie) => veggie.isSelected
                        )}
                        number={props.playerVeggies.filter((veggie) =>
                            veggie.isSelected ? veggie.number : ""
                        )}
                        playerGrid={props.playerGrid}
                        onPlayerGridChange={props.onPlayerGridChange}
                        onUpdateVeggies={props.onUpdateVeggies}
                        playerVeggies={props.playerVeggies}
                        buttonDirections={buttonDirections}
                        isAttacking={isAttacking}
                    />
                </div>
                <div className="game-screen__right-container">
                    {props.showBoardComparison && (
                        <>
                            <h2 className="game-screen__title">
                                {props.isPlayer1Turn ? "Player 2" : "Player 1"}
                            </h2>

                            <GameGrid
                                height={props.height}
                                width={props.width}
                                arePlayerVeggiesPlaced={
                                    props.arePlayerVeggiesPlaced
                                }
                                currentVeggie={props.playerVeggies.find(
                                    (veggie) => veggie.isSelected
                                )}
                                number={props.playerVeggies.filter((veggie) =>
                                    veggie.isSelected ? veggie.number : ""
                                )}
                                playerGrid={props.secondPlayerGrid}
                                onPlayerGridChange={props.onPlayerGridChange}
                                onUpdateVeggies={props.onUpdateVeggies}
                                playerVeggies={props.playerVeggies}
                                buttonDirections={buttonDirections}
                                isAttacking={isAttacking}
                            />
                        </>
                    )}
                    {!props.showBoardComparison && (
                        <>
                            <h2 className="game-screen__title">
                                {props.player1Turn ? "Player 1" : "Player 2"}
                                <br />
                                {props.arePlayerVeggiesPlaced
                                    ? "Take your turn"
                                    : "Place your veggies"}
                            </h2>
                            {props.arePlayerVeggiesPlaced || (
                                <VeggiePlaceTable
                                    playerVeggies={props.playerVeggies}
                                    onUpdateVeggies={props.onUpdateVeggies}
                                />
                            )}
                            <div className="game-screen__button-container">
                                {!props.arePlayerVeggiesPlaced && (
                                    <button
                                        className="game-screen__button"
                                        onClick={handleResetClick}
                                    >
                                        Reset
                                    </button>
                                )}
                                <button
                                    className={
                                        props.playerVeggies.every(
                                            (veggie) => veggie.isPlaced
                                        )
                                            ? "game-screen__button"
                                            : "game-screen__button--blocked"
                                    }
                                    onClick={
                                        props.arePlayerVeggiesPlaced
                                            ? handleFireClick
                                            : handleConfirmClick
                                    }
                                >
                                    {props.arePlayerVeggiesPlaced
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
