import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Link, useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import {API_URL } from "@env"
const { height, width } = Dimensions.get("window");

const Content = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);



  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      // setLoading(false);
      }, 3000);

  },[params.content])


  useEffect(() => {
    const showWord = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await axios.get(
          `http://192.168.69.124:8000/api/contentDetail/${params.content}`

          // "http://192.168.219.125:8000/api/contentDetail/48"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    showWord();
  });


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: params.Part,
          drawerItemStyle: { height: 0 },
          headerLeft: () => (
            <Pressable
              style={{ marginRight: 20 }}
              onPress={() => {
                router.push({
                  pathname: "part/Part",
                  params: { post: "random" },
                });
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      {isLoading ? (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
        contentContainerStyle={styles.scrollView} // when use it the scroll will don't move
        fadingEdgeLength={20}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
         style={styles.Box}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{data[0].name}</Text>
          </View>
          <View style={styles.ExplaneBox}>
            <Text style={styles.ExplaneText}>
            {data[0].explane}
            </Text>
          </View>
          <View style={styles.CodeBox}>
            <TextInput
              editable={false}
              multiline
              numberOfLines={20}
              value={data[1]}
              style={{ backgroundColor: "#fff", padding: 20 }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FF",
  },
  Box: {
    margin: 20,
  },
  titleBox: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    color: "#25396F",
    fontWeight: "800",
  },
  ExplaneBox: {
    marginBottom: 20,
  },
  ExplaneText: {
    fontSize: 20,
    color: "#7C8DB5",
    fontWeight: "500",
  },

  CodeBox: {},
  CodeText: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    justifyContent: "flex-start",
  },
});
