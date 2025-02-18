import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import icons from "@/constants/icons";
import { FlatList } from "react-native-gesture-handler";
import { Sheet } from "./Sheet";
type PropType = {
  title: string;
  modalRef: React.RefObject<BottomSheetModalMethods>;
  closeFilterModal: () => void;
  filters: any;
  selectedFilter: any;
  setSelectedFilter: Dispatch<SetStateAction<any>>;
};

const AddressModal = ({
  title,
  modalRef,
  closeFilterModal,
  filters,
  selectedFilter,
  setSelectedFilter,
}: PropType) => {
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <Sheet ref={modalRef} snapPoints={snapPoints} enableDynamicSizing>
      <BottomSheetView className="flex-1  rounded-t-2xl">
        <View className="relative flex-row justify-between items-center p-4">
          <Text className="text-2xl -mt-5 text-center w-full font-semibold">
            {title}
          </Text>
          <TouchableOpacity
            className="absolute right-4"
            onPress={closeFilterModal}
          >
            <Image source={icons.x} className="size-6" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filters}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              className={` flex-row items-start justify-between rounded-full p-5 ${
                selectedFilter === item ? "bg-primary-100" : "bg-light-2"
              }`}
              onPress={() => {
                setSelectedFilter(item);
                closeFilterModal();
              }}
            >
              <Text
                className={`text-lg ${
                  selectedFilter === item ? "text-white" : "text-black"
                }`}
              >
                {item.street}
              </Text>
              <Text
                className={`text-lg ${
                  selectedFilter === item ? "text-white" : "text-black"
                }`}
              >
                {item.state}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 10,
          }}
        />
      </BottomSheetView>
    </Sheet>
  );
};

export default AddressModal;
