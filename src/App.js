import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import OpenCard from "./components/OpenCard";
import React from "react";
import { CrowdfundingProvider} from './context/CrowdfundingContext';


function App() {
 
  return (
    <BrowserRouter>
      <div>
  <CrowdfundingProvider>

        <Routes>
          <Route path="/" element={<Mainpage /*state = {state}*/ />} />
          <Route path="/card/:index" element={<OpenCard />} />
        </Routes>
        {/* {<RegisterPage/>}  */}
        </CrowdfundingProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
