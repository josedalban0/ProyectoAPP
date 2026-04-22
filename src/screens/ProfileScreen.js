import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (granted) {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  }
};