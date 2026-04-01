import { useEffect, useState } from "react";

function useWindowSize() {
    let [windowSize, setWindowStyle] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleWindowResize() {
            setWindowStyle({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        //add resize event to window
        window.addEventListener("resize", handleWindowResize);

        return () => {
            //remove resize event from window
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return windowSize;
}

export default useWindowSize;
