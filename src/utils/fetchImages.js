import axios from "axios";

//Fetch images
export const fetchImages = async () => {
    const url = 'https://api.flickr.com/services/rest/'; //main url
    const params = {
        method: 'flickr.photos.getRecent',
        api_key: '6f102c62f41998d151e5a1b48713cf13',
        per_page: 20,
        page: 1,
        format: 'json',
        nojsoncallback: 1,
        extras: 'url_s', //store the result data
        safe_search: 1, //safe search on
        content_type: 1, //only photo no ss
    };

    try{
    const res = await axios.get(url, {params}) 
    console.log(res.data.photos.photo)
    return res.data.photos.photo;
    }catch(error){
        console.log(error)
    }
}
