import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, TouchableHighlight, Platform} from "react-native";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setLoader, setLatitude, setLongitude, setEmail } from "../stores/slice";
import * as Location from 'expo-location';
import call from 'react-native-phone-call';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home =()=> {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    
    const control = async () => {

        await AsyncStorage.getItem('isLogin').then((isLogin) => {
            if(isLogin == "true") {
                AsyncStorage.getItem('email').then((value) => {
                    if(value !== null) {
                        dispatch(setEmail(value))
                        navigation.navigate('KayıtlıUye');
                      }else{
                        navigation.navigate('Profil');
                      }
                })   
            }else{
                navigation.navigate('Profil');
            }
        }) 
      }
      
    const getMaps = async () => {
        dispatch(setLoader(true))
        
        let { status } =  await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        let {coords} =  await Location.getCurrentPositionAsync();
        if (coords){
          dispatch(setLatitude(coords.latitude));
          dispatch(setLongitude(coords.longitude));
        }
        
        navigation.navigate("Otopark")  
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
            <Image source={require('../assets/kocaeli.png')}
                   style={{width:'65%' , height:'100%' }}
                   resizeMode="contain"/>
            <TouchableOpacity onPress={ara} style={{width:Platform.OS ==='ios'? '24%':'20%' , height:90, marginLeft:'10%'}}>
                <Image source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}
                   style={{flex:2}}
                   resizeMode="contain"/>
            </TouchableOpacity> 
          </View>
          <>
            <Image source={{uri: 'https://www.kocaeli.bel.tr/webfiles/userfiles/images/haberler/2018/2018_ocak/2018_01_24/%C4%B0zmit%20Kent%20Meydan%C4%B1%20h%C4%B1zla%20ilerliyor%201.jpg'}}
                    style={{width:'100%' , height:'35%',marginTop:'2%',marginBottom:'1%' }}/>
          </>
          <TouchableHighlight style={styles.touchOtopark}  onPress={getMaps}>      
            <View style={styles.row}>
              <Image source={require('../assets/otopark.png')}
                   style={{width:'20%' , height:'60%',marginLeft:'2%'}} resizeMode="contain"/>
                   <View style={{justifyContent: 'center',width:'70%'}}><Text style={styles.textOtopark}>OTOPARKLAR</Text></View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchArac}  onPress={() => navigation.navigate('Arac')}>
            <View style={styles.row}>
              <Image source={require('../assets/arac.png')}
                   style={{width:'23%' , height:'65%'}} resizeMode="contain"/>
              <View style={{justifyContent: 'center',width:'70%'}}><Text style={styles.textArac}>ARACIM NEREYE ÇEKİLDİ ?</Text></View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchProfil}  onPress={control}>
            <View style={styles.row}>
              <Image source={require('../assets/profil.png')}
                   style={{width:'18%' , height:'65%',marginLeft:'2%'}} resizeMode="contain"/>
              <View style={{justifyContent: 'center',width:'70%'}}><Text style={styles.textProfil}>PROFİLİM</Text></View>
            </View>
          </TouchableHighlight  >

          <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    viewConteiner: {
      marginTop: Platform.OS ==='ios' ? '7%' : '2%',
      marginLeft:'5%',
      flexDirection:'row',
    },
    row: {
      flexDirection:'row',
      width:'100%',
      textAlign: 'center',
      alignItems: 'center',
    },
    touchOtopark: {
      flex:2,
      backgroundColor:'#0095FF',
      width:'100%',
      height:'10%',
      marginBottom:'1%',
      flexDirection:'row',
    },
    touchArac: {
      flex:2,
      backgroundColor:'#008000',
      width:'100%',
      height:'10%',
      marginBottom:'1%',
      flexDirection:'row',
    },
    touchProfil: {
      flex:2,
      backgroundColor:'#FFA500',
      width:'100%',
      height:'10%',
      marginBottom:'1%',
      flexDirection:'row',
    },
    textOtopark:{
      textAlign:'center',
      textAlignVertical:'center',
      fontSize: 20,
      color:'#fff',
    },
    textArac:{
      textAlign:'center',
      textAlignVertical:'center',
      fontSize: 20,
      color:'#fff',
    },
    textProfil:{
      textAlign:'center',
      textAlignVertical:'center',
      fontSize: 20,
      color:'#fff',
    },
  });
export default Home