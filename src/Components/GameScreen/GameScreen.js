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

    return (
        <div className="game-screen">
            <div className="game-screen__left-container">
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
                />
            </div>

            <div className="game-screen__right-container">
                <h2 className="game-screen__title">
                    {props.arePlayerVeggiesPlayed
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
                    <button
                        className="game-screen__button"
                        onClick={handleResetClick}
                    >
                        Reset
                    </button>
                    <button className="game-screen__button">
                        {props.arePlayerVeggiesPlaced ? "Fire!" : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
