import React,{useContext} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,TextInput} from 'react-native';
import AppContext from '../context/appContext';
import { useNavigation } from '@react-navigation/native';
const Arac = () => {

    const {plaka,setPlaka} = useContext(AppContext)
    const navigation = useNavigation();
    
    return(
    <View>
        <View style={styles.viewConteiner}>
            <TouchableOpacity style={{width:'8%' , height:'100%',marginTop:'2%'}}  onPress={() => navigation.navigate('Home')}>
                <Image style={{flex:2}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
            </TouchableOpacity>
            <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
            
            <TouchableOpacity style={{width:'20%' , height:90, marginLeft:'5%'}}>
                <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
            </TouchableOpacity>
        </View>
        <>
            <Text style={styles.textGiris}>ÇEKİLEN ARAÇ SORGULAMA</Text>
        </>
        <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="PLAKANIZI GİRİNİZ"
                value={plaka}
                placeholderTextColor="#fff"
                onChangeText={(plaka) => setPlaka(plaka)}
                maxLength={10}
                />
            </View>
        <TouchableOpacity style={styles.sorgulaBtn}>
            <Text style={styles.textBtn}>SORGULA</Text>
         </TouchableOpacity>
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
        marginLeft:'5%',
        flexDirection:'row',
    },
    inputView: {
        backgroundColor: "#0095FF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginTop:'20%',
        marginLeft:'15%',
        alignItems: "center",
    },
    textGiris: {
        textAlign:'center',
        textShadowColor:'#00FF00',
        fontSize:23,
        color:'#0085FF',
        marginTop:'24%',
        fontWeight:'bold',
    },
    textInput:{
        width:'100%',
        color:'#fff',
        marginTop:'2%',
        textAlign:'center',
        fontSize:15,
    },
    sorgulaBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:'10%',
        marginTop: '20%',
        backgroundColor: "#008000",
    },
    textBtn: {
        textAlign:'center',
        color:'#fff',
        fontSize:15,
        marginBottom:'1%',
    },
});

export default Arac