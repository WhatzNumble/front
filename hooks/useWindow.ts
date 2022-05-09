import { useEffect, useState } from "react";

const useWindow = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(()=> setHasWindow(true), []);

    return hasWindow;
};

export default useWindow;
