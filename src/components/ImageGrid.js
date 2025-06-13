import { StyleSheet, FlatList, Image} from 'react-native'
import React from 'react'

//Main App Grid View where as a params passes 'images' object
const ImageGrid = ({images}) => {
  return (
    //Flatlist for showing images as a list with 2 columns only
    <FlatList
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    data={images}
    numColumns={2}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
        <Image 
        source={{uri: item.url_s}}
        style={styles.image}
        resizeMode="cover"
        />
    )}
    />
  )
}

export default ImageGrid

const styles = StyleSheet.create({
    image: {
        width: "50%",
        height: 200,
        margin: '1%',
        borderRadius: 10,
    }
})