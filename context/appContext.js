import React,{useState} from "react";

const AppContext = React.createContext()


export const AppProvider = ({children}) => {

    const [adSoyad, setAdSoyad] = useState("");
    const [telefon, setTelefon] = useState("");
    const [plaka, setPlaka] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [id,setId] = useState("")
    const [latitude,setLatitude] = useState("")
    const [longitude,setLongitude] = useState("")
    const [carData,setCarData] = useState("")
    const [car,setCar] = useState("")
    const [loader,setLoader] = useState(false)
    const [loader1,setLoader1] = useState(true)
    const [isLogin,setIsLogin] = useState("")


    const data = {
        adSoyad,setAdSoyad,
        telefon,setTelefon,
        plaka,setPlaka,
        email,setEmail,
        password,setPassword,
        id,setId,
        loader,setLoader,
        longitude,setLongitude,
        latitude,setLatitude,
        carData,setCarData,
        car,setCar,
        loader1,setLoader1,
        isLogin,setIsLogin
    }

    return(
        <AppContext.Provider value = {data}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext