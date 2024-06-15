import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Check, Minus, ScanLine, X } from "lucide-react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const students = [
  {
    id: "200435056174",
    fname: "Djari",
    name: "Abdelbasset",
  },
  {
    id: "200435046174",
    fname: "Djari",
    name: "Abdelbasset",
  },
  {
    id: "200435036174",
    fname: "Djari",
    name: "Abdelbasset",
  },
];

type studentType = (typeof students)[0];

const Presence = () => {
  const date = new Date();

  return (
    <View className="bg-white relative flex-1 px-4 pt-2 items-center">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-lg font-pmedium text-darkestGray">
          Marquer la présence
        </Text>
        <View className="bg-primary py-1 px-2 rounded-lg justify-center">
          <Text className="text-lg font-pmedium text-white ">
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </Text>
        </View>
      </View>
      <PresenceTable />
      <TouchableOpacity className="bg-primary p-3 rounded-lg flex-row w-fit absolute bottom-[3%]">
        <Text className="text-lg font-pmedium text-white pr-3">Scanner QR</Text>
        <ScanLine color={"white"}></ScanLine>
      </TouchableOpacity>
    </View>
  );
};

function PresenceTable() {
  const [stuState, setStuState] = useState("");
  const swipeableRef = useRef(null);

  function markPresence(id: string, direction: string) {
    if (direction === "left") {
      if (stuState === "present" || stuState === "") {
        setStuState("absent");
      } else setStuState("");
    } else {
      if (stuState === "absent" || stuState === "") {
        setStuState("present");
      } else setStuState("");
    }
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }
  function renderLeftActions() {
    return (
      <View className="bg-white rounded-lg px-2 justify-center  ">
        <Text className="font-pmedium text-red-400">absent</Text>
      </View>
    );
  }
  function renderRightActions() {
    return (
      <View className="bg-white rounded-lg px-2 justify-center  ">
        <Text className="font-pmedium text-green-700">present</Text>
      </View>
    );
  }

  return (
    <View className="w-full pt-3">
      <View className="w-full flex-row justify-between px-2">
        <Text className="text-lg font-pmedium text-disabledGray pb-2">
          Nom et Prénom
        </Text>
        <Text className="text-lg font-pmedium text-disabledGray">état</Text>
      </View>
      <ScrollView>
        <GestureHandlerRootView style={styles.scrollTable}>
          {students.map((stu) => (
            <Swipeable
              ref={swipeableRef}
              leftThreshold={10}
              rightThreshold={10}
              renderLeftActions={() => renderLeftActions()}
              renderRightActions={() => renderRightActions()}
              onSwipeableWillOpen={(direction) =>
                markPresence(stu.id, direction)
              }
              onSwipeableOpen={() => swipeableRef.current.close()}
              key={stu.id}
            >
              <View
                className={`w-full rounded-lg py-3 px-3 flex-row justify-between items-center ${
                  stuState === "present"
                    ? "bg-[#e9fdec]"
                    : stuState === "absent"
                    ? "bg-[#fedddd]"
                    : "bg-[#efefef]"
                }`}
                key={stu.id}
              >
                <Text className={`text-base font-pregular text-darkestGray`}>
                  {stu.fname} {stu.name}
                </Text>
                {stuState === "present" ? (
                  <Check color={"#16A34A"} />
                ) : stuState === "absent" ? (
                  <X color={"red"} />
                ) : (
                  <Minus size={20} color={"#263238"} />
                )}
              </View>
            </Swipeable>
          ))}
        </GestureHandlerRootView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollTable: {
    gap: 8,
  },
});
export default Presence;
