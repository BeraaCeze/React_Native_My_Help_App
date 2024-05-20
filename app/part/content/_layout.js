import { Stack, useRouter } from "expo-router";
import { Text, View, Button } from "react-native";
export default function StackLayout() {
  const router = useRouter(); //
  return (
    <Stack>
      <Stack.Screen
        name="Content"

      />
    </Stack>
  );
}
