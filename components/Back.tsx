import icons from "@/constants/icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BackProps {
  name?: string;
}
const Back = ({ name }: BackProps) => {
  return (
    <View className="relative flex-row items-center justify-center gap-2">
      <TouchableOpacity
        className="absolute left-0 size-12 bg-light-2 rounded-full flex items-center justify-center"
        onPress={() => router.back()}
      >
        <Image source={icons.arrow} resizeMode="cover" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold">{name}</Text>
    </View>
  );
};
export default Back;
