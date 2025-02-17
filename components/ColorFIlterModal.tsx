import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
type PropType = {
  title: string;
  modalRef: React.RefObject<BottomSheetModalMethods>;
  closeFilterModal: () => void;
  filters: any;
  selectedFilter: any;
  setSelectedFilter: Dispatch<SetStateAction<any>>;
};

const ColorFilterModal = ({
  title,
  modalRef,
  closeFilterModal,
  filters,
  selectedFilter,
  setSelectedFilter,
}: PropType) => {
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing
    >
      <BottomSheetView className="flex-1  rounded-t-2xl">
        <View className="relative flex-row justify-between items-center p-4">
          <Text className="text-lg text-center w-full font-semibold">
            {title}
          </Text>
          <TouchableOpacity
            className="absolute right-4"
            onPress={closeFilterModal}
          >
            <Text className="text-lg font-semibold">X</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filters}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              className={`flex-row items-center justify-between rounded-full p-4 ${
                selectedFilter === item ? "bg-primary-100" : "bg-light-2"
              }`}
              onPress={() => {
                setSelectedFilter(item);
                closeFilterModal();
              }}
            >
              <Text
                className={`capitalize text-lg ${
                  selectedFilter === item ? "text-white" : "text-black"
                }`}
              >
                {item}
              </Text>
              <View
                className={`size-6 rounded-full ${
                  selectedFilter === item ? "border-2 border-white" : ""
                }`}
                style={{
                  backgroundColor: item,
                }}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 10,
          }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ColorFilterModal;
