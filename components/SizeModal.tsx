import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Sheet } from "./Sheet";
import icons from "@/constants/icons";
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
    <Sheet ref={modalRef} snapPoints={snapPoints}>
      <BottomSheetView className="flex-1 rounded-t-2xl  pb-8">
        <View className="relative -mt-5 flex-row justify-between items-center p-4">
          <Text className="text-2xl text-center w-full font-semibold">
            {title}
          </Text>
          <TouchableOpacity
            className="absolute right-4"
            onPress={closeFilterModal}
          >
            <Image source={icons.x} className="size-6" />
          </TouchableOpacity>
        </View>
        <View className="flex-col gap-4 p-4">
          {filters.map((filter: any) => (
            <TouchableOpacity
              key={filter}
              className={`flex-row items-center justify-between rounded-full p-5 ${
                selectedFilter.toLowerCase() === filter.toLowerCase()
                  ? "bg-primary-100"
                  : "bg-light-2"
              }`}
              onPress={() => {
                setSelectedFilter(filter);
                closeFilterModal();
              }}
            >
              <Text
                className={`capitalize text-lg ${
                  selectedFilter.toLowerCase() === filter.toLowerCase()
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {filter}
              </Text>
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
    </Sheet>
  );
};

export default SizeFilterModal;
