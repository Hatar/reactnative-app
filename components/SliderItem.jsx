import { StyleSheet, Text, View,Dimensions } from "react-native";
import Circle from "./Circle";
const {width, height} = Dimensions.get('screen');
const SlideItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Circle background={'primary'} logo={item.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width,
    height
  },
  image: {
    flex: 0.6,
    width: "100%",
  },
  content: {
    flex: 0.4,
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
