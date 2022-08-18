import "./HighScores.css";

const HighScores = (props) => {
    return (
        <div className="high-scores">
            <div className="high-scores__close" onClick={props.onClose}>
                &#10060;
            </div>
            <div className="high-scores__screen">HighScores</div>
        </div>
    );
};

export default HighScores;
