import React,{useContext,useEffect,useState} from "react";
import "./css/Header.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Profile from "./Profile";
import { CrowdfundingContext } from "../context/CrowdfundingContext";


function Header(){
  const {getManager,manager,currentAccount,handleInputChange,handleSubmit,properTime} = useContext(CrowdfundingContext);
  const [campaignButton,setCampaignButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showSuccessPopup = (successMessage) => {
    const errorPopup = document.getElementById("alert-successs");
    errorPopup.querySelector("span").textContent = `Success ${successMessage}`;
    errorPopup.classList.remove("hidden");
    console.log(errorPopup);
    setTimeout(() => {
      errorPopup.classList.add("hidden");
    }, 8000); 
  };

  const showErrorPopup = (errorMessage) => {
    const errorPopup = document.getElementById("error-popup");
    errorPopup.querySelector("span").textContent = `Error! ${errorMessage}`;
    errorPopup.classList.remove("hidden");
    console.log(errorPopup);
    setTimeout(() => {
      errorPopup.classList.add("hidden");
    }, 8000); 
  };

  useEffect(()=>{
    getManager();
    
    if(manager===currentAccount){
        setCampaignButton(true);
    }
    else{
        setCampaignButton(false);
    }
    },[currentAccount,manager]);
    return (
    <div className="header">

        <div className="logo">
        <img src="https://cdn.discordapp.com/attachments/1096324843877703713/1148891440206848010/image.png" alt="logo" />
        <p>Fund-ETH</p>
        </div>

        <div className="midHeader">
        <a href="/#cardd"> <p>Browse Fundraisers</p> </a>
        <button> <p>How it works?</p> </button>
        <p>{properTime}</p>
        </div>
        {campaignButton?(<Popup className="HEADER_startCamp" trigger={<div className="endHeader">
        <button> <p> Start a Campaign </p></button>
        
        </div>} position="bottom right" >
            <div className="startCampaign">
            <form > 
        <label htmlFor="cause">Cause:</label>
        <input onChange={handleInputChange} type="text" id="cause" name="cause" required/><br/><br/>

        <label htmlFor="recipientName">Recipient Name:</label>
        <input onChange={handleInputChange} type="text" id="recipientName" name="recipientName" required/><br/><br/>

        <label htmlFor="description">Description:</label>
        <input onChange={handleInputChange} type="text" id="description" name="description" required/><br/><br/>

        <label htmlFor="recipient">Recipient Address:</label>
        <input onChange={handleInputChange} type="text" id="recipient" name="recipient" required/><br/><br/>

        <label htmlFor="value">Value:</label>
        <input onChange={handleInputChange} type="number" id="value" name="value" required/><br/><br/>

        <label htmlFor="imgURL">Image URL:</label>
        <input onChange={handleInputChange} type="text" id="imgURL" name="imgURL" required/><br/><br/>

        <input onClick={async(e)=>{
            setIsLoading(true);
            await handleSubmit(e,showSuccessPopup,showErrorPopup);
            setIsLoading(false);}} type="submit" value="Submit"/>
    </form>
            </div>
        </Popup>):(<div />)}

        
        <Popup trigger={<img className="profile" src="https://cdn.discordapp.com/attachments/1096324843877703713/1148912645374758953/image.png"/>} position="right top" ><Profile/></Popup>
        {isLoading?(<div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
):(<div></div>)}

       {/* //error popup */}
      <div id="error-popup" class="alert alert-error hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>

{/* success popup */}
      <div id="alert-successs" className="alert alert-success hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Your purchase has been confirmed!</span>
      </div>
     
    </div>)
}

export default Header;