import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import {useRouter} from "expo-router";

const index = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const today = moment().format("DD-MMM");
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water",
    },
    {
      id: "1",
      todo: "Take Madicin",
    },
    {
      id: "2",
      todo: "Go Excercising",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "Finish Work",
    },
  ];
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      };

      axios
        .post("http://localhost:3000/todos/65e68cdcca88751a512ec626", todoData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
        await getUserTodos();
      setModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, [marked,isModalVisible]);
  const getUserTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/65e68cdcca88751a512ec626/todos`
      );

      console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];

      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );

      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );

      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(
        `http://localhost:3000/todos/${todoId}/complete`
      );
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("Completed", completedTodos);
  console.log("Pending", pendingTodos);

  return (
    <>
      <View
        style={{
          backgroundColor:"#ffffff",
          paddingHorizontal: 10,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#A75D5D",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#A75D5D",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#A75D5D",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personl</Text>
        </Pressable>
        <Pressable>
          <AntDesign
            onPress={() => setModalVisible(!isModalVisible)}
            name="pluscircle"
            size={30}
            color="#A75D5D"
          />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10, }}>
          {todos?.length > 0 ? (
            // Number of todo tasks

            <View>
              {pendingTodos?.length > 0 && <Text>Task to do! {today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable
                onPress={() =>{
                  router?.push({
                    pathname:"/home/info",
                    params:{
                      id: item._id,
                      title: item?.title,
                      category: item?.category,
                      createdAt: item?.createdAt,
                      dueDate: item?.dueDate,
                    },
                  });
                }}
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
                    <Entypo
                      onPress={() => markTodoAsCompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="#A75D5D"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color="#A75D5D" />
                  </View>
                </Pressable>
              ))}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                      
                    }}
                  >
                    <Octicons name="tasklist" size={50} color="green" />
                  </View>
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
                  {completedTodos?.map((item, index) => (
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
                        <FontAwesome name="circle" size={18} color="#A75D5D" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Ionicons name="flag-sharp" size={20} color="#A75D5D" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <MaterialIcons name="add-task" size={150} color="#A75D5D" />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                No Task for Today! add a task
              </Text>
              <Pressable
                onPress={() => setModalVisible(!isModalVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007fff" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 300 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input your todo"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <MaterialIcons
              onPress={addTodo}
              name="send"
              size={24}
              color="#007fff"
            />
          </View>
          <View style={{ backgroundColor: "#3498DB", borderRadius: 5 }}>
            <Text style={{ padding: 5, color: "white", fontWeight: 600 }}>
              Choose Category
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderColor: "#5DADE2",
                borderRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Parsonal")}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderColor: "#5DADE2",
                borderRadius: 25,
              }}
            >
              <Text>Parsonal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Wishlist")}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderColor: "#5DADE2",
                borderRadius: 25,
              }}
            >
              <Text>Wishlist</Text>
            </Pressable>
          </View>
          <Text>Some Suggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#EBF5FB",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
