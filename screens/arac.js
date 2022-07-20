import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';


const Arac = () => {

    return(
    <View style={styles.viewConteiner}>
        <Image source={{uri: 'https://www.ormanya.com/themes/ormanya/images/kocaeli-bel-logo.png'}}
            style={{width:'65%' , height:'100%' }}/>
        <Image source={{uri: 'https://play-lh.googleusercontent.com/CJyMD0C3z9xFI7CgA7WEgqSgWYtevvXUjlUDOyKU5uFKDcxF77oCgHWeibMyvw0V'}}
            style={{width:'20%' , height:90, marginLeft:'10%'}}/> 
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
});

export default Arac