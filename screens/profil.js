import React,{useState} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profil = () => {

    const navigation = useNavigation();

    const [connect, setConnect] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const control = () =>{
        try{
            if (AsyncStorage.getItem('Email') != email ){
                Alert.alert('Lütfen bilgilerinizi doğru girdiğinizden emin olunuz.')
            }else if (AsyncStorage.getItem('Password') != password){
                Alert.alert('Lütfen bilgilerinizi doğru girdiğinizden emin olunuz.')
            }else{
                setConnect(true);
                navigation.navigate('Home');
            }

            

        }catch (error){
            console.log(error);
        }
        
    }

    return(
        <View>
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
                placeholderTextColor="#fff"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} 
                placeholder="Password" 
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.unutBtn}>Şifremi Unuttum?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.girisBtn} onPress={control}>
                <Text style={styles.textBtn}>GİRİŞ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uyeBtn} onPress={() => navigation.navigate('Uye')}>
                <Text style={styles.textBtn}>ÜYE OL</Text>
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
        textAlign:'center',
        color:'#fff',
        fontSize:15,
    },    
});

export default Profil