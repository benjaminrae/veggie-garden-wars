import "./HighScores.css";

const ScoreTable = ({ highScores }) => {
    const sortedHighScores = [...highScores].sort((a, b) => b.turns - a.turns);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Winner</th>
                        <th>Loser</th>
                        <th>Turns</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedHighScores.map((highScore, index) => {
                        return (
                            <tr key={index}>
                                <td>{highScore.winner.playerName}</td>
                                <td>{highScore.loser.playerName}</td>
                                <td>{highScore.turns}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

const HighScores = ({ onClose, highScores }) => {
    // const { winner, loser, turns } = highScores;
    return (
        <div className="high-scores">
            <div className="high-scores__close" onClick={onClose}>
                &#10060;
            </div>
            <div className="high-scores__screen">
                <h2 className="high-scores__title">HighScores</h2>
                <ScoreTable highScores={highScores} />
            </div>
        </div>
    );
};

export default HighScores;
