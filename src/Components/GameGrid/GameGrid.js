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
        const playerVeggies = props.playerVeggies;
        if (props.arePlayerVeggiesPlaced) {
            event.target.classList.add("game-grid__cell--red");
        } else {
            if (!fillCellsWithVeggies(props.currentVeggie, event)) {
                return;
            }
        }
        const newPlayerVeggies = playerVeggies.map((veggie, index) => {
            if (veggie.veggieName === props.currentVeggie.veggieName) {
                veggie.isSelected = false;
                veggie.isPlaced = true;
                if (!playerVeggies[index + 1].isPlaced) {
                    playerVeggies[index + 1].isSelected = true;
                }
            }
            return veggie;
        });

        props.onUpdateVeggies(newPlayerVeggies);
    };

    const checkCellsToFill = (currentVeggie, targetId, playerGrid) => {
        const cellsToFill = [];
        for (let i = 0; i < currentVeggie.spaces; i++) {
            playerGrid.forEach((cell) => {
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
                    cellsToFill.push(cell);
                }
            });
        }
        // console.log("cellstofill", cellsToFill);
        if (cellsToFill.some((cell) => cell.veggieSymbol)) {
            // console.log("veggie clash");
            return false;
        }
        if (cellsToFill.length !== currentVeggie.spaces) {
            // console.log("out of grid");
            return false;
        }
        if (cellsToFill[cellsToFill.length - 1].id % 10 === 0) {
            // console.log("end of line edge case");
            return cellsToFill[0].id < cellsToFill[cellsToFill.length - 1].id;
        }
        if (
            Math.floor(cellsToFill[0].id / 10) !==
            Math.floor(cellsToFill[cellsToFill.length - 1].id / 10)
        ) {
            // console.log("end of line");
            return false;
        }
        return true;
    };

    const fillCellsWithVeggies = (currentVeggie, event) => {
        let playerGrid = props.playerGrid;
        const targetId = +event.target.id;
        // if (targetId === selectedCellId) {
        // } else {
        //     setSelectedCellId(+event.target.id);
        // }
        if (!checkCellsToFill(currentVeggie, targetId, playerGrid)) {
            return false;
        }

        for (let i = 0; i < currentVeggie.spaces; i++) {
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
                    cell.veggieSymbol = currentVeggie.veggieSymbol;
                }
                return cell;
            });
        }

        props.onPlayerGridChange(playerGrid);
        return true;
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
                        {cell.veggieSymbol}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
