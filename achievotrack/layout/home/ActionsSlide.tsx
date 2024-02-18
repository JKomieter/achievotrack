import React from 'react'
import { ScrollView } from 'react-native'
import ActionCard from './ActionCard'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Actions() {
  const actions = [
    {
      title: "Reminder",
      icon: <FontAwesome5 name="bell" size={22} color="black" />
    },
    {
      title: "Stats",
      icon: <FontAwesome5 name="chart-bar" size={22} color="black" />
    },
    {
      title: "Resources",
      icon: <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
    },
    {
      title: "Career",
      icon: <FontAwesome5 name="briefcase" size={22} color="black" />
    },
    {
      title: "Settings",
      icon: <FontAwesome5 name="cog" size={22} color="black" />
    },
    {
      title: "Support",
      icon: <FontAwesome5 name="headset" size={22} color="black" />
    },
    {
      title: "Feedback",
      icon: <FontAwesome5 name="comment" size={22} color="black" />
    },
    {
      title: "About",
      icon: <FontAwesome5 name="info" size={22} color="black" />
    }
  ]


  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
      {
        actions.map((action, index) => (
          <ActionCard title={action.title} iconName={action.icon} index={index} key={index} />
        ))
      }
    </ScrollView>
  )
}


