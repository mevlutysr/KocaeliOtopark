import React,{useState} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,KeyboardAvoidingView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const KayıtlıUye = () => {

    const [adSoyad, setAdSoyad] = useState("");
    const [telefon, setTelefon] = useState("");
    const [plaka, setPlaka] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigation = useNavigation();

    const setData = async () =>{
        
        try{
            AsyncStorage.getItem('AdSoyad')
            .then(value => {if (value != null){setAdSoyad(value)}})
            AsyncStorage.getItem('Telefon')
            .then(value => {if (value != null){setTelefon(value)}})
            AsyncStorage.getItem('Plaka')
            .then(value => {if (value != null){setPlaka(value)}})
            AsyncStorage.getItem('Email')
            .then(value => {if (value != null){setEmail(value)}})
            AsyncStorage.getItem('Password')
            .then(value => {if (value != null){setPassword(value)}})
        }catch (error) {
            console.log(error);
        }
        
    }

    return(

        <KeyboardAvoidingView behavior='position'>
        <View>   
            <View style={styles.viewConteiner}>
                <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                style={{width:'65%' , height:'100%' }}/>
                <Image source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}
                style={{width:'20%' , height:90, marginLeft:'10%'}}/> 
            </View>
            <>
                <Text style={styles.textGiris}>Profilim</Text>
            </>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder={adSoyad}
                placeholderTextColor="#fff"
                onChangeText={(adSoyad) => setAdSoyad(adSoyad)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder={telefon}
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={11}
                onChangeText={(telefon) => setTelefon(telefon)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder={plaka} 
                placeholderTextColor="#fff"
                maxLength={10}
                onChangeText={(plaka) => setPlaka(plaka)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder={email} 
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder={password}
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>        
            <TouchableOpacity style={styles.kayıtBtn} onPress={setData}>
                <Text style={styles.textBtn}>GÜNCELLE</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },  
        viewConteiner: {
        marginTop:'10%',
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

export default KayıtlıUye