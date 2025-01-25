import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import React, { useState } from "react";
// import { icons } from "../constants";
import { router, usePathname } from "expo-router";

type SearchInputPropType = {
  text?: string;
  value?: string;
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  initialQuery?: any;
};

const SearchInput = ({
  keyboardType,
  placeholder,
  initialQuery,
}: SearchInputPropType) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="space-x-4 w-full h-16 px-4 flex-row bg-black-100 border-2 mt-2 border-black-200 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white text-base w-full mt-0.5 font-pregular"
        value={query}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setQuery(e.nativeEvent.text)
        }
      />
      <TouchableOpacity onPress={() => {}}>
        {/* <Image source={icons.search} className="w-5 h-5" resizeMode="contain" /> */}
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
