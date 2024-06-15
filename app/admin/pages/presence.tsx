import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Check, Minus, ScanLine, X } from "lucide-react-native";

const stuState: string = "";
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
  return (

    <View className="w-full pt-3">
      <View className="w-full flex-row justify-between px-2">
        <Text className="text-lg font-pmedium text-disabledGray pb-2">
          Nom et Prénom
        </Text>
        <Text className="text-lg font-pmedium text-disabledGray">état</Text>
      </View>
      <ScrollView>
        <View style={styles.scrollTable}>
          {students.map((stu) => (
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
          ))}
        </View>
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
