import { useEffect, useRef } from "react";

export function useCloseModal(close, listenCapturing=true) {
    console.log("listenCapturing",listenCapturing);
  
    const ref = useRef();
    useEffect(function () {
        function handleClick(e) {
          if(ref.current && !ref.current.contains(e.target)){
            close();
          }
        }
        document.addEventListener("click",handleClick, listenCapturing);
    
        return ()=> document.removeEventListener("click", handleClick, listenCapturing);
    
    },[close, listenCapturing]);

    return ref;

}