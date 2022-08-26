import React , {useState} from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text,View } from "react-native";
import { useSelector } from 'react-redux';

const Imag =()=> {
    
    const [imgActive, setImgActive] = useState(0);
    const carData = useSelector((state) => state.Slice.CarData)

    return(
        <SafeAreaView style={styles.conteiner}>
            <View style = {styles.wrap}>
                <ScrollView 
                onScroll={({nativeEvent}) =>
                {
                    if(nativeEvent){
                    const slide =Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
                    if(slide != imgActive){
                        setImgActive(slide);
                    }
                }}}
                showsHorizontalScrollIndicator ={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                >
                    {
                        carData.Result.Resimler.map((e,index)=>
                        <Image 
                            key={e}
                            style={styles.wrap}
                            source={{uri: e}}
                        />
                        )
                    }

                </ScrollView>
                <View style={styles.wrapDot}>
                    {
                        carData.Result.Resimler.map((e,index) =>
                        <Text 
                        key={e}
                        style={imgActive == index ? styles.dotActive : styles.dot}
                        >
                        ●
                        </Text>
                        )
                    }
                </View>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    conteiner: { 
        flex: 1,
    },
    wrap:{
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height) * 0.31,
    },
    wrapDot:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignSelf:'center'
    },
    dotActive:{
        margin:3,
        color:'black',

    },
    dot:{
        margin:3,
        color:'white'
    }

})
export default Imag