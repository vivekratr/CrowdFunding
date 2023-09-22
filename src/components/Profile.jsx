import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./css/Profile.css";
import { CrowdfundingContext } from "../context/CrowdfundingContext";

function Profile() {
  const {
    currentAccount,
    sendETH,
    personalBal,
    personalBalance,
    extendDeadline,
    getManager,
    manager,
  } = useContext(CrowdfundingContext);
  const [amount, setAmount] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  personalBalance();
  function handleChange(event) {
    setAmount(event.target.value);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await sendETH(amount, showSuccessPopup,showErrorPopup);
    setIsLoading(false);
    setAmount(0);
  }

  function handleChangeExtend(event) {
    setDeadline(event.target.value);
  }

  async function handleSubmitExtend(event) {
    event.preventDefault();
    setIsLoading(true);
    await extendDeadline(deadline, showSuccessPopup,showErrorPopup);
    setIsLoading(false);
  }
  console.log("manager", manager);
  console.log("currentAccount", currentAccount);

  return (
    <div>
      <div className="frame">
        <div className="walletAdd">
          <p>Wallet Address: {currentAccount}</p>
        </div>
        <div className="balance">
          <div className="cbal">
            Current Balance
            <div className="dbal">{personalBal}</div>
          </div>
        </div>

        <div className="addbal">
          <div className="eth">
            Add ETH
            <div className="ethamount">
              <input
                onChange={handleChange}
                value={amount}
                type="text"
                className="Input"
                placeholder="Type amount"
              ></input>
            </div>
            <button onClick={handleSubmit} className="addbtn">
              Add
            </button>
          </div>
        </div>

        {manager === currentAccount && (
          <div className="extend">
            <p>Update Deadline (in Days)</p>
            <input onChange={handleChangeExtend} type="Number" />
            <button onClick={handleSubmitExtend}>Submit</button>
          </div>
        )}
      </div>
      {/* {isLoading?(<div className="loader-container">
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
</div>
):(<div></div>)} */}
      {isLoading ? (
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div></div>
      )}
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
    </div>
  );
}

export default Profile;
