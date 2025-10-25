import { createContext, useState } from "react";

export const ToggleContext = createContext(null)

export const ContextProvider = (props) => {

    const [isToggle, setIsToggle] = useState(true);
    return (
        <ToggleContext.Provider value={{ isToggle, setIsToggle }}>
            {props.children}
        </ToggleContext.Provider>
    )
}