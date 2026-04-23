import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import {detect,init} from "../utils/util"


export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef =useRef(null)

  const [expression, setExpression] = useState("Detecting...");

 

  

  useEffect(() => {
    

   
    init({ landmarkerRef, videoRef, streamRef });

    return () => {

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center"}}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button style={{padding:"0.75rem", backgroundColor:"lightseagreen", border:"none" ,color:"white", borderRadius:"0.5rem"}} onClick={()=>{
       detect({landmarkerRef,videoRef,setExpression})
      }}>Detect Expression</button>
    </div>
  );
}