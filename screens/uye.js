import React,{useContext} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { db,auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc,doc } from "firebase/firestore";
import AppContext from '../context/appContext';
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Uye = () => {

    const {
        adSoyad,setAdSoyad,
        telefon,setTelefon,
        plaka,setPlaka,
        email,setEmail,
        password,setPassword,
        setLoader,setIsLogin,
    } = useContext(AppContext);

    const navigation = useNavigation();

    const processAuthError = (authError) => {
        if(authError.includes('user-not-found')) {
            Alert.alert('Yanlış Email')
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

    const setData = async () =>{
        setLoader(true)
        if (adSoyad.length == 0 || email.length == 0 || telefon.length == 0 || plaka.length == 0 || password.length == 0){
            setLoader(false)
            Alert.alert('Lütfen boş alan bırakmayınız!!');
        }else{
            
            try {

                await createUserWithEmailAndPassword(auth, email, password)
                const docRef = collection(db, "users")

                await setDoc(doc(docRef),{
                    adSoyad:{adSoyad},
                    telefon:{telefon},
                    plaka:{plaka},
                    email:{email},
                    password:{password}
                });
                await AsyncStorage.setItem('isLogin', "true")
                await AsyncStorage.setItem('email', email)
                setIsLogin("true");
                setLoader(false);
                Alert.alert("İşlem Başarılı!!");
                navigation.navigate('KayıtlıUye');
            } catch (error) {
                const errorCode = error.code
                processAuthError(errorCode)
                setLoader(false)
            }
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

        <KeyboardAwareScrollView  style={styles.container}>       
            <View style={styles.viewConteiner}>
                <TouchableOpacity style={{width:'8%' , height:'100%',marginTop:'2%'}}  onPress={() => navigation.navigate('Profil')}>
                    <Image style={{flex:2}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                </TouchableOpacity>
                <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                    style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
                
                <TouchableOpacity onPress={ara} style={{width:'20%' , height:90, marginLeft:'5%'}}>
                    <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
                </TouchableOpacity>
            </View>
            <>
                <Text style={styles.textGiris}>ÜYE OL</Text>
            </>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Ad Soyad" 
                placeholderTextColor="#fff"
                onChangeText={(adSoyad) => setAdSoyad(adSoyad)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Telefon" 
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={11}
                onChangeText={(telefon) => setTelefon(telefon)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Plaka" 
                placeholderTextColor="#fff"
                maxLength={10}
                onChangeText={(plaka) => setPlaka(plaka)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="E-mail" 
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Sifre"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>        
            <TouchableOpacity style={styles.kayıtBtn} onPress={setData}>
                <Text style={styles.textBtn}>KAYIT OL</Text>
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
        marginTop:'2%',
        marginLeft:'5%',
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
        marginTop:'15%',
        fontWeight:'bold',
    },
    textInput:{
        width:'100%',
        color:'#fff',
        marginTop:'2%',
        textAlign:'center',
        fontSize:14,
    },
    textBtn: {
        textAlign:'center',
        color:'#fff',
        fontSize:15,
    },
    kayıtBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:'10%',
        marginTop: '17%',
        backgroundColor: "#008000",
    },
});

export default Uye