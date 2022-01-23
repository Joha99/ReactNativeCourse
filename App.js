import React, { useState, useEffect } from "react";
import { Button, Text } from "react-native";
import Screen from "./app/components/Screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Link = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Click"
      onPress={() => {
        navigation.navigate("TweetDetails");
      }}
    />
  );
};

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    {/* <Link /> */}
    <Button
      title="Click"
      onPress={() => {
        navigation.navigate("TweetDetails", {
          title: "Tweet Details",
          text: "some text",
          id: 1,
        });
      }}
    />
  </Screen>
);

const TweetDetails = ({ route }) => (
  <Screen>
    <Text>{route.params.text}</Text>
  </Screen>
);

const Stack = createNativeStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Tweets">
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen
      name="TweetDetails"
      component={TweetDetails}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
