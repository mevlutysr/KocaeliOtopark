import React,{useContext} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader, setPassword, setEmail } from "../stores/slice";

const Profil = () => {

    const email = useSelector((state) => state.Slice.Email)
    const password = useSelector((state) => state.Slice.Password)
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const processAuthError = (authError) => {
        if(authError.includes('user-not-found')) {
            Alert.alert('Kullanıcı bulunamadı')
        } else if(authError.includes('wrong-password')) {
            Alert.alert('Yanlış şifre')
        } else if(authError.includes('email-already-in-use')) {
            Alert.alert("Lütfen Başka Bir E-posta adresi giriniz")
        } else if(authError.includes('network-request-failed')) {
            Alert.alert('İnternet bağlantınızı kontrol ediniz.')
        }else{
          Alert.alert("Lütfen doğru bilgileri girdiğinizden emin olunuz")
        }
      }

    const control = async () => { 
    
    try {
        setLoader(true);
        await signInWithEmailAndPassword(auth, email, password)
        await AsyncStorage.setItem('isLogin', "true")
        await AsyncStorage.setItem('email', email)
        dispatch(setLoader(false))
        setTimeout(()=> {
        navigation.navigate('KayıtlıUye')
        },350)
    }catch (error) {
        const errorCode = error.code
        processAuthError(errorCode)
        dispatch(setLoader(false))
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
        <KeyboardAwareScrollView style={styles.container} >
            <View style={styles.viewConteiner}>
                <TouchableOpacity style={{width:'8%' , height:'100%',marginTop:'2%'}}  onPress={() => navigation.navigate('Home')}>
                    <Image style={{flex:2}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                </TouchableOpacity>
                <Image source={require('../assets/kocaeli.png')}
                    style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
                
                <TouchableOpacity  onPress={ara} style={{width: Platform.OS === 'ios' ? '21%' : '20%' , height:90, marginLeft:'5%'}}>
                    <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
                </TouchableOpacity>
            </View>
            <>
                <Text style={styles.textGiris}>GİRİŞ</Text>
            </>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="E-mail"
                value={email}
                placeholderTextColor="#fff"
                onChangeText={(email) => dispatch(setEmail(email))}
                />
            </View>
            <View style={styles.inputView}>
            <TextInput style={styles.textInput} 
                placeholder='Sifre'
                value={password}
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(password) => dispatch(setPassword(password))}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.unutBtn}>Şifremi Unuttum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.girisBtn} onPress={control}>
                <Text style={styles.textBtn} >GİRİŞ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uyeBtn} onPress={() => navigation.navigate('Uye')}>
                <Text style={styles.textBtn}>ÜYE OL</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView> 
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
        marginTop:'10%',
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
        marginTop: Platform.OS === 'ios' ? '4%' : '2%',
        textAlign:'center',
        fontSize:14,
    },
    unutBtn: {
        marginLeft:'35%',
        marginTop:'5%',
    },
    girisBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:'10%',
        marginTop: '17%',
        backgroundColor: "#008000",
    },
    uyeBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:'10%',
        marginTop: '7%',
        backgroundColor: "#008000",
    },
    textBtn: {
        width:'100%',
        textAlign:'center',
        color:'#fff',
        fontSize:15,
    },    
});

export default Profil