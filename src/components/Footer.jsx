import React from "react";
import "./css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <br />
        <br />
        <br />
        <br />
       
          <p className="text1">Join the Crowdfunding Revolution</p>
        
        <p className="text2">
          Blockchain-Powered Compassion: Transforming Aid with Transparency.
        </p>
        <div style={{ height: 'auto', width: '50rem',paddingLeft:'3rem',display:'flex',flexDirection:'row',gap:'1rem'}}>
      <img width={`100%`} height={`auto`} style={{objectFit:'contain'}} src="https://cdn.discordapp.com/attachments/1096324843877703713/1179805627577532556/IC_logo_horizontal.png?ex=657b1e9d&is=6568a99d&hm=0ea4c0ba64fd133f2e4e0262bc7ebe126bd8cae35b5ce3583cd8915b3b81cf2f&" alt="" />
      <p style={{width:'19rem',marginTop:'auto',marginBottom:'auto'}}>We have used motoko so that our applications to run on the Internet Computer blockchain network.</p>
      </div>
      </div>
      <div className="inith">
        <button>
          <p>Initiate Help</p>
        </button>
      </div>
   
    </footer>
  );
}

export default Footer;
