import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Appheader from "./Appheader"
import Welcome from "./Welcome";
import "./App.css";
import Upload from "./upload";
import Watch from "./Watch";

function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); 
  const handleMenuItem = (pageName)=>{
    setCurrentPage(pageName);
  }
  const render = ()=>{
    switch (currentPage){
      case "welcome":
        return <Welcome/>
      case "upload":
        return <Upload/>
      case "watch":
        return <Watch/>
      default:
        return currentPage
    }
  }
  return (
    <div>
      <Appheader onItemClick={handleMenuItem}/>
      <div>
        {render()}
      </div>
    </div>
  );
}

export default App;
