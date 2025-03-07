import React from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import pizza from '../assets/pizza.png'
import { useSelector } from 'react-redux';
const AdminScreen = () => {
  const {role} = useSelector((state)=>state.auth)
  return (
    <View style={styles.wrapper}>
        <View style={styles.content}>
          <Image
              source={pizza}
              resizeMode='contain'
              style={{
                  width: 80,
                  height: 80,
              }} 
          />
          <Text style={styles.name_profile}> {role === "user" ? "Customer" : "Admin" }</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    padding: 15,
    backgroundColor: COLORS.bg,
    height:200,
    overflow:"hidden"
  },
  content:{
    flex:1,
    marginTop:30,
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  name_profile:{
    color: COLORS.white,
    fontSize: 20, 
    fontWeight: 'bold'
  }
});

export default AdminScreen;
