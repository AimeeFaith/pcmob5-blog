import React from "react";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://replit.com/@AimeeCheng/pcmob5-blog-api#main.py";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      console.log(response);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
    @@ -12, 6 + 42, 7 @@ export default function AccountScreen({ navigation }) {
      return (
        <View style={commonStyles.container}>
          <Text>Account Screen</Text>
          <Text>{username}</Text>
          <Button title="Sign out" onPress={signOut} />
        </View>
      );
      6
      screens / SignInScreen.js
      @@ -30, 14 + 30, 12 @@ export default function SignInScreen({ navigation }) {
        password,
      });
      console.log("Success logging in!");
      console.log(response);

      AsyncStorage.setItem("token", response.data.access_token);
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      navigation.navigate("Account");
    } catch (error) {
      console.log("Error logging in!");
      console.log(error.response);

      setErrorText(error.response.data.description);
    }
  }