import React from "react";
import "./css/Prefooter.css";

function Prefooter() {
  return (
    <div className="prefooter">
        <div className="boxprefooter">
            <p className="boxtxt1">Join us to see how your support makes a real difference.</p>
            <button className="initHelp">Initiate Help</button>
        </div>
        <div>
        <p className="boxtxtright">Decentralized crowdfunding reimagines fundraising by harnessing blockchain technology to empower a global community of backers, ensuring transparency, trust, and direct support for impactful projects and causes.</p>
      </div>
    </div>
  );
}

export default Prefooter;