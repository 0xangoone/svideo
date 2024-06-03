import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import {message , open} from "@tauri-apps/api/dialog"
function Upload(){
    const [videoName,setVideoName] = useState("");
    let vid_path = "";
    const upload= async()=>{
        if (vid_path == ""){
            await message("اختر مسار الفيديو لو سمحت")
        }if(videoName == ""){
            await message("اكتب اسما للفيديو")
        }else if(vid_path != ""){
            await invoke("upload_video",{
                title:videoName,
                path:vid_path
            })
            //the uploading using back-end

        }
    }
    const choose_path=async()=>{
        let selected = await open();
        if((!Array.isArray(selected)) && selected){
            vid_path = selected;
        }else{
            message("اختر ملفا صحيحا لو سمحت")
        }
    }
    const change_video_name = async(event)=>{
        setVideoName(event.target.value);
    }
    return (
        <div className="center">
            <h1>اسم الفيديو</h1>
            <input onChange={change_video_name}/><br/><br/>
            <button onClick={choose_path}>اختيار من ملفات الجهاز المحلية</button><br/><br/>
            <button onClick={upload}>رفع</button>
        </div>
    )
}
export default Upload;