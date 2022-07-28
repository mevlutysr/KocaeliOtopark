import React,{useContext, useEffect} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity, TextInput, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db } from '../config/firebase';
import { where , query, collection,onSnapshot } from 'firebase/firestore';
import AppContext from '../context/appContext';

const Profil = () => {

    const {
        email,setEmail,
        password,setPassword,
        setIsLogin,setId,id
    } = useContext(AppContext)
    const navigation = useNavigation();

    const get = () => {
        const docRef =  collection(db, "users");
        const q = query(docRef,where("email", "==", {email}),where("password", "==", {password}));
            
        onSnapshot(q,(doc)=>{ 
          doc.docs.map((doc)=> {
            setId(doc.id)
            })  
        })
    }

    const control = () => { 
        if((password.length == 0 || email.length == 0)){
            
            Alert.alert('Lütfen boş alan bırakmayınız!!');
        
        }else{
            
            get();
            const len = id.length
            console.log(len)
            if(len == 0){
                Alert.alert("Lütfen doğru bilgi girdiğinizden emin olun!!");
            }else{
                setIsLogin(true);
                navigation.navigate("KayıtlıUye");
            }
        
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
                <Text style={styles.textGiris}>GİRİŞ</Text>
            </>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="E-mail"
                value={email}
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Password" 
                value={password}
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.unutBtn}>Şifremi Unuttum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.girisBtn} >
                <Text style={styles.textBtn} onPress={control}>GİRİŞ</Text>
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
      marginTop:'24%',
      fontWeight:'bold',
    },
    textInput:{
        width:'100%',
        color:'#fff',
        marginTop:'2%',
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