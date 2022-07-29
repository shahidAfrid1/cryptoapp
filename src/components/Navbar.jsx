import React, { useState, useEffect } from "react";
import { Avatar, Menu, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FundOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import cryptoLogo from "../images/cryptocurrency.png";

const Navbar = () => {


  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)

  
  useEffect(()=>{
    if(screenSize < 768){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  },[screenSize])
  useEffect(()=>{
    const handleSize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleSize)
    setActiveMenu(true)
  },[])

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to={"/"}>Home</Link>,
    },
    {
      key: "cryptocurrencies",
      icon: <FundOutlined />,
      label: <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>,
    },
    {
      key: "news",
      icon: <BulbOutlined />,
      label: <Link to={"/news"}>News</Link>,
    },
  ];

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <Avatar src={cryptoLogo} size={40} className="logo-img" />
          <Typography.Title level={4} className="logo-title">
            CryptoCoins
          </Typography.Title>
          <Button className="menu-btn" onClick={()=>setActiveMenu(!activeMenu)}><MenuOutlined/></Button>
        </div>
      </div>
      <div>
        {activeMenu && (<Menu
          theme="dark"
          className="menu-bar"
          items={menuItems}
          defaultSelectedKeys={"home"}
        />)}
      </div>
    </>
  );
};

export default Navbar;
