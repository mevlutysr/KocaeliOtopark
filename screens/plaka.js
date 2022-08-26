import React, { useState, useEffect } from "react";
import { View ,StyleSheet,TouchableOpacity,Image, Alert,Text, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createOpenLink } from 'react-native-open-maps';
import call from 'react-native-phone-call';
import Imag from "../imag";
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from "../stores/slice";

const Plaka =()=> {

    const carData = useSelector((state) => state.Slice.CarData)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [control,setControl] = useState(true);

    useEffect(()=>{

        const empty =()=> {
            if(carData.Result == undefined){
                dispatch(setLoader(false))
                navigation.navigate("Arac")
                Alert.alert("Plakaya ait kayıt bulunamadı.")
            }else{
                dispatch(setLoader(false))
                setControl(false)
            }
        }
        
        empty();
    },[])

    const otoparkAra =()=>{
        if(carData.Result.Telefon.lenght > 0){
            const args = {
                number:`${carData.Result.Telefon}`, 
                prompt: true,
                skipCanOpen: true
            }
            call(args).catch(console.error)
        }
        else{
            Alert.alert("Telefon numarası bulunamadı.")
        }
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
                <Image source={require('../assets/kocaeli.png')}
                    style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
                <TouchableOpacity onPress={ara} style={{width:Platform.OS === 'ios' ? '21%' : '20%' , height:90, marginLeft:'5%'}}>
                    <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
                </TouchableOpacity>
            </View>
            <ScrollView scrollEventThrottle={0}>
            <View>
                <Text style={styles.textGiris}>ARACIN ÇEKİLDİĞİ OTOPARK BİLGİLERİ</Text>
                <Text style={styles.baslikText2}>ÇEKİLDİĞİ OTOPARK</Text>
                <View style={styles.inputView}><Text style={styles.text}>{control ? <></> : carData.Result.OtoparkAdi}</Text></View>
                <Text style={styles.baslikText}>İŞLEM TARİHİ</Text>
                <View style={styles.inputView}><Text style={styles.text}>{control ? <></> : carData.Result.IslemTarihiStr}</Text></View>
                <Text style={styles.baslikText}>ARAÇ PLAKASI</Text>
                <View style={styles.inputView}><Text style={styles.text}>{control ? <></> : carData.Result.PlakaNo}</Text></View>
                <Text style={styles.baslikText}>OTOPARK TELEFONU</Text>
                <TouchableOpacity onPress={otoparkAra} style={styles.inputView}><Text style={styles.text} >{control ? <></> : carData.Result.Telefon}</Text></TouchableOpacity>
                <TouchableOpacity style={{width:50 , height:50, marginLeft:'45%',marginTop:5}} 
                    onPress={ () => {if(carData.Result.Latitude != null) {
                    createOpenLink({end:`${control ? <></> : carData.Result.Latitude} ${control ? <></> : carData.Result.Longitude}`,zoom:0})
                    }else{Alert.alert("Konum Bilgisi Bulunamadı.")}
                    }}>
                    <Image style={{flex:2}}source={require('../assets/mavi.png') } />
                </TouchableOpacity>
                <View style={styles.slider}>
                {control ? <></> : <Imag />}
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewConteiner: {
        marginTop: Platform.OS === 'ios' ? '7%' : '2%',
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