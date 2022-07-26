import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KayıtlıUye = () => {

    const [adSoyad, setAdSoyad] = useState("");
    const [telefon, setTelefon] = useState("");
    const [plaka, setPlaka] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
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
       
    }
    const setData = async () =>{
        
        try{
            await AsyncStorage.setItem('AdSoyad',adSoyad);
            await AsyncStorage.setItem('Telefon',telefon);
            await AsyncStorage.setItem('Plaka',plaka);
            await AsyncStorage.setItem('Email',email);
            await AsyncStorage.setItem('Password',password);
            navigation.navigate('KayıtlıUye');
            
        }catch (error) {
            console.log(error);
        }
        
    }

    const removeData = async () => {

        try {
            await AsyncStorage.removeItem('AdSoyad');
            await AsyncStorage.removeItem('Telefon');
            await AsyncStorage.removeItem('Plaka');
            await AsyncStorage.removeItem('Email');
            await AsyncStorage.removeItem('Password');
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