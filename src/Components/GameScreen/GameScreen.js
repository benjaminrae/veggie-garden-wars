import "./GameScreen.css";
import GameGrid from "../GameGrid/GameGrid";
import { useState } from "react";

const CropPlaceTable = (props) => {
    // const vegetableNameElements =
    //     document.getElementsByClassName("vegetable-name");

    const handleCropSelection = (event) => {
        const playerCrops = [...props.playerCrops];
        playerCrops.forEach((crop) =>
            crop.cropSymbol === event.target.innerHTML
                ? (crop.isSelected = true)
                : (crop.isSelected = false)
        );
        console.log(playerCrops);
        props.onUpdateCrops([...playerCrops]);
        // for (let vegetable of vegetableNameElements) {
        //     vegetable.classList.remove("crop-selected");
        // }
        // event.target.classList.add("crop-selected");
    };

    const tableHeader = (
        <>
            <tr>
                <th>Vegetable</th>
                <th>Placed?</th>
            </tr>
        </>
    );

    const tableContent = props.playerCrops.map((crop, index) => {
        return (
            <tr key={index}>
                <td
                    className={
                        crop.isSelected ? "crop-selected" : "vegetable-name"
                    }
                    onClick={handleCropSelection}
                >
                    {`${crop.cropSymbol} (${crop.spaces})`}
                </td>
                <td>{crop.isPlaced ? "✅" : "❌"}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>{tableHeader}</thead>
            <tbody>{tableContent}</tbody>
        </table>
    );
};

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
                    arePlayerCropsPlaced={props.arePlayerCropsPlaced}
                    currentCrop={props.playerCrops.find(
                        (crop) => crop.isSelected
                    )}
                    number={props.playerCrops.filter((crop) =>
                        crop.isSelected ? crop.number : ""
                    )}
                    playerGrid={props.playerGrid}
                    onPlayerGridChange={props.onPlayerGridChange}
                    onUpdateCrops={props.onUpdateCrops}
                    playerCrops={props.playerCrops}
                    buttonDirections={buttonDirections}
                />
            </div>

            <div className="game-screen__right-container">
                <h2 className="game-screen__title">
                    {props.arePlayerCropsPlayed
                        ? "Take your turn"
                        : "Place your crops"}
                </h2>

                {props.arePlayerCropsPlaced || (
                    <CropPlaceTable
                        playerCrops={props.playerCrops}
                        onUpdateCrops={props.onUpdateCrops}
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
                        {props.arePlayerCropsPlaced ? "Fire!" : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
