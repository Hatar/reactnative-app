import React, {  useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { COLORS, ICONS, SIZES } from '../constants'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import CustomeContent from '../components/CustomeContent'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AboutUs =() => {
  const navigation = useNavigation()
  const [tabname,setTabname] = useState("Teams")
  const users = [
    {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "avatar": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "id": 2,
      "firstname": "Jane",
      "lastname": "Smith",
      "avatar": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "id": 3,
      "firstname": "Michael",
      "lastname": "Johnn",
      "avatar": "https://randomuser.me/api/portraits/men/3.jpg"
    },
  ]

  const articles = [
    {
      "id": 1,
      "title": "The Benefits of a Balanced Diet",
      "author": "John Doe",
      "date": "2025-01-01",
      "content": "A balanced diet provides your body with the essential nutrients it needs to function effectively. Learn how to achieve this balance and its positive impacts on your health.",
      "image": "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      "id": 2,
      "title": "Top 10 Exercises for a Healthy Lifestyle",
      "author": "Jane Smith",
      "date": "2025-01-10",
      "content": "Regular physical activity is essential for maintaining a healthy body and mind. Explore these ten exercises that can help you stay fit and active.",
      "image": "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      "id": 3,
      "title": "Understanding Mental Health",
      "author": "Michael Johnson",
      "date": "2025-01-15",
      "content": "Mental health is just as important as physical health. Discover ways to improve your mental well-being and reduce stress.",
      "image": "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      "id": 4,
      "title": "The Role of Technology in Modern Education",
      "author": "Emily Davis",
      "date": "2025-01-20",
      "content": "Technology has revolutionized education, making learning more accessible and engaging. Learn about the latest trends in edtech.",
      "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      "id": 5,
      "title": "How to Build Strong Relationships",
      "author": "Chris Brown",
      "date": "2025-01-25",
      "content": "Strong relationships are the foundation of a fulfilling life. Find out the key principles for building trust and connection.",
      "image": "https://images.unsplash.com/photo-1511988617509-a57c8a288659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ]



  const tabs = [
      {id:1,nameTab:'Teams'},
      {id:2,nameTab:'Articles'},
  ]
  
  const renderTeamsContent = () => {
      return (
        <>
          <View style={styles.imageContainer}>
            <View style={styles.imageCard}>
                <Image style={styles.image} source={ICONS.logo}/>
            </View>
          </View>

          <View style={styles.section_team}>
            <Text style={styles.section_team_title}>Instructors</Text>

            <View style={styles.content}>
                {
                  users.map((user) => (
                    <View key={user.id}>
                      <Image source={{uri:user.avatar}} style={styles.avatar}/>
                      <Text style={styles.username}>{`${user.firstname} ${user.lastname}`}</Text>
                    </View>
                  ))
                }
            </View>

            <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt corporis sit ipsum veniam provident quidem reprehenderit maiores qui suscipit accusantium vel sed quo a quasi, ab error assumenda, earum omnis soluta culpa voluptatem aliquid. Non ad hic vitae iste libero veritatis, in tenetur alias rerum explicabo omnis enim minus dignissimos.</Text>
          </View>
        </>
      )
  }
  const renderArticles = () => {
    return (
        <SafeAreaProvider style={styles.section_articles}>
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
              <CustomeContent
                item={item}
                isEnableChangeContent={true}
                isLastItem={false}
                isArticle={true}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack}/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.headerTitle}>About EggsXpress</Text>
          </View>
      </View>

      <View style={styles.tabs}>
          {
              tabs.map((tab) => (
              <TouchableOpacity key={tab.id} onPress={() => setTabname(tab.nameTab)}>
                <Text style={[styles.title_tab, tab.nameTab === tabname ? styles.active_tab : '']} >{tab.nameTab}</Text>
              </TouchableOpacity>
            ))
          }
      </View>
      {tabname === 'Teams' ? renderTeamsContent() : renderArticles()}
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container:{
      paddingTop: 15,
      flex:1,
  },
  header:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:45,
      marginHorizontal:10
  },
  headerTitle:{
      color:COLORS.cardBg,
      fontWeight:600,
      letterSpacing:1,
      
      fontSize:SIZES.xLarge,
  },
  tabs: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical: 50,
    gap:50
  },
  title_tab:{
    color:COLORS.cardBg,
    fontWeight:600,
    fontSize:SIZES.large,
    paddingBottom:3,
  },
  active_tab:{
    borderRadius:10,
    borderBottomWidth: 3,
    borderColor:COLORS.errors,
    marginVertical:5
  },
  imageContainer: {
    justifyContent:'center',
    alignItems:'center'
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.medium,
  },
  section_team:{
    margin:20
  },
  section_team_title:{
    color:COLORS.cardBg,
    fontWeight:600,
    fontSize:SIZES.large,
    marginVertical:5
  },
  content:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap:30
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    margin:'auto',
    marginVertical:5
  },
  username:{
    color:COLORS.bg,
    fontWeight:500,
    fontSize:SIZES.medium,
  },
  description: {
    fontWeight:400,
    fontSize:SIZES.medium,
    letterSpacing:0.5,
    lineHeight:22,
    paddingVertical: 30,
    color: COLORS.bg,
  },
  section_articles:{
    padding:18,
    marginHorizontal:0,
    marginBottom:15,
    borderRadius:0
  }
})

export default AboutUs