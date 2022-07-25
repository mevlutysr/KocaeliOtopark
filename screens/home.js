import React from 'react';
import { StyleSheet, Text, View,Image,TouchableHighlight,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

  const navigation = useNavigation();

  const control = () => {
    //AsyncStorage.getItem('AdSoyad')
    //.then(value => {if (value != null){(navigation.navigate('KayıtlıUye'))}else{navigation.navigate('Profil')}})
    navigation.navigate('Profil');
}  
  return (
    <View style={styles.container}>
      <View style={styles.viewConteiner}>
      <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
             style={{width:'65%' , height:'100%' }}/>
      <Image source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}
             style={{width:'20%' , height:90, marginLeft:'10%'}}/> 
      </View>
      <>
      <Image source={{uri: 'https://www.kocaeli.bel.tr/webfiles/userfiles/images/haberler/2018/2018_ocak/2018_01_24/%C4%B0zmit%20Kent%20Meydan%C4%B1%20h%C4%B1zla%20ilerliyor%201.jpg'}}
             style={{width:'100%' , height:'40%',marginTop:'2%',marginBottom:'1%' }}/>
      </>
      <TouchableHighlight style={styles.touchOtopark}  onPress={() => navigation.navigate('Otopark')}>      
      <View style={styles.row}>
        <Image source={{uri: 'https://bursaelektronet.com/wp-content/uploads/2018/02/497_1.png'}}
             style={{width:'45%' , height:'70%',marginTop:'3%', }}/>
             <Text style={styles.textOtopark}>OTOPARKLAR</Text>
      </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchArac}  onPress={() => navigation.navigate('Arac')}>
      <View style={styles.row}>
        <Image source={{uri: 'https://freepngclipart.com/thumb/tow_truck/9292-tow-truck-the-hd-photos-thumb.png'}}
             style={{width:'20%' , height:'70%',marginTop:'3%', marginLeft:'4%'}}/>
        <Text style={styles.textArac}>ARACIM NEREYE ÇEKİLDİ ?</Text>
      </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchProfil}  onPress={control}>
      <View style={styles.row}>
        <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/16/16363.png'}}
             style={{width:'20%' , height:'70%',marginTop:'5%', marginLeft:'8%'}}/>
        <Text style={styles.textProfil}>PROFİLİM</Text>
      </View>
      </TouchableHighlight>

      <StatusBar style="auto" />
    </View>
  );
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
  row: {
    flexDirection:'row',
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
    fontSize:20,
    color:'#fff',
    marginBottom:'2%',
    marginLeft:'1%',
  },
  textArac:{
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:20,
    color:'#fff',
    marginLeft:'6%',
    marginBottom:'2%'
  },
  textProfil:{
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:20,
    color:'#fff',
    marginLeft:'25%',
    marginBottom:'2%',
  },
});

export default Home