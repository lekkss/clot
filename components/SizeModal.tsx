import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
type PropType = {
  title: string;
  modalRef: React.RefObject<BottomSheetModalMethods>;
  closeFilterModal: () => void;
  filters: any;
  selectedFilter: any;
  setSelectedFilter: Dispatch<SetStateAction<any>>;
};

const SizeFilterModal = ({
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
      <BottomSheetView className="flex-1 rounded-t-2xl">
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
        <View className="flex-col gap-2 p-4">
          {filters.map((filter: any) => (
            <TouchableOpacity
              key={filter}
              className={`flex-row items-center justify-between rounded-full p-4 ${
                selectedFilter === filter ? "bg-primary-100" : "bg-light-2"
              }`}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text className="capitalize">{filter}</Text>
              <View
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: filter,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SizeFilterModal;
