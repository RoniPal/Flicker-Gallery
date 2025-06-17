import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { getImageFromCache, saveImageCache } from '../utils/cacheUtils';
import { fetchImages } from '../utils/fetchImages';
import ImageGrid from '../components/ImageGrid';
import { showRetrySnackbar } from '../components/RetrySnackbar';

const Home = () => {
  const [images, setimages] = useState([])  //images object
  const [loading, setLoading] = useState(true)  //loader
  const [page, setPage] = useState(1); //pagination
  const [loadingMore, setLoadingMore] = useState(false); // Loader at bottom



  //Image load function
  const loadImages = async (initial = false) => {
    const netInfo = await NetInfo.fetch()  //check net on

    try{
    if(!netInfo.isConnected){
      const cached = await getImageFromCache('images');  //get old images from cache
      if(cached) {
        setimages(cached) 
      };
    }else{
      const newImages = await fetchImages({page})  //get new images from Flicker API
      const cached = await getImageFromCache('images')  // store new images to the cache

      if(initial){
      //check server give previous images thoose fetched or new images ,
      if(JSON.stringify(cached) !== JSON.stringify(newImages)){
        setimages(newImages)
        await saveImageCache('images', newImages)  //get new images
      }else{
        setimages(cached || [])  //get feom cache if old and new are same
      }
    }else{
      const merged = [...images, ...newImages]
      setimages(merged)
      await saveImageCache('images', merged)
    }
    }
  }catch(error){
    console.log(error)
    showRetrySnackbar(() => loadImages(initial))
  }finally{
    setLoading(false) //loader false
    setLoadingMore(false) //pagination loading stop
  }
  }

  //call the function
  useEffect(() => {
    loadImages()
  }, [])

  //Pagination loading and logic
  const loadMore = () => {
    if(!loadingMore){
      const nextPage = page + 1
      setLoadingMore(true)
      setPage(nextPage)
      loadImages(false)
    }
  }

  // untill imgaes not fetched , loader show
  if(loading){
    return <ActivityIndicator size="large" style={styles.loader} />
  }

  //Main view
  return (
    <View style={styles.container}>
      <ImageGrid images={images} loadMore={loadMore} loadingMore={loadingMore} />
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