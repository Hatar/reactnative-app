import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, Image, FlatList, Linking, ScrollView } from 'react-native'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { ICONS } from '../constants'
import CustomeContent from '../components/CustomeContent'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AboutUs = () => {
  const navigation = useNavigation()
  const [tabname, setTabname] = useState("Teams")
  
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
    {id: 1, nameTab: 'Teams'},
    {id: 2, nameTab: 'Articles'},
  ]
  
  const contactInfo = {
    address: "123 Innovation Drive, Silicon Valley",
    city: "San Francisco",
    state: "California",
    zipCode: "94105",
    phone: "+1 (555) 123-4567",
    email: "contact@eggsxpress.com"
  }

  const handlePress = (type) => {
    switch(type) {
      case 'phone':
        Linking.openURL(`tel:${contactInfo.phone}`)
        break
      case 'email':
        Linking.openURL(`mailto:${contactInfo.email}`)
        break
      case 'maps':
        const address = `${contactInfo.address}, ${contactInfo.city}, ${contactInfo.state} ${contactInfo.zipCode}`
        Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(address)}`)
        break
    }
  }

  const renderTeamsContent = () => {
    return (
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        <View className="px-5">
          <Text className="text-xl font-bold text-primary mb-6">Instructors</Text>

          <View className="flex-row flex-wrap justify-center items-center gap-8">
            {users.map((user) => (
              <View key={user.id} className="items-center">
                <Image 
                  source={{uri: user.avatar}} 
                  className="w-16 h-16 rounded-full mb-2"
                />
                <Text className="text-base font-medium text-gray-800">
                  {`${user.firstname} ${user.lastname}`}
                </Text>
              </View>
            ))}
          </View>

          <Text className="mt-8 text-base leading-6 text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt corporis sit ipsum veniam provident quidem reprehenderit maiores qui suscipit accusantium vel sed quo a quasi, ab error assumenda, earum omnis soluta culpa voluptatem aliquid. Non ad hic vitae iste libero veritatis, in tenetur alias rerum explicabo omnis enim minus dignissimos.
          </Text>

          {/* Contact Information Section */}
          <View className="mt-8 pt-8 border-t border-gray-200">
            <Text className="text-xl font-bold text-primary mb-6">Contact Us</Text>
            
            {/* Address */}
            <TouchableOpacity 
              className="flex-row items-center mb-4 bg-white p-4 rounded-xl shadow-sm"
              onPress={() => handlePress('maps')}
            >
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="location-outline" size={24} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">{contactInfo.address}</Text>
                <Text className="text-sm text-gray-600">
                  {contactInfo.city}, {contactInfo.state} {contactInfo.zipCode}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Phone */}
            <TouchableOpacity 
              className="flex-row items-center mb-4 bg-white p-4 rounded-xl shadow-sm"
              onPress={() => handlePress('phone')}
            >
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="call-outline" size={24} color="#f59e0b" />
              </View>
              <Text className="flex-1 text-base font-medium text-gray-900">{contactInfo.phone}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity 
              className="flex-row items-center bg-white p-4 rounded-xl shadow-sm"
              onPress={() => handlePress('email')}
            >
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="mail-outline" size={24} color="#f59e0b" />
              </View>
              <Text className="flex-1 text-base font-medium text-gray-900">{contactInfo.email}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }

  const renderArticles = () => {
    return (
      <SafeAreaProvider className="flex-1">
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
            <CustomeContent
              item={item}
              isEnableChangeContent={true}
              isLastItem={false}
              isArticle={true}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-4 pb-8"
        />
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      {/* Fixed Header */}
      <View className="px-4 h-12">
        <View className="flex-row items-center">
          <BackButton goBack={navigation.goBack} />
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4">
        <View className="flex-row justify-center items-center gap-12">
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab.id} 
              onPress={() => setTabname(tab.nameTab)}
              className="relative"
            >
              <Text className={`text-lg font-semibold pb-1 ${tab.nameTab === tabname ? 'text-primary border-b-2 border-red-500' : 'text-gray-600'}`}>
                {tab.nameTab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Content */}
      <View className="flex-1 mt-4">
        {tabname === 'Teams' ? renderTeamsContent() : renderArticles()}
      </View>
    </SafeAreaView>
  )
}

export default AboutUs