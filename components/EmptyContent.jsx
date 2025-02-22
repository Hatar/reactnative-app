import { StyleSheet, View,Image,Text } from "react-native"

const EmptyContent = ({title,image}) => {
  return (
   <View style={styles.noFoodsContainer}>
        <Image source={image} style={styles.noFoodsImage} />
        <Text style={styles.noFoodsText}>{`No ${title} available right now.`}</Text>
        <Text style={styles.noFoodsSubText}>Try selecting another category or check back later!</Text>
    </View>
  )
}


export const styles = StyleSheet.create({
    noFoodsContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    
    noFoodsImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        resizeMode: "contain",
    },
    
    noFoodsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
    },
    
    noFoodsSubText: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginTop: 5,
    }
})

export default EmptyContent