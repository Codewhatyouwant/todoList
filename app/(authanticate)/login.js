import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log("Error",error);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    
    const user = {
      email: email,
      password: password,
      
    };
    axios.post("http://localhost:3000/login",user).then((response) => {
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      router.replace("/(tabs)/home")
      console.log("Login Successfully");
    }).catch((error)=>{
      Alert.alert("Login FAILED","You have been NOT LogIn");
      console.log("error",error);
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "whight" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "#0066b2" }}>
          TODO-LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginTop: 16 }}>Login to your account</Text>
        </View>
        <View>
          {/* Enter Your email  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 130,
              width: 300,
            }}
          >
            {/* icon */}
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 250,
                fontSize: email ? 17 : 17,
              }}
              placeholder="Enter your email"
            />
          </View>
          {/* Enter your pasword */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 20,
              width: 300,
            }}
          >
            {/* icon */}
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="password"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 250,
                fontSize: email ? 17 : 17,
              }}
              placeholder="Enter your password"
            />
          </View>
          {/* Keep me login */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me Login</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgate Password
            </Text>
          </View>
          <View style={{ marginTop: 20 }} />

          {/* Login Button */}

          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: "#6699cc",
              padding: 12,
              borderRadius: 6,
              width:300,
              alignItems: "center",
            }}
            
          >
            <Text style={{ fontSize: 22, fontWeight: 400, color: "white" }}>
              Login
            </Text>
          </Pressable>

          {/* Ragister or sign up  */}

          <Pressable
            onPress={() => router.replace("/ragister")}
            style={{ marginTop: 12 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
              Don't have account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
