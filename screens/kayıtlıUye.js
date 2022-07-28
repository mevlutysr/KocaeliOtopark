import React,{ useState,useEffect, useContext } from 'react';
import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {db } from '../config/firebase';
import { collection, doc,query,where, onSnapshot,updateDoc} from "firebase/firestore";
import AppContext from '../context/appContext';



const KayıtlıUye = () => {

    
    const { 
        adSoyad,setAdSoyad,
        telefon,setTelefon,
        plaka,setPlaka,
        email,setEmail,
        password,setPassword,
        id,setId,
        setIsLogin
    } = useContext(AppContext)
    
    
    const val = [];
    const navigation = useNavigation();
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
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

    const setData = async () =>{
        
        
        if (adSoyad.length == 0 || email.length == 0 || telefon.length == 0 || plaka.length == 0 || password.length == 0){
            Alert.alert('Lütfen boş alan bırakmayınız!!');
        }
        else{
            try {
                const docRef = doc(db, "users", id);
                await updateDoc(docRef,
                {
                    adSoyad:{adSoyad},
                    telefon:{telefon},
                    plaka:{plaka},
                    email:{email},
                    password:{password}
                });
                Alert.alert("Bilgiler Başarıyla Güncellendi!!");  
            } catch (error) {
                console.log(error);
            }            
        } 
    }

    const removeData = async () => {

        try {
            setIsLogin(false);
            setAdSoyad("");
            setPlaka("");
            setTelefon("");
            setEmail("");
            setPassword("");
            setId("");
            navigation.navigate('Profil');     
        } catch (error) {
            console.log(error);
        }
    }


    return(

        <KeyboardAwareScrollView >
           
            <View style={styles.viewConteiner}>
                <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                style={{width:'65%' , height:'100%' }}/>
                <Image source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}
                style={{width:'20%' , height:90, marginLeft:'10%'}}/> 
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
        marginLeft:'20%',
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