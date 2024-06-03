import { useState } from "react";
import "./App.css";
function Appheader({onItemClick}){
    const [uploadId,setUploadId] = useState("");
    const [welcomeId,setWelcomeId] = useState("selected");
    const [watchId,setWatchId]= useState("");
    const welcome = ()=>{
        onItemClick("welcome")
        setWatchId("");
        setUploadId("");
        setWelcomeId("selected");
    }
    const upload = ()=>{
        onItemClick("upload")
        setWatchId("");
        setUploadId("selected");
        setWelcomeId("");
    }
    const watch = ()=>{
        onItemClick("watch")
        setWatchId("selected");
        setUploadId("");
        setWelcomeId("");
    }
    return (
        <div className="nav">
            <div className="navbar">
                <div className="item" onClick={welcome} id={welcomeId}>
                    <h1>الترحيب</h1>
                </div>
                <div className="item" onClick={upload}  id={uploadId}>
                    <h1>رفع</h1>
                </div>
                <div className="item" onClick={watch} id={watchId}>
                    <h1>شاهد</h1>
                </div>
            </div>
        </div>
    )
}
export default Appheader;