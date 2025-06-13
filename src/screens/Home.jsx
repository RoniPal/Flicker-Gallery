import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { getImageFromCache, saveImageCache } from '../utils/cacheUtils';
import { fetchImages } from '../utils/fetchImages';
import ImageGrid from '../components/ImageGrid';

const Home = () => {
  const [images, setimages] = useState([])  //images object
  const [loading, setLoading] = useState(true)  //loader


  //Image load function
  const loadImages = async () => {
    const netInfo = await NetInfo.fetch()  //check net on

    if(!netInfo.isConnected){
      const cached = await getImageFromCache('images');  //get old images from cache
      if(cached) {
        setimages(cached) 
      };
    }else{
      const newImages = await fetchImages()  //get new images from Flicker API
      const cached = await getImageFromCache('images')  // store new images to the cache

      //check server give previous images thoose fetched or new images ,
      if(JSON.stringify(cached) !== JSON.stringify(newImages)){
        setimages(newImages)
        await saveImageCache('images', newImages)  //get new images
      }else{
        setimages(cached || [])  //get feom cache if old and new are same
      }
    }
    setLoading(false) //loader false
  }

  //call the function
  useEffect(() => {
    loadImages()
  }, [])

  // untill imgaes not fetched , loader show
  if(loading){
    return <ActivityIndicator size="large" style={styles.loader} />
  }

  //Main view
  return (
    <View style={styles.container}>
      <ImageGrid images={images} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
  },
  loader: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})