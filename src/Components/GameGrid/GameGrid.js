import "./GameGrid.css";
import { useState, useEffect } from "react";

const GameGrid = (props) => {
    // const [selectedCellId, setSelectedCellId] = useState("");
    const [cellDifference, setCellDifference] = useState({});

    useEffect(() => {
        setCellDifference({
            [props.buttonDirections[0].direction]: props.height * -1,
            [props.buttonDirections[1].direction]: props.height,
            [props.buttonDirections[2].direction]: -1,
            [props.buttonDirections[3].direction]: 1,
        });
    }, []);

    const handleAttackingCellClick = (event) => {
        const targetId = +event.target.id;
        const newPlayerGrid = props.playerGrid.map((cell) => {
            if (targetId === cell.id && !cell.isAttacked) {
                cell.isSelected = true;
            } else {
                cell.isSelected = false;
            }
            return cell;
        });
        props.onPlayerGridChange(newPlayerGrid);
    };

    const handleSetUpCellClick = (event) => {
        event.preventDefault();
        if (props.currentVeggie.isPlaced) {
            return;
        }
        const playerVeggies = props.playerVeggies;
        debugger;
        if (!fillCellsWithVeggies(props.currentVeggie, event)) {
            return;
        }
        debugger;
        const newPlayerVeggies = playerVeggies.map((veggie, index) => {
            if (veggie.veggieName === props.currentVeggie.veggieName) {
                veggie.isSelected = false;
                veggie.isPlaced = true;
                if (playerVeggies.some((veggie) => !veggie.isPlaced)) {
                    playerVeggies[
                        playerVeggies.findIndex((veggie) => !veggie.isPlaced)
                    ].isSelected = true;
                }
            }
            return veggie;
        });

        props.onUpdateVeggies(newPlayerVeggies);
    };

    const checkCellsToFill = (
        currentVeggie,
        targetId,
        playerGrid,
        direction
    ) => {
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
        if (cellsToFill.some((cell) => cell.veggieSymbol)) {
            // console.log("veggie clash");
            return false;
        }
        if (cellsToFill.length !== currentVeggie.spaces) {
            // console.log("out of grid");
            return false;
        }
        if (direction === "up" || direction === "down") {
            return true;
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
        if (
            !checkCellsToFill(
                currentVeggie,
                targetId,
                playerGrid,
                props.buttonDirections.find((direction) => direction.isSelected)
                    .direction
            )
        ) {
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
                    debugger;
                    cell.veggieSymbol = currentVeggie.veggieSymbol;
                }
                return cell;
            });
        }

        props.onPlayerGridChange(playerGrid);
        return true;
    };

    const renderGridInnerCell = (cell) => {
        if (props.arePlayerVeggiesPlaced) {
            if (props.isAttacking && cell.isSelected) {
                return "🎯";
            }
            if (props.isAttacking) {
                return cell.isAttackingHit
                    ? "💥"
                    : cell.isAttackingMiss
                    ? "⚫"
                    : "";
            }
            return cell.isDefendingHit
                ? "💥"
                : cell.isDefendingMiss
                ? "⚫"
                : cell.veggieSymbol;
        }
        return cell.veggieSymbol;
    };

    return (
        <div className="game-grid">
            {props.playerGrid.map((cell) => (
                <div
                    className="game-grid__cell"
                    key={cell.id}
                    onClick={
                        props.arePlayerVeggiesPlaced
                            ? handleAttackingCellClick
                            : handleSetUpCellClick
                    }
                    id={cell.id}
                >
                    {cell.id}
                    <div className="game-grid__inner-cell">
                        {() => {
                            if (props.arePlayerVeggiesPlaced) {
                                if (props.isAttacking) {
                                }
                                return cell.veggieSymbol;
                            }
                            return cell.veggieSymbol;
                        }}
                        {/* {props.arePlayerVeggiesPlaced
                            ? !props.isAttacking && cell.veggieSymbol
                            : cell.veggieSymbol} */}
                        {renderGridInnerCell(cell)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
