import React,{useState} from "react";

const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const [adSoyad, setAdSoyad] = useState("");
    const [telefon, setTelefon] = useState("");
    const [plaka, setPlaka] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [id,setId] = useState("")
    const [isLogin,setIsLogin] = useState(false)

    const data = {
        adSoyad,setAdSoyad,
        telefon,setTelefon,
        plaka,setPlaka,
        email,setEmail,
        password,setPassword,
        id,setId,
        isLogin,setIsLogin
    }
    return(
        <AppContext.Provider value = {data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext