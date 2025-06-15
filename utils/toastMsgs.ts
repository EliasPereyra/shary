import Toast from "react-native-toast-message";

export const showSuccessMessage = (title: string, msg: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: msg,
  });
};

export const showErrorMessage = (title: string, msg: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: msg,
    visibilityTime: 3000,
  });
};
