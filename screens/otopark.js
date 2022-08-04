import React,{useContext} from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity,FlatList,Button} from 'react-native';
import AppContext from '../context/appContext';
import { useNavigation } from '@react-navigation/native';
import MapView ,{ Marker } from 'react-native-maps'; 
import openMap, { createOpenLink } from 'react-native-open-maps';

const Otopark = () => {

    const {latitude,longitude,carData} = useContext(AppContext)

    const navigation = useNavigation();
    
    const directions=(lat,long)=> {
        createOpenLink({start:{latitude:latitude,longitude:longitude} ,end:{latitude:lat,longitude:long},zoom:0})
    }

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
                <Marker coordinate={{latitude:latitude,longitude:longitude}} title={"Konumum"} description={"Şuan bulundugum yer"} icon={{uri: 'https://img.icons8.com/plasticine/120/000000/user-location.png'}}/>
                {carData.Result.map((marker,index) => (
                    <Marker 
                    key = {index}
                    coordinate={marker.Latlng}
                    title={marker.Ad}
                    description={marker.AltTuru}
                    icon={{uri:"https://img.icons8.com/plasticine/120/000000/marker.png"}}
                    />
                ))}
                </MapView>
                <FlatList  
                data={carData.Result} 
                renderItem={ ({item}) =>(
                    <View style={styles.viewConteiner2}>
                        <Text style={styles.textFlat}> {item.Ad}{"\n"}{"\n"}{item.Adres} {"\n"}{"\n"} {item.Telefon}</Text>
                        <Button onPress={createOpenLink({end:`${item.Lat} ${item.Lng}`,zoom:0})} title="Yol Tarifi"/>
                    </View>
                )} 
                keyExtractor={item=> item.Id}/>
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
        height: '25%',
    },
      textFlat:{
        width:'100%',
        backgroundColor:'#fff',
        alignContent:'center',
        justifyContent:'center',
        fontSize:15,
        textAlign:'center'
    },viewConteiner2:{
        borderBottomWidth:2,
        width:'100%',
    }
});

export default Otopark