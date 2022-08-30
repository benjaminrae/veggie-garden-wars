import "./GameGrid.css";
import { useState, useEffect } from "react";

const GameGrid = ({
    height,
    width,
    arePlayerVeggiesPlaced,
    currentVeggie,
    number,
    playerGrid,
    onPlayerGridChange,
    onUpdateVeggies,
    playerVeggies,
    buttonDirections,
    isAttacking,
    showBoardComparison,
}) => {
    const [cellDifference, setCellDifference] = useState({});

    useEffect(() => {
        setCellDifference({
            [buttonDirections[0].direction]: width * -1,
            [buttonDirections[1].direction]: width,
            [buttonDirections[2].direction]: -1,
            [buttonDirections[3].direction]: 1,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAttackingCellClick = (event) => {
        const targetId = +event.target.id;
        const newPlayerGrid = playerGrid.map((cell) => {
            if (targetId === cell.id && !cell.isAttacked) {
                cell.isSelected = true;
            } else {
                cell.isSelected = false;
            }
            return cell;
        });
        onPlayerGridChange(newPlayerGrid);
    };

    const handleSetUpCellClick = (event) => {
        event.preventDefault();
        if (currentVeggie.isPlaced) {
            return;
        }
        if (!fillCellsWithVeggies(currentVeggie, event)) {
            return;
        }
        const newPlayerVeggies = playerVeggies.map((veggie, index) => {
            if (veggie.veggieName === currentVeggie.veggieName) {
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

        onUpdateVeggies(newPlayerVeggies);
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
                                buttonDirections.find(
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
            // console.log("end of line edge case");

            return true;
        }
        const sortedCellsToFill = cellsToFill.sort((a, b) => a.id - b.id);
        if (sortedCellsToFill[sortedCellsToFill.length - 1].id % 10 === 0) {
            // console.log("end of line edge case");
            return true;
        }
        if (sortedCellsToFill[0].id % 10 === 0) {
            // console.log("end of line edge case");
            return false;
        }
        // if (cellsToFill[cellsToFill.length - 1].id % 10 === 0) {
        //     console.log("end of line edge case");
        //     return cellsToFill[0].id < cellsToFill[cellsToFill.length - 1].id;
        // }
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
                buttonDirections.find((direction) => direction.isSelected)
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
                                buttonDirections.find(
                                    (direction) => direction.isSelected
                                ).direction
                            ]
                ) {
                    cell.veggieSymbol = currentVeggie.veggieSymbol;
                }
                return cell;
            });
        }

        onPlayerGridChange(playerGrid);
        return true;
    };

    const renderGridInnerCell = (cell) => {
        if (arePlayerVeggiesPlaced) {
            if (isAttacking && cell.isSelected) {
                return "🎯";
            }
            if (isAttacking) {
                return cell.isAttackingHit
                    ? "💥"
                    : cell.isAttackingMiss
                    ? "⚫"
                    : showBoardComparison
                    ? cell.veggieSymbol
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
            {playerGrid.map((cell) => (
                <div
                    className="game-grid__cell"
                    key={cell.id}
                    onClick={
                        arePlayerVeggiesPlaced
                            ? handleAttackingCellClick
                            : handleSetUpCellClick
                    }
                    id={cell.id}
                >
                    {cell.id}
                    <div className="game-grid__inner-cell">
                        {renderGridInnerCell(cell)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
