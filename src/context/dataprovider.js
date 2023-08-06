import { createContext, useState } from "react"



export const DataContext = createContext(null) // context banaya 

//ab state banani hai , 
//q ki hame user ki details state me store karni hai 


const DataProvider = ({ children }) => {

    const [account, setAccount] = useState({ username: '', name: '' })

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )

}
export default DataProvider