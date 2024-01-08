import { useEffect } from 'react';
import { Keyboard, } from 'react-native';


export const useKeyboardEffect = ({ onIsOpen, onIsClosed }) => {

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", onIsOpen);
        const hideSubscription = Keyboard.addListener("keyboardDidHide", onIsClosed);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

}
