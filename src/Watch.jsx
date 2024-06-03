import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function Watch() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await invoke("read_videos");
                setVideos(data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {videos.map((video, index) => (
                <video key={index} controls>
                    <source src={`data:video/mp4;base64,${video.data}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}
        </div>
    );
}

export default Watch;
