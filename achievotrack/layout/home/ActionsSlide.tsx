import React from 'react'
import { ScrollView } from 'react-native'
import ActionCard from './ActionCard'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Actions() {
  const actions = [
    {
      title: "Schedule",
      icon: <FontAwesome5 name="bell" size={22} color="black" />,
      link: "/schedule"
    },
    // {
    //   title: "Stats",
    //   icon: <FontAwesome5 name="chart-bar" size={22} color="#fff" />,
    //   link: "/stats"
    // },
    {
      title: "Feedback",
      icon: <FontAwesome5 name="comment" size={22} color="#fff" />,
      link: "/feedback"
    },
    // {
    //   title: "Resources",
    //   icon: <MaterialCommunityIcons name="bookshelf" size={24} color="#fff" />,
    //   link: "/resources"
    // },
    // {
    //   title: "Career",
    //   icon: <FontAwesome5 name="briefcase" size={22} color="black" />,
    //   link: "/career"
    // },
    {
      title: "Settings",
      icon: <FontAwesome5 name="cog" size={22} color="black" />,
      link: "/settings"
    },
    // {
    //   title: "Support",
    //   icon: <FontAwesome5 name="headset" size={22} color="black" />,
    //   link: "/support"
    // },
    // {
    //   title: "About",
    //   icon: <FontAwesome5 name="info" size={22} color="#fff" />,
    //   link: "/about"
    // }
  ] as Record<string, any>[]

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
      {
        actions.map((action, index) => (
          <ActionCard title={action.title} iconName={action.icon} index={index} link={action.link} key={index} />
        ))
      }
    </ScrollView>
  )
}


