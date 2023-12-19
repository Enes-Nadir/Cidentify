import React, { useState } from "react"
import { Text } from 'react-native'
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();


export const bottomTabIcons = [
    {
    name: 'Home',
    active: require('../../assets/home1.png'),
    pasive: require('../../assets/home.png')
},
{
    name: 'Career',
    active: require('../../assets/book1.png'),
    passive: require('../../assets/book.png')
},
{
    name: 'Messages',
    active: require('../../assets/email1.png'),
    passive: require('../../assets/email.png')
},
{
    name: 'Profile',
    active: require('../../assets/user1.png'),
    passive: require('../../assets/user.png')
 },
]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          <Image source={activeTab === icon.name ? icon.active : icon.passive} style={styles.icon} />
        </TouchableOpacity>
      );
      
    return(
        <View style={styles.container}>
            {icons.map((icon,index) => (
                <Icon key={index} icon={icon} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderTopWidth: 1, // optional, if you want a top border like Instagram
        borderTopColor: '#e2e2e2', // optional, color for the top border
        justifyContent: "space-evenly",
        
    },
    
    icon: {
        height: 40,
        width: 40,
        flex: 1,
    },
})

export default BottomTabs