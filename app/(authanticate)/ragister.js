import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  
  import { useState } from "react";
  import {useRouter} from "expo-router";
  import { Ionicons } from '@expo/vector-icons';
  import axios from 'axios';

  
  const ragister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleRegister = () => {
      const user = {
        name:name,
        email:email,
        password:password,

      }
      axios.post("http://localhost:3000/register",user).then((response) => {
        console.log(response);
        Alert.alert("Register Successfull","You have been registered successfully");
        setEmail("");
        setName("");
        setPassword("");
      }).catch((error)=>{
        Alert.alert("Register FAILED","You have been NOT REGISTERED");
        console.log("error",error);
      })

    }
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
            <Text style={{ marginTop: 16 }}>Register to your account</Text>
          </View>
          <View>
          {/* User name */}
          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 100,
                width: 300,
              }}
            >
              {/* icon */}
              <Ionicons style={{marginLeft:10}} name="person" size={24} color="gray" />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 250,
                  fontSize: email ? 17 : 17,
                }}
                placeholder="Enter your Name"
              />
            </View>
            {/* Enter Your email  */}
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
            
            <View style={{ marginTop: 20 }} />
  
            {/* Login Button */}
  
            <Pressable
            onPress={handleRegister}
              style={{
                backgroundColor: "#6699cc",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: 400, color: "white" }}>
                Sign up
              </Text>
            </Pressable>
  
            {/* Ragister or sign up  */}
  
            <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
                Already have an account? Login
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default ragister;
  
  const styles = StyleSheet.create({});
  