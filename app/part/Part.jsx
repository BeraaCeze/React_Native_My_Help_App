import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API_URL } from "@env";

const { height, width } = Dimensions.get("window");

const Part = (props) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const Lang = () => {
    return (
      <View style={styles.viewBox}>
        {data.map((item) => {
          return (
            // Link Go TO Content
            <Link
              key={item.id}
              style={styles.box}
              href={{
                pathname: "part/content/Content",
                params: { content: item.id },
              }}
            >
              <View style={styles.box}>
                <View style={styles.textBackground}>
                  <Text style={styles.boxText}>{item.name}</Text>
                </View>
              </View>
            </Link>
          );
        })}
      </View>
    );
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const showWord = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await axios.get(
          `http://192.168.69.124:8000/api/contents/${params.Part}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    showWord();
  });

  useEffect(() => {
    if (params.Part) {
      setLoading(true);
    }
    // setLoading(false);
  }, [params.Part]);

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollView} // when use it the scroll will don't move
        fadingEdgeLength={20}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewBox}>
          {/* {Lang()} */}
          {isLoading ? (
            <View style={{ marginTop: 50 ,flex:1 ,justifyContent:"center", alignSelf:"center"}}>
              <Text style={{ color :"red" ,justifyContent:"center", alignSelf:"center"}}>Select Subject From Side </Text>
            </View>
          ) : (
            Lang()
          )}
          
        </View>
      </ScrollView>
    </View>
  );
};

export default Part;

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
  },

  viewBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  box: {
    width: width * (0.5 - 0.04),
    height: width * 0.45,
    borderRadius: 20,
    margin: width * 0.02,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  textBackground: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  boxText: {
    color: "#808080",
    textAlign: "center",
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
