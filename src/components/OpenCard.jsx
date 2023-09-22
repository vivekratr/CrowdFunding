import React, { useContext, useEffect} from "react";
import Header from "./Header";
import { CrowdfundingContext } from "../context/CrowdfundingContext";
import "./css/OpenCard.css";
import Progress_bar from "./Progress_bar";
import Wcwe from "./Wcwe";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { get } from "mongoose";


function OpenCard() {

  // const [isError, setIsError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

   
  

  const navigate = useNavigate();
  const { index } = useParams();
  const {
    requests,
    timeRemaining,
    numRequests,
    noOfContributors,
    getRequests,
    getNumRequests,
    personalBal,
    currentAccount,
    vote,
    Voters,
    manager,
    ConnectWallet,
    checkIfWalletIsConnected,
    makePayment,
  } = useContext(CrowdfundingContext);
  
  useEffect(() => {
    if (currentAccount === "") {
     const run = async ()=>{await checkIfWalletIsConnected();
           }
           run();
                 console.log("currentAccount",currentAccount)


    }
    const run1 = async ()=>{
   await getNumRequests();
    await getRequests();
    }
    run1();
  }, [currentAccount]);
  const nextIndex = (Number(index) + 1) % numRequests;

  var data;
  const percent = ((30 - timeRemaining) / 30) * 100;
  let nextData;
  if (!requests || isNaN(Number(index))) {
    const call = async () => {
      await getRequests();
    };
    call();
  }
  // Voters(index, currentAccount);
  let cachedContractData,dummyData ;
  
 
  try {
    // console.log("Index",index,"Requests",requests);
    if(!requests){
      cachedContractData = localStorage.getItem("request");
    console.log("cachedContractData",cachedContractData);
    if (cachedContractData) {
       dummyData = JSON.parse(cachedContractData);
       data = dummyData[Number(index)];
       nextData = dummyData[nextIndex];
    }
    }
    else{
    data = requests[Number(index)];
    nextData = requests[nextIndex];}
    // console.log("Data",data);
  } catch (error) {
    console.log("Error", error);
  }

  function handleClick() {
    // const queryString = `?index=${nextIndex}`;
    navigate(`/card/${nextIndex}`);
  }

  async function voteNow() {
    await vote(index,showSuccessPopup,showErrorPopup);
  }

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

  return (
    <div>
      <Header />
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



      <button
        class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
        title="Go Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          class="stroke-blue-300"
        >
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M11 6L5 12M5 12L11 18M5 12H19"
          ></path>
        </svg>
      </button>
      <div className="opencard_text1">
        <p>{data[0]}</p>


      </div>

      <div className="opencard_div1">
        <img src={data[7]} alt="" />
        <div className="opencard_div1_card">
          <div className="opencard_div1_card1">
            <div className="opencard_div1_card1_1">
              <p>{data[6]}</p>
            </div>

            <div className="opencard_div1_card1_2">
              <p>
                {data[5]} / {noOfContributors} Votes
              </p>
            </div>
          </div>
          {/* {personalBal>0?(data[5](currentAccount)?):(<div></div>)} */}
          <div onClick={voteNow} className="opencard_div1_card2 effect">
            <p>Vote for Good</p>
          </div>
          
          <div className="opencard_div1_card3">
            <div className="opencard_div1_card3_1">
              <p>Goal amount :</p>
            </div>
            <div className="opencard_div1_card3_2">
              <p>{data[3]}</p>
              <div className="opencard_div1_card3_2_1">
                <img
                  src="https://cdn.discordapp.com/attachments/1151935478526910564/1152287827929866260/image.png"
                  alt=""
                />
                <p>ETH</p>
              </div>
            </div>
          </div>
          <div className="opencard_div1_card4">
            <div className="opencard_div1_card4_1">
              <p>Wallet address :</p>
            </div>
            <div className="opencard_div1_card4_2">
              <p> {data[1]}</p>
            </div>
          </div>
          <div className="opencard_div1_card5">
            <div className="opencard_div1_card5_1">
              <Progress_bar bgcolor="#16BDCA" progress={percent} height={30} />
            </div>
            <div className="opencard_div1_card5_2">
              <span>{timeRemaining} </span> <p> days left</p>
            </div>
          </div>
          <div className="opencard_div1_card6">
            <img
              src="https://cdn.discordapp.com/attachments/1151935478526910564/1152319641100746903/user-profile-icon-front-side-with-white-background_187299-40010.png"
              alt=""
            />

            <div className="opencard_div1_card6_1">
              <p className="first"> {data[2]}</p>
              <p>Campaigner</p>
            </div>
          </div>
          <div className="opencard_div1_card7">
            {(currentAccount===manager)&&(<div onClick={()=>{makePayment(index,showSuccessPopup,showErrorPopup)}} className="opencard_div1_card7_1  animate-pulse  flex-wrap cursor-pointer rounded">
              Make Payment
            </div>)}
          </div>
        </div>
      </div>

      <div className="normalText">
        <span></span>
        <p>Similar campaigns</p>
      </div>

      <div className="opencard_div2">
        <div className="opencard_div2_1"></div>

        <div onClick={handleClick} className="opencard_div2_2">
          <img src={nextData[7]} alt="" />

          <div className="opencard_div2_2_1">
            <h1>{nextData[0]}</h1>

            <div className="opencard_div2_2_2">
              <img
                src="https://cdn.discordapp.com/attachments/1151935478526910564/1152319641100746903/user-profile-icon-front-side-with-white-background_187299-40010.png"
                alt=""
              />

              <p className="first">Posted By {nextData[2]}</p>
            </div>

            <div className="opencard_div2_2_3">
              <p>{nextData[3]}</p>
              <div className="opencard_div2_2_3_1">
                <img
                  src="https://cdn.discordapp.com/attachments/1151935478526910564/1152287827929866260/image.png"
                  alt=""
                />
                <p>ETH</p>
              </div>
            </div>

            <div className="opencard_div2_2_4">
              <div className="opencard_div2_2_4_1">
                <Progress_bar
                  bgcolor="#16BDCA"
                  progress={percent}
                  height={30}
                />
              </div>
              <p>
                {" "}
                <b>{timeRemaining}</b> days left
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opencard_div3">
        <Wcwe />
      </div>
    </div>
  );
}

export default OpenCard;
