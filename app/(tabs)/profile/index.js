import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const fetchTaskData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos/count");
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("Error while  fetching task data", error);
    }
  };
  useEffect(() => {
    fetchTaskData();
  }, []);
  console.log("Complted", completedTasks);
  console.log("pending", pendingTasks);
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={{ uri: "#" }} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Keep plan for 14 day
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            Select Catagories{" "}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ marginVertical: 14 }}>Task Overview</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFC3A1",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{completedTasks}</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Completed Tasks
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFC3A1",
              padding: 10,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{pendingTasks}</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Pending Tasks
            </Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={200}
        //yAxisLabel="$"
        //yAxisSuffix="k"

        yAxisInterval={2}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(225,225,225,${opacity})`,
          labelColor: (opacity = 1) => `rgba(225,225,225,${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "6",
            strokeWidth: "auto",
            stroke: "#ffa7256",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
      <View style={{marginTop:10}}>
        <View style={{backgroundColor:"gray",borderRadius:10}}>
          <Image source={{uri: 'images/mukesh.jpg'}} style={{width: 10, height: 40}}/>

        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
