import {StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

//Main App Grid View where as a params passes 'images', loadMore, loadingMore object
const ImageGrid = ({images, loadMore, loadingMore}) => {
  return (
    //Flatlist for showing images as a list with 2 columns only
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={images}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id || 'noid'}_${item.secret || 'nosecret'}_${index}`} //ensure uniqueness
      renderItem={({item}) => (
        <Image
          source={{uri: item.url_s}}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator size="large" style={{margin: 10}} />
        ) : null
      }
    />
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: 200,
    margin: '1%',
    borderRadius: 10,
  },
});
