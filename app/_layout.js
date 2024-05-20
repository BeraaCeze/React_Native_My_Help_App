import { Stack, useRouter } from "expo-router";
import { Text, View, Button } from "react-native";
export default function StackLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="part"
        options={{
          headerShown: false,
        }}
      />


    </Stack>
  );
}
