import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import {API_URL} from '@env'

import RN from "../assets/images/rn.png";
import python from "../assets/images/python.png";
import laravel from "../assets/images/laravel1.png";
import Bash from "../assets/images/bash.png";
import Db from "../assets/images/Db.png";
import Css from "../assets/images/css.png";
import Js from "../assets/images/javascript.png";
import Php from "../assets/images/php.png";
import CSharp from "../assets/images/c-sharp.png";
import Java from "../assets/images/java.png";
import Node from "../assets/images/node-js.png";

import { FlatList } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const index = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const showWord = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `http://192.168.69.124:8000/api/langs`

          // http://192.168.219.125:8000/api/langs
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    showWord();
  });
  

  const Lang = () => {
    return (
      <View style={styles.viewBox}>
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              style={styles.box}
              href={{
                pathname: "part",
                params: { Lang: item.id, LangName: item.name },
              }}
            >
              <View style={styles.box}>
                <Image
                  source={
                    item.name == "Laravel"
                      ? laravel
                      : item.name == "React_Js"
                      ? RN
                      : item.name == "React_Native"
                      ? RN
                      : item.name == "Bash_Scripting"
                      ? Bash
                      : item.name == "Python"
                      ? python
                      : item.name == "CSS_P"
                      ? Css
                      : item.name == "J.S_P"
                      ? Js
                      : item.name == "Php"
                      ? Php
                      : item.name == "C#"
                      ? CSharp
                      : item.name == "Java"
                      ? Java
                      : item.name == "Node_Js"
                      ? Node
                      : item.name == "Database"
                      ? Db
                      : Bash
                  }
                  resizeMode="cover"
                  style={styles.boxIcon}
                />
                <Text style={styles.boxText}>{item.name}</Text>
              </View>
            </Link>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView
        contentContainerStyle={styles.scrollView} // when use it the scroll will don't move
        fadingEdgeLength={20}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          Lang()
        )}
      </ScrollView>
    </View>
  );
};

export default index;

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

  boxIcon: {
    width: width * 0.2,
    height: width * 0.2,
    alignItems: "center",
    alignContent: "center",
  },

  boxText: {
    marginTop: 15,
    color: "#808080",
    textAlign: "center",
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
