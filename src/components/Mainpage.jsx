import React,{useContext} from "react";
import "./css/Mainpage.css";
import Header from "./Header";
import Card from "./Card";
import Wcwe from "./Wcwe";
import Prefooter from "./Prefooter";
import Footer from "./Footer";
import { CrowdfundingContext } from "../context/CrowdfundingContext";

// import { useState,useEffect } from "react";
// import { ethers } from "ethers";

function Mainpage() {
  const {ConnectWallet,currentAccount,getManager,requests} = useContext(CrowdfundingContext);
 
  return (
    <div>
      <Header />
      

      <hr />

      <div className="div1">
        <div className="div1a">
          <img
            src="https://cdn.discordapp.com/attachments/1096324843877703713/1148920034538823740/image.png"
            alt="logo"
          />
        </div>

        <div className="div1b">
          {(currentAccount==="")&&<button className="connectWallet" onClick={ConnectWallet}> Connect Wallet</button>}
          <p className="text1">Join the Crowdfunding Revolution</p>
          <p className="text2">
            Blockchain-Powered Compassion: Transforming Aid with Transparency.
          </p>
          <button onClick={getManager}  className="initHelp">
            <p>Initiate Help</p>
          </button>
        </div>
      </div>

      <hr />

      <div className="div2">
        <h4 className="text3">List of all fundraising campaigns</h4>
        <div className="groupCard">

          {requests.map((request,index) => {
            // console.log("request from mainpage",request[4]);
            if(request[4]===true){
              return null;
            }
            return (
              <Card
                key={index}
                index={index}
                img={request[7]}
                description={request[0]}
                user={request[2]}
                fundReq={request[3]}
                // days='40'
                type={request[6]}
                votes={request[5]}
              />
            );
          })}
          
          {/* <Card
            img="https://cdn.discordapp.com/attachments/1096324843877703713/1148929641495674950/image.png"
            description="Assam flood fundraising, up lift the condition."
            user="Ravi Sharma"
            fundReq="10"
            days="30"
            type="Disaster"
            votes="0"
          /> */}
        </div>
      </div>
      <hr />
      <Wcwe />
      <hr />
      <Prefooter />

      <Footer />
    </div>
  );
}

export default Mainpage;
