import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";


const info = () => {
  const params = useLocalSearchParams();
  return (
    <View style={{ padding: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Category - {params?.category}
        </Text>
      </View>
      <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "600" }}>
        {params?.title}
      </Text>
      <View style={{ marginTop: 50 }} />
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <FontAwesome6 name="plus" size={20} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontWeight: "600", fontSize: 17 }}>
          Add a subtask
        </Text>
      </Pressable>

      <View style={{marginTop:10}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>
          <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:7}}> 
            <Text>
              {params?.dueDate}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <Ionicons name="time-sharp" size={20} color="black" />
            <Text>Time and Reminder</Text>
          </View>
          <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:7}}> 
            <Text>
              No
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <FontAwesome6 name="repeat" size={20} color="black" />
            <Text>Repeat Task</Text>
          </View>
          <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:7}}> 
            <Text>
              No
            </Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  );
};

export default info;

const styles = StyleSheet.create({});
