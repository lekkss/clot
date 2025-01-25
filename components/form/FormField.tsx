import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useState } from "react";

type FormFieldPropType = {
  text: string;
  value: string;
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
};

const FormField = ({
  text,
  handleChange,
  keyboardType,
  placeholder,
  otherStyles,
  value,
}: FormFieldPropType) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${otherStyles}`}>
      {/* <Text className="text-base text-gray-100 font-pmedium">{text}</Text> */}
      <View className="w-full h-16 px-4 flex-row bg-light-2 rounded items-center">
        <TextInput
          className="flex-1 text-black-100 font-inter500 text-lg w-full"
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#272727/50"
          onChange={handleChange}
          secureTextEntry={text === "Password" && !showPassword}
        />
        {text === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Image
              source={
                !showPassword
                  ? require("../../assets/icons/eye.png")
                  : require("../../assets/icons/eye-hide.png")
              }
              className="w-6 h-6"
              resizeMode="contain"
            /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
