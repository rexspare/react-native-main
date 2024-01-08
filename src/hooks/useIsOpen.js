import { useState } from "react";


export const useIsOpen = (initialVal = false) => {
    const [isOpen, setIsOpen] = useState(initialVal);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);

    return {
        isOpen, 
        open,
        close, 
        toggle,
        setIsOpen
    }
}