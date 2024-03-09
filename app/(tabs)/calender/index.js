import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/todos/completed/${selectedDate}`
      );
      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
    } catch (error) {
      console.log("Error in sarver link", error);
    }
  };
  useEffect(() => {
    fetchCompletedTodos();
  }, [selectedDate]);
  console.log(todos);
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#A75D5D" },
        }}
      />
      <View style={{marginTop:10}}/>
      <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>
      {todos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#FFC3A1",
                        padding: 10,
                        borderRadius: 30,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="circle" size={18} color="green" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Ionicons name="flag-sharp" size={20} color="green" />
                      </View>
                    </Pressable>
                  ))}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
