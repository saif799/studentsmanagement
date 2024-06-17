import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Check, Minus, ScanLine, X } from "lucide-react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import qrScannerScreen from "./qrScannerScreen";
import { useRoute } from "@react-navigation/native";
import { StudentTableContext } from "@/app/useContext/context";

const studentsData = [
  {
    id: "200435056174",
    fname: "Djari",
    name: "Abdelbasset",
  },
  {
    id: "200435056175",
    fname: "Lina",
    name: "Mohamed",
  },
  {
    id: "200435056176",
    fname: "Karim",
    name: "Ali",
  },
  {
    id: "200435056177",
    fname: "Sara",
    name: "Amine",
  },
  {
    id: "200435056178",
    fname: "Hassan",
    name: "Youssef",
  },
  {
    id: "200435056179",
    fname: "Mouna",
    name: "Fatima",
  },
  {
    id: "200435056180",
    fname: "Yassine",
    name: "Kamal",
  },
  {
    id: "200435056181",
    fname: "Nadia",
    name: "Samir",
  },
  {
    id: "200435056182",
    fname: "Omar",
    name: "Amin",
  },
  {
    id: "200435056183",
    fname: "Khadija",
    name: "Salma",
  },
  {
    id: "200435056184",
    fname: "Rachid",
    name: "Hicham",
  },
  {
    id: "200435056185",
    fname: "Fouad",
    name: "Mehdi",
  },
];

const todayPresence = [
  {
    stuId: "200435056174",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056175",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056176",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056177",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056178",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056179",
    adminId: "1243",
    date: "16/06/2024",
  },
  {
    stuId: "200435056180",
    adminId: "1243",
    date: "16/06/2024",
  },
];

type studentType = (typeof studentsData)[0];
type presenceType = (typeof todayPresence)[0];
type studentWPresence = {
  id: string;
  fname: string;
  name: string;
  presence: string;
};
const Presence = () => {
  const date = new Date();
  const navigation = useNavigation();

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

      <TouchableOpacity
        onPress={() => navigation.navigate("qrScannerScreen")}
        className="bg-primary p-3 rounded-lg flex-row w-fit absolute bottom-[3%]"
      >
        <Text className="text-lg font-pmedium text-white pr-3">Scanner QR</Text>
        <ScanLine color={"white"}></ScanLine>
      </TouchableOpacity>
    </View>
  );
};

function PresenceTable() {
  const [stuState, setStuState] = useState("");
  const swipeableRef = useRef(null);
  const [scannedData, setScannedData] = useState("");
  const studentsData = useContext(StudentTableContext);
  const [students, setStudents] = useState(
    studentsData.map((stu) => setPresenceState(stu, todayPresence))
  );
  const route = useRoute();

  useEffect(() => {
    if (route.params?.scannedData) {
      setScannedData(route.params.scannedData);
      editPresence(scannedData, "right");
    }
  }, [route.params?.scannedData]);

  function updateStudentObject(
    item: studentType,
    presence: string,
    index: number,
    indexOfChange: number
  ) {
    if (index === indexOfChange) {
      console.log("---------" + presence);

      console.log({ ...item, presence });

      return { ...item, presence };
    } else return { ...item };
  }
  function editPresence(id: string, direction: string) {
    const indexOfChange = students.findIndex((stu) => stu.id === id);
    console.log(direction);

    if (indexOfChange !== -1) {
      if (direction === "left") {
        if (
          students[indexOfChange].presence === "present" ||
          students[indexOfChange].presence === ""
        ) {
          const newArray = students.map((item, index) =>
            updateStudentObject(item, "absent", index, indexOfChange)
          );
          setStudents(newArray);
        }
      } else {
        if (
          students[indexOfChange].presence === "absent" ||
          students[indexOfChange].presence === ""
        ) {
          console.log("herre");

          const newArray = students.map((item, index) =>
            updateStudentObject(item, "present", index, indexOfChange)
          );
          setStudents(newArray);
        }
      }
    }

    // if (swipeableRef.current) {
    //   swipeableRef.current.close();
    // }
  }

  function setPresenceState(stu: studentType, presenceArray: presenceType[]) {
    if (todayPresence.find((presItem) => presItem.stuId === stu.id)) {
      return { ...stu, presence: "present" };
    }
    return { ...stu, presence: "" };
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
    <View className="w-full pt-3 h-[75vh]">
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
              friction={1}
              leftThreshold={20}
              rightThreshold={20}
              renderLeftActions={() => renderLeftActions()}
              renderRightActions={() => renderRightActions()}
              onSwipeableWillOpen={(direction) =>
                editPresence(stu.id, direction)
              }
              key={stu.id}
            >
              <View
                className={`w-full rounded-lg py-3 px-3 flex-row justify-between items-center ${
                  stu.presence === "present"
                    ? "bg-[#e9fdec]"
                    : stu.presence === "absent"
                    ? "bg-[#fedddd]"
                    : "bg-[#efefef]"
                }`}
                key={stu.id}
              >
                <Text className={`text-base font-pregular text-darkestGray`}>
                  {stu.fname} {stu.name}
                </Text>
                {stu.presence === "present" ? (
                  <Check color={"#16A34A"} />
                ) : stu.presence === "absent" ? (
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
