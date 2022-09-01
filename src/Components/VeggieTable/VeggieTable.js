import "./VeggieTable.css";

const VeggieTable = ({
    // playerVeggies,
    onUpdateVeggies,
    arePlayerVeggiesPlaced,
    gameStatus,
    player1Data,
    player2Data,
}) => {
    const handleVeggieSelection = (event) => {
        const newPlayerVeggies = gameStatus.isPlayer1Turn
            ? [...player1Data.playerVeggies]
            : [...player2Data.playerVeggies];
        newPlayerVeggies.forEach((veggie) => {
            if (veggie.isPlaced) {
                return;
            } else {
                veggie.veggieSymbol === event.target.id
                    ? (veggie.isSelected = true)
                    : (veggie.isSelected = false);
            }
        });
        onUpdateVeggies([...newPlayerVeggies]);
    };

    const renderTableBody = () => {
        let playerVeggies;
        if (gameStatus.isPlayer1Turn && !arePlayerVeggiesPlaced) {
            playerVeggies = player1Data.playerVeggies;
        } else if (gameStatus.isPlayer1Turn && arePlayerVeggiesPlaced) {
            playerVeggies = player2Data.playerVeggies;
        } else if (!gameStatus.isPlayer1Turn && !arePlayerVeggiesPlaced) {
            playerVeggies = player2Data.playerVeggies;
        } else if (!gameStatus.isPlayer1Turn && arePlayerVeggiesPlaced) {
            playerVeggies = player1Data.playerVeggies;
        }
        return playerVeggies.map((veggie, index) => {
            return (
                <tr key={index}>
                    <td
                        className={
                            arePlayerVeggiesPlaced
                                ? "veggie-name"
                                : veggie.isSelected
                                ? "veggie-selected"
                                : "veggie-name"
                        }
                        onClick={
                            veggie.isPlaced ? () => {} : handleVeggieSelection
                        }
                        id={veggie.veggieSymbol}
                    >
                        {`${veggie.veggieSymbol} (${veggie.spaces})`}
                    </td>
                    <td>
                        {!arePlayerVeggiesPlaced &&
                            (veggie.isPlaced ? "✅" : "❌")}
                        {arePlayerVeggiesPlaced &&
                            (veggie.isDestroyed ? "✅" : "❌")}
                    </td>
                </tr>
            );
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Vegetable</th>
                    <th>{arePlayerVeggiesPlaced ? "Destroyed?" : "Placed?"}</th>
                </tr>
            </thead>
            <tbody>
                {renderTableBody()}
                {/* {arePlayerVeggiesPlaced &&
                    playerVeggies.map((veggie, index) => {
                        return (
                            <tr key={index}>
                                <td
                                    className={
                                        veggie.isSelected
                                            ? "veggie-selected"
                                            : "vegetable-name"
                                    }
                                    onClick={
                                        veggie.isPlaced
                                            ? () => {}
                                            : handleVeggieSelection
                                    }
                                    id={veggie.veggieSymbol}
                                >
                                    {`${veggie.veggieSymbol} (${veggie.spaces})`}
                                </td>
                                <td>
                                    {arePlayerVeggiesPlaced &&
                                    veggie.isDestroyed
                                        ? "✅"
                                        : "❌"}
                                    {!arePlayerVeggiesPlaced && veggie.isPlaced
                                        ? "✅"
                                        : "❌"}
                                </td>
                            </tr>
                        );
                    })} */}
            </tbody>
        </table>
    );
};

export default VeggieTable;
