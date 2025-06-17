import Snackbar from "react-native-snackbar"

export const showRetrySnackbar = (retryFunction) => {
    //Params is a function that will be called
    //call snackbar object
    Snackbar.show({
        text: 'Network error. Please try agian',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
            text: 'RETRY',
            textColor: 'blue',
            onPress: retryFunction, //function that call on press RETRY btn
        },
    })
}