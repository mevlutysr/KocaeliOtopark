import React,{ useEffect, useContext } from 'react';
import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../config/firebase';
import { collection, doc,query,where, onSnapshot,updateDoc} from "firebase/firestore";
import AppContext from '../context/appContext';
import { signOut, updatePassword, updateEmail} from 'firebase/auth';
import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';

const KayıtlıUye = () => {

    
    const { 
        adSoyad,setAdSoyad,
        telefon,setTelefon,
        plaka,setPlaka,
        email,setEmail,
        password,setPassword,
        id,setId,
        setLoader,setIsLogin
    } = useContext(AppContext)
    
    
    const val = [];
    const navigation = useNavigation();
    
    useEffect(() => {
        const getData = async () => {
            const docRef =  collection(db, "users");
            const q = query(docRef,where("email", "==", {email}));
        
            onSnapshot(q,(doc)=>{ 
                doc.docs.forEach((doc)=> {
                    val.push({ ...doc.data()});
                })
                doc.docs.map((doc)=> {
                    setId(doc.id)
                })  
                val.map(todo =>{
                  setAdSoyad(todo.adSoyad.adSoyad)
                  setTelefon(todo.telefon.telefon)
                  setPlaka(todo.plaka.plaka)
                  setEmail(todo.email.email)
                  setPassword(todo.password.password)
                })
            })
        }

        getData();
    }, []);

    const processAuthError = (authError) => {
        if(authError.includes('network-request-failed')) {
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
        }
        else{
            try {
                const user = auth.currentUser
                await updateEmail(user,email)
                await updatePassword(user,password)
                const docRef = doc(db, "users", id);
                await updateDoc(docRef,
                {
                    adSoyad:{adSoyad},
                    telefon:{telefon},
                    plaka:{plaka},
                    email:{email},
                    password:{password}
                });
                setLoader(false);
                Alert.alert("Bilgiler Başarıyla Güncellendi!!");
                getData(); 
            } catch (error) {
                const errorCode = error.code
                processAuthError(errorCode)
                setLoader(false)
                console.log(errorCode)
            }            
        } 
    }

    const removeData = async () => {

        try {
            await AsyncStorage.setItem('isLogin', "false")
            setIsLogin("");
            setAdSoyad("");
            setPlaka("");
            setTelefon("");
            setEmail("");
            setPassword("");
            setId("");
            signOut(auth);
            navigation.navigate('Profil');     
        } catch (error) {
            console.log(error);
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

        <KeyboardAwareScrollView style={styles.container}>
           
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
            <>
                <Text style={styles.textGiris}>Profilim</Text>
            </>
            <Text style={styles.textBaslik}>AD SOYAD</Text>
            <View style={styles.inputView}>
                
                <TextInput style={styles.textInput} 
                placeholder='AdSoyad'
                value={adSoyad}
                placeholderTextColor="#fff"
                onChangeText={(adSoyad) => setAdSoyad(adSoyad)}
                />
            </View>
            <Text style={styles.textBaslik}>TELEFON</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder='Telefon'
                value={telefon}
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={11}
                onChangeText={(telefon) => setTelefon(telefon)}
                />
            </View>
            <Text style={styles.textBaslik}>PLAKA</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder='Plaka'
                value={plaka} 
                placeholderTextColor="#fff"
                maxLength={10}
                onChangeText={(plaka) => setPlaka(plaka)}
                />
            </View>
            <Text style={styles.textBaslik}>E-MAİL</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder='Email'
                value={email}
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <Text style={styles.textBaslik}>ŞİFRE</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder='Sifre'
                value={password}
                placeholderTextColor="#fff"
                onChangeText={(password) => setPassword(password)}
                />
            </View>        
            <TouchableOpacity style={styles.kayıtBtn} onPress={setData}>
                <Text style={styles.textBtn}>GÜNCELLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeBtn} onPress={removeData}>
                <Text style={styles.textBtn}>ÇIKIŞ</Text>
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
        marginTop:'3%',
        marginLeft:'15%',
        alignItems: "center",
    },
    textGiris: {
        textAlign:'center',
        textShadowColor:'#00FF00',
        fontSize:23,
        color:'#0085FF',
        marginTop:'10%',
        fontWeight:'bold',
    },
    textBaslik: {
        marginTop:'3%',
        marginLeft:'17%',
        fontSize:15,
        color:'#0085FF',
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
        marginTop: '10%',
        backgroundColor: "#008000",
    },
    removeBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:'10%',
        marginTop:'5%',
        backgroundColor: "#DB2B30",
    },
});

export default KayıtlıUye