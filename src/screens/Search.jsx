import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { showRetrySnackbar } from '../components/RetrySnackbar'
import { fetchImages } from '../utils/fetchImages'
import ImageGrid from '../components/ImageGrid'

const Search = () => {

  const [query, setQuery] = useState('')  //For the keyword we search
  const [results, setResults] = useState([])  //store results
  const [page, setPage] = useState(1)  //default page 1 results fetch
  const [loading, setLoading] = useState(false) //load page
  const [loadingMore, setloadingMore] = useState(false) // after page 1 results fetch

  const searchImages = async (initial = false) => {
    const netInfo = await NetInfo.fetch()  //internet check

    //if query empty then return
    if(!query) {
      return;
    }

    try {
      if(!netInfo.isConnected){
        showRetrySnackbar(() => searchImages(initial))  //Snackbar show 
        return;
      }

      //New images fetching
      const newImages = await fetchImages({
        type: 'search',
        text: query,
        page: page,
      })

      if(initial){
        setResults(newImages)  //store images
      }else{
        const merged = [...results, ...newImages]
        setResults(merged)  //stores previous page results + new images
      }
    } catch (error) {
      console.log(error)
      showRetrySnackbar(() => searchImages(initial))  //on error get re shown snackbar
    }finally{
      setLoading(false)
      setloadingMore(false)
    }
  }

  //On press Enter on keyboard
  const handleSearch = () => {
    setLoading(true)
    setPage(1)
    searchImages(true)
  }

  //on reach flatlist end fetch new images with same keywords
  const loadMore = () => {
    if(!loadingMore && results.length > 0) {
      setloadingMore(true)
      const nextPage = page + 1
      setPage(nextPage)
      searchImages(false)
    }
  }

  //main app
  return (
    <View style={styles.container}>
      <TextInput 
      placeholder='Search (e.g. cat, dog)'
      placeholderTextColor={"gray"}
      value={query}
      onChangeText={setQuery}
      onSubmitEditing={handleSearch}  //onPress enter btn on keyboard
      style={styles.input}
      returnKeyType='search'
      />

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : results.length === 0 && query.trim() !== '' ? (
        <View style={styles.noResultsContainer}>
          <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png' }}
      style={styles.noResultsImage}
    />
    <Text style={styles.noResultsText}>No results found for "{query}"</Text>
        </View>
      ) : (
        <ImageGrid images={results} loadMore={loadMore} loadingMore={loadingMore} />
      )}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    backgroundColor: "#dadada",
    fontWeight: 700,
  },
  image: {
    width: '48%',
    height: 200,
    margin: '1%',
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
},
noResultsText: {
  fontSize: 16,
  color: '#888',
  marginTop: 10,
},
noResultsImage: {
  width: 100,
  height: 100,
  opacity: 0.6,
},
})