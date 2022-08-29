import "./HowItWorks.css";

const HowItWorks = ({ onClose }) => {
    return (
        <div className="how-it-works">
            <div className="how-it-works__close" onClick={onClose}>
                &#10060;
            </div>
            <div className="how-it-works__screen">HowItWorks</div>
        </div>
    );
};
export default HowItWorks;
