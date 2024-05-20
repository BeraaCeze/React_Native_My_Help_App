import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawer } from "expo-router/drawer";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import {API_URL } from "@env"
import RN from "../../assets/images/rn.png";
import python from "../../assets/images/python.png";
import laravel from "../../assets/images/laravel1.png";
import Bash from "../../assets/images/bash.png";
import Db from "../../assets/images/Db.png";
import Css from "../../assets/images/css.png";
import Js from "../../assets/images/javascript.png";
import Php from "../../assets/images/php.png";
import CSharp from "../../assets/images/c-sharp.png";
import Java from "../../assets/images/java.png";
import Node from "../../assets/images/node-js.png";

const { height, width } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  // ${params.Lang}
  useEffect(() => {
    const showWord = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await axios.get(
          `http://192.168.69.124:8000/api/parts/${params.Lang}`
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
            // Link Go TO Part
            <Link
              key={item.id}
              href={{ pathname: "part/Part", params: { Part: item.id  } }}
              style={styles.partsLink}
            >
              <Text style={styles.partsText}>{item.name} {params.Lang}</Text>
            </Link>
          );
        })}
      </View>
    );
  };

  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.Header}>
              <Image
                source={
                  params.LangName == "Laravel"
                    ? laravel
                    : params.LangName == "React_Js"
                    ? RN
                    : params.LangName == "React_Native"
                    ? RN
                    : params.LangName == "Bash_Scripting"
                    ? Bash
                    : params.LangName == "Python"
                    ? python
                    : params.LangName == "CSS_P"
                    ? Css
                    : params.LangName == "J.S_P"
                    ? Js
                    : params.LangName == "Php"
                    ? Php
                    : params.LangName == "C#"
                    ? CSharp
                    : params.LangName == "Java"
                    ? Java
                    : params.LangName == "Node_Js"
                    ? Node
                    : params.LangName == "Database"
                    ? Db
                    : Bash
                }
                resizeMode="cover"
                style={styles.HeaderImage}
              />
              <Text style={styles.HeaderText}>{params.LangName}</Text>
            </View>
            <View style={styles.line}></View>
            <ScrollView
              style={styles.parts}
              fadingEdgeLength={20}
              contentContainerStyle={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {isLoading ? <View style={{ marginTop : 50 }} ><ActivityIndicator size="large"  /></View>: Lang()}

              {/* {Lang()} */}
            </ScrollView>
            <View style={[styles.line, { marginTop: 20 }]}></View>

            <View style={styles.footer}>
              <Image
                source={laravel}
                resizeMode="cover"
                style={styles.footerLogo}
              />
              <Text style={styles.footerText}> Made By </Text>
              <Text style={styles.footerText2}>B_R_Z </Text>
            </View>
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="Part"
        options={{
          title: "Parts",
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen name="content" options={{ headerShown: false }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  Header: {
    marginTop: 40,
    justifyContent: "center",
    alignSelf: "center",
    height: height * 0.15,
  },
  HeaderImage: {
    width: 80,
    height: 80,
  },
  HeaderText: {
    textAlign: "center",
    color: "#808080",
    fontWeight: "600",
    marginTop: 20,
    fontSize: 16,
  },
  line: {
    marginTop: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#808080",
    width: 220,
    alignSelf: "center",
  },

  parts: {
    marginLeft: 30,
    marginTop: 30,
  },
  partsLink: {
    margin: 10,
  },

  partsText: {
    color: "#808080",
    fontSize: 16,
  },

  footer: {
    // flex :1 ,
    marginTop: 15,
    justifyContent: "center",
    marginBottom: 20,
  },
  footerLogo: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginBottom: 10,
  },

  footerText: {
    alignSelf: "center",
    fontSize: 10,
  },

  footerText2: {
    alignSelf: "center",
    fontSize: 10,
    color: "red",
  },
});
