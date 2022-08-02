import React,{useContext} from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import AppContext from '../context/appContext';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps'; 
import MapView from 'react-native-maps'; 


const Otopark = () => {

    const {latitude,longitude} = useContext(AppContext)

    const navigation = useNavigation();

    return(
        
        <View style={styles.container}>
            <View style={styles.viewConteiner}>
                <TouchableOpacity style={{width:'8%' , height:'100%',marginTop:'2%'}}  onPress={() => navigation.navigate('Home')}>
                    <Image style={{flex:2}} source={{uri: 'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                </TouchableOpacity>
                <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
                    style={{width:'62%' , height:'100%',marginLeft:'2%'}}/>
                
                <TouchableOpacity style={{width:'20%' , height:90, marginLeft:'5%'}}>
                    <Image style={{flex:2}} source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}/> 
                </TouchableOpacity>
            </View>
            <View>
                <MapView style={styles.map} initialRegion={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0121,
                }}>
                <Marker 
                    coordinate={{latitude:Number(latitude), longitude: Number(longitude)}}
                    title={"Konumum"}
                    description={"Şuan Bulunduğum Yer"}>
                </Marker>
          </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewConteiner: {
        marginTop:'2%',
        marginLeft:'2%',
        flexDirection:'row',
    },
    map: {
        marginTop:'5%',
        width: '100%',
        height: '65%',
      },
});

export default Otopark