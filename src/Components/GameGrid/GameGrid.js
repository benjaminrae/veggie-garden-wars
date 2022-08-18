import "./GameGrid.css";
import { useState, useEffect } from "react";

const GameGrid = (props) => {
    const [selectedCellId, setSelectedCellId] = useState("");
    const [cellDifference, setCellDifference] = useState({});

    useEffect(() => {
        setCellDifference({
            [props.buttonDirections[0].direction]: props.height * -1,
            [props.buttonDirections[1].direction]: props.height,
            [props.buttonDirections[2].direction]: -1,
            [props.buttonDirections[3].direction]: 1,
        });
    }, []);

    const handleCellClick = (event) => {
        event.preventDefault();
        if (props.arePlayerCropsPlaced) {
            event.target.classList.add("game-grid__cell--red");
        } else {
            fillCellsWithSymbol(props.currentCrop, event);
        }
    };

    const fillCellsWithSymbol = (currentCrop, event) => {
        let playerGrid = props.playerGrid;
        const targetId = +event.target.id;
        if (targetId === selectedCellId) {
        } else {
            setSelectedCellId(+event.target.id);
        }

        for (let i = 0; i < currentCrop.spaces; i++) {
            playerGrid = playerGrid.map((cell) => {
                if (
                    cell.id ===
                    targetId +
                        i *
                            cellDifference[
                                props.buttonDirections.find(
                                    (direction) => direction.isSelected
                                ).direction
                            ]
                ) {
                    cell.cropSymbol = currentCrop.cropSymbol;
                }
                return cell;
            });
        }

        props.onPlayerGridChange(playerGrid);
    };

    return (
        <div className="game-grid">
            {props.playerGrid.map((cell) => (
                <div
                    className="game-grid__cell"
                    key={cell.id}
                    onClick={handleCellClick}
                    id={cell.id}
                >
                    {cell.id}
                    <div className="game-grid__inner-cell">
                        {cell.cropSymbol}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
