import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const CrowdfundingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const crowdfundingContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  //  console.log("signer",signer);
  // console.log("provider",provider);
  // console.log("crowdfundingContract",crowdfundingContract);
  return crowdfundingContract;
};

export const CrowdfundingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [numRequests, setNumRequests] = useState(0);
  const [requests, setRequests] = useState([{}]);
  const [personalBal, setPersonalBal] = useState(0);
  const [manager, setManager] = useState("a");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hexTimeRemaining, setHexTimeRemaining] = useState(0);
  const [properTime,setProperTime] = useState("");
  const [noOfContributors,setNoOfContributors] = useState(0);
  

  const [formData, setFormData] = useState({
    cause: "",
    recipientName: "",
    description: "",
    recipient: "",
    value: "",
    imgURL: "",
  });

  const handleSubmit = async (event,success,errors) => {
    event.preventDefault();
    console.log("clicked")
    console.log("Form Data:", formData);
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const transaction = await contract.createRequests(
        formData.cause,
        formData.recipientName,
        formData.description,
        formData.recipient,
        formData.value,
        formData.imgURL
      );
      await transaction.wait();
      await getNumRequests();
      await getRequests();
      console.log("transaction", transaction);
      success("Request created successfully");
    } catch (error) {
      try {
        errors(error.message);
      } catch (ee) {
        errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in creating request");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("Form Data:", formData);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
        console.log("No account found");
      }
    //  personalBalance();

      // console.log("accounts",accounts);
    } catch (error) {
      console.log(error);
      throw new Error("Error in connecting wallet");
    }
  };

  const ConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      await getNumRequests();
      await getRequests();
      //   await personalBalance();
    } catch (error) {
      console.log(error);
      throw new Error("Error in connecting wallet");
    }
  };

  const getMinContrib = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const contracts = getEthereumContract();
      const minContribution = await contracts.minContribution();
      const minContributionNumber = minContribution.toNumber();
      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
      throw new Error("Error in getting min contribution");
    }
  };

  const getManager = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const manager = await contract.manager();
    //   console.log("manager", manager);
      setManager(manager.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract();
      const updatedRequests = [];
      // await getNumRequests();
      // console.log("from getRequest numRequests", numRequests);

      for (let i = 0; i < numRequests; i++) {
        // console.log("i",i,"NumRequests",numRequests);
        const request = await contract.requests(i);
        await request;
        const convertedRequest = {
          ...request,
          [3]: request[3].toNumber(),
          [5]: request[5].toNumber(),
        };

        updatedRequests.push(convertedRequest);
      }
      // console.log("updatedRequests", updatedRequests);

      setRequests(updatedRequests);
      localStorage.setItem("request", JSON.stringify(requests));
      // console.log("requests", updatedRequests);
    } catch (error) {
      console.log(error);
      throw new Error("Error in getting requests");
    }
  };

  const getNumRequests = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const numRequests = await contract.numRequests();
      const numRequestsNumber = numRequests.toNumber();
      // console.log("numRequestsNumber from its function", numRequestsNumber);
      setNumRequests(Number(numRequestsNumber));
      // console.log("numRequests from its function", numRequestsNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const sendETH = async (val,success,errors) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const valInWei = ethers.utils.parseUnits(val.toString(), "wei");
      // console.log("valInWei", valInWei);
      const tx = await contract.sendEth({
        value: valInWei._hex,
        gasLimit: 99000,
      });
      await tx.wait();
      await personalBalance();
      await getNoOfContributors();
      console.log("tx", tx);
      success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        
        errors(error.error && error.error.message ? error.error.message : error.message);

      } catch (error) {
        errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const personalBalance = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      // console.log("currentAccount",currentAccount);
      // console.log("currentAccount", currentAccount);
      const balance = await contract.contributors(currentAccount);
      const balanceNumber = balance.toNumber();
      // console.log("balanceNumber",balance);
      setPersonalBal(Number(balanceNumber));
    } catch (error) {
      console.log(error);
      // throw new Error("Error in getting personal balance");
    }
  };

  const extendDeadline = async (num,success,errors) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const dayInBlockTime = num*24*60*60;
      const tx = await contract.updateDeadline(dayInBlockTime);
      await tx.wait();
      console.log("tx", tx);
      success(`Deadline extended by ${num} `)
      calculateTimeLeft();
    } catch (error) {
      try {
        errors(error.error.message);
      } catch (r) {
        errors('User decline the transaction')
      }
      
      console.log(error);
    }
  };

  function convertTimestampToDHMS(timestamp) {
    const days = Math.floor(timestamp / (60 * 60 * 24));
    // const hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
    // const minutes = Math.floor((timestamp % (60 * 60)) / 60);
    // const seconds = Math.floor(timestamp % 60);

    return days ;
  }

  function ogConvertTimestampToDHMS(timestamp) {
    const days = Math.floor(timestamp / (60 * 60 * 24));
    const hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timestamp % (60 * 60)) / 60);
    const seconds = Math.floor(timestamp % 60);
  
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }
  

  const calculateTimeLeft = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();

      const deadline = await contract.deadline();
      const deadlineNumber = deadline.toNumber();
    //   console.log("deadlineNumber", deadlineNumber);
      const currentTime = await contract.currentTime();
      const currentTimeNumber = currentTime.toNumber();
        // console.log("currentTimeNumber", currentTimeNumber);
      const timeLeft = deadlineNumber - currentTimeNumber;
        // console.log("timeLeft", timeLeft);
         setProperTime(ogConvertTimestampToDHMS(timeLeft));
      setHexTimeRemaining(timeLeft);
    //  setTimeRemaining(Number(convertTimestampToDHMS(timeLeft)));
    
    //   console.log("HexTimeRemaining", hexTimeRemaining);
    //   console.log("TimeRemaining", timeRemaining);
    } catch (error) {}
  };

  const getNoOfContributors = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract();
      const noOfContributors = await contract.noOfContributors();
      const noOfContributorsNumber = noOfContributors.toNumber();
      // console.log("noOfContributorsNumber", noOfContributorsNumber);
      setNoOfContributors(Number(noOfContributorsNumber));
    } catch (error) {
      console.log(error);
    }
  };

 
  
  const vote = async (index,success,errorr) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract();
      const tx = await contract.voteRequest(index);
      await tx.wait();
      await getNumRequests();
      await getRequests();
      console.log("tx", tx);
      success("Voted successfully");
    } catch (error) {
      try {
        
        errorr(error.error.message);
      } catch (r) {
        errorr("User decline the transaction")
      }
    }
  };
  
  const Voters = async (index, account) => {
    // try {
    //   if (!ethereum) return alert("Please install MetaMask");
    //   const contract = getEthereumContract();
  
    //   const request = await contract.requests(index).voters('0xAabf644A3549067D0CFE103aFD9B0cFD8b1fc626');

    //   // Check if the account exists in the voters mapping
    //   console.log("request",request);
    //   // const isVoter =request.voters[account];
      
  
    //   // console.log("isVoter", isVoter);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const makePayment = async (index,success,errorr) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract();
      const tx = await contract.makePayment(index);
      await tx.wait();
      await getNumRequests();
      await getRequests();

      console.log("tx", tx);
      success("Payment made successfully");
    } catch (error) {
      try {

        errorr(error.error.message);
      } catch (r) {
        errorr("User decline the transaction");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkIfWalletIsConnected();
        await getNumRequests();
      await calculateTimeLeft();
      await getNoOfContributors();
      
      await personalBalance();

        // await personalBalance();
        await getRequests();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

 
 useEffect(() => {
  const interval = setInterval(async() => {
    if(hexTimeRemaining > 0)
    {setHexTimeRemaining(hexTimeRemaining - 1);
    setProperTime(ogConvertTimestampToDHMS(hexTimeRemaining));
    setTimeRemaining(Number(convertTimestampToDHMS(hexTimeRemaining)));
    await checkIfWalletIsConnected();
    try {
       personalBalance();

      
    } catch (error) {
      console.error("Error in fetchData:", error);
    }

  
  }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, [hexTimeRemaining]);
  

  useEffect(() => {
    const interval = async () => {
      await getNumRequests();
      await getRequests();
      await checkIfWalletIsConnected();
      await personalBalance();
      await getManager();
      await calculateTimeLeft();
      await getNoOfContributors();


    };
    interval();
  }, [numRequests]);

  return (
    <CrowdfundingContext.Provider
      value={{
        checkIfWalletIsConnected,
        getEthereumContract,
        ConnectWallet,
        currentAccount,
        getMinContrib,
        getManager,
        handleInputChange,
        handleSubmit,
        numRequests,
        requests,
        sendETH,
        personalBal,
        personalBalance,
        extendDeadline,
        manager,
        hexTimeRemaining,
        timeRemaining,
        properTime,
        noOfContributors,
        getRequests,
        vote, 
        Voters,
        getNumRequests,
        makePayment,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};
