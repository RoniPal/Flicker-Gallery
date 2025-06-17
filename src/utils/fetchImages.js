import axios from "axios";

//Fetch images with some params that helps to Search.jsx results
export const fetchImages = async ({type = 'recent', text = '', page = 1}) => {
    const url = 'https://api.flickr.com/services/rest/'; //main url
    const params = {
        method: type === 'search' ? 'flickr.photos.search' : 'flickr.photos.getRecent',  //for both search and recent
        api_key: '6f102c62f41998d151e5a1b48713cf13',
        per_page: 20,
        page,  //dynamic page 
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_s', //store the result data
        safe_search: 1, //safe search on
        content_type: 1, //only photo no ss
        ...(type === 'search' && {text}),  //when search it get the keywords
    };

    try{
    const res = await axios.get(url, {params}) 
    console.log(res.data.photos.photo)
    return res.data.photos.photo.filter(photo => photo.url_s);
    }catch(error){
        console.log(error)
    }
}
