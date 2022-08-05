import React,{useContext, useEffect} from "react";
import { View ,StyleSheet,TouchableOpacity,Image, Alert,Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppContext from "../context/appContext";
import { createOpenLink } from 'react-native-open-maps';
import { SliderBox } from "react-native-image-slider-box";
import call from 'react-native-phone-call'

const  Plaka = () => {
    const {car,setLoader,setLoader1,loader1} = useContext(AppContext)
    const navigation = useNavigation();
    
    useEffect(()=> {
        const empty =()=> {
            if(car.Result == undefined){
                setLoader(false)
                navigation.navigate("Arac")
                Alert.alert("Plakaya ait kayıt bulunamadı.")
            }else{
                setLoader(false)
                setLoader1(false)
            }
        }
        
        empty();

    },[])

    const otoparkAra =()=>{
        const args = {
            number:`${car.Result.Telefon}`, 
            prompt: true,
            skipCanOpen: true
        }
        call(args).catch(console.error)
    }
    const ara =()=>{
        const args = {
            number:`${153}`, 
            prompt: true,
            skipCanOpen: true
        }
        call(args).catch(console.error)
    }

    return(
        <View style={styles.container}>
            <View style={styles.viewConteiner}>
                <TouchableOpacity style={{width:'8%' , height:'100%',marginTop:'2%'}}  onPress={() => navigation.navigate('Home')}>
                    <Image style={{flex:2}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                </TouchableOpacity>
                <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                    style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
                <TouchableOpacity onPress={ara} style={{width:'20%' , height:90, marginLeft:'5%'}}>
                    <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.textGiris}>ARACIN ÇEKİLDİĞİ OTOPARK BİLGİLERİ</Text>
                <Text style={styles.baslikText2}>ÇEKİLDİĞİ OTOPARK</Text>
                <View style={styles.inputView}><Text style={styles.text}>{loader1?<></>:car.Result.OtoparkAdi}</Text></View>
                <Text style={styles.baslikText}>İŞLEM TARİHİ</Text>
                <View style={styles.inputView}><Text style={styles.text}>{loader1?<></>:car.Result.IslemTarihiStr}</Text></View>
                <Text style={styles.baslikText}>ARAÇ PLAKASI</Text>
                <View style={styles.inputView}><Text style={styles.text}>{loader1?<></>:car.Result.PlakaNo}</Text></View>
                <Text style={styles.baslikText}>OTOPARK TELEFONU</Text>
                <TouchableOpacity onPress={otoparkAra} style={styles.inputView}><Text style={styles.text} >{loader1?<></>:car.Result.Telefon}</Text></TouchableOpacity>
                <TouchableOpacity style={{width:50 , height:50, marginLeft:'45%',marginTop:5}} onPress={createOpenLink({end:`${loader1?<></>:car.Result.Latitude} ${loader1?<></>:car.Result.Longitude}`,zoom:0})} >
                    <Image style={{flex:2}}source={require('../assets/mavi.png') } />
                </TouchableOpacity>
                <View style={styles.slider}>
                    <SliderBox
                    style={{marginTop:7,height:250}} 
                    images={loader1?<></>:car.Result.Resimler}

                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewConteiner: {
        marginTop:'2%',
        marginLeft:'2%',
        flexDirection:'row',
    },
    inputView: {
        backgroundColor: "#0095FF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginTop:'2%',
        marginLeft:'15%',
        alignItems: "center",
    },
    baslikText:{
        marginTop:'2%',
        marginLeft:'17%',
        fontSize:15,
        color:'#0085FF',
        fontWeight:'bold',
    },
    baslikText2:{
        marginTop:'4%',
        marginLeft:'17%',
        fontSize:15,
        color:'#0085FF',
        fontWeight:'bold',
    },
    text:{
        width:'100%',
        color:'#fff',
        marginTop:'3%',
        textAlign:'center',
        fontSize:14,
    },
    textGiris: {
        textAlign:'center',
        textShadowColor:'#00FF00',
        fontSize:23,
        color:'#0085FF',
        marginTop:'3%',
        fontWeight:'bold',
    },
    slider:{
        width:'100%',
        height:'100%',
    }
})
export default Plaka