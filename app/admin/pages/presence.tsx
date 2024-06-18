import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Check, Minus, ScanLine, X } from "lucide-react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Link, useNavigation } from "expo-router";
import { supabase } from "@/lib/supabase";

type PresenceType = {
  id: string;
  username: string;
  familyName: string;
  presence: {
    state: string;
    id: string;
  }[];
}[];

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

      <Link
        href={`admin/pages/qrScannerScreen`}
        className="bg-primary p-3 rounded-lg flex-row w-fit absolute bottom-[3%] items-center justify-center "
      >
        <Text className="text-lg font-pmedium text-white pr-3">Scanner QR</Text>
        <ScanLine color={"white"}></ScanLine>
      </Link>
    </View>
  );
};

function PresenceTable() {
  const swipeableRef = useRef(null);
  const [dbStudents, setDbStudents] = useState<PresenceType | null>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id,username,familyName,presence(state,id)")
      .eq("presence.created_at", new Date().toISOString().split("T")[0])
      .then(({ data }) => {
        if (data) {
          const db: PresenceType = data;
          setDbStudents(db);
        }
      });
  }, []);

  function editPresence(id: string, direction: string) {
    if (dbStudents) {
      const indexOfChange = dbStudents.findIndex((stu) => stu.id === id);

      const state = direction === "left" ? "absent" : "present";

      if (indexOfChange !== -1) {
        if (dbStudents[indexOfChange].presence.length === 0) {
          supabase
            .from("presence")
            .insert({
              userId: id,
              state,
              created_at: new Date().toISOString().split("T")[0],
            })
            .then(({ error }) => {
              if (!error)
                console.log(
                  "should be workign and updated the studnt succefuly"
                );
              console.log(error);
            });
        } else {
          supabase
            .from("presence")
            .update({ state })
            .eq("id", dbStudents[indexOfChange].presence[0].id)
            .then(({ data, error }) => {
              console.log("it should be updated i think");
              console.log(error);
            });
        }

        const updatedDbStudentsArray: PresenceType = dbStudents.map(
          (item, index) =>
            index === indexOfChange
              ? {
                  ...item,
                  presence: [
                    {
                      ...item.presence[0],
                      state,
                    },
                  ],
                }
              : item
        );
        setDbStudents(updatedDbStudentsArray);
      }
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
    <View className="w-full pt-3 h-[75vh]">
      <View className="w-full flex-row justify-between px-2">
        <Text className="text-lg font-pmedium text-disabledGray pb-2">
          Nom et Prénom
        </Text>
        <Text className="text-lg font-pmedium text-disabledGray">état</Text>
      </View>
      <ScrollView>
        <GestureHandlerRootView style={styles.scrollTable}>
          {dbStudents?.map((stu) => (
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
                  stu.presence.length === 0
                    ? "bg-[#efefef]"
                    : stu.presence[0].state === "absent"
                    ? "bg-[#fedddd]"
                    : "bg-[#e9fdec]"
                }`}
                key={stu.id}
              >
                <Text className={`text-base font-pregular text-darkestGray`}>
                  {stu.familyName} {stu.username}
                </Text>
                {stu.presence.length === 0 ? (
                  <Minus size={20} color={"#263238"} />
                ) : stu.presence[0].state === "absent" ? (
                  <X color={"red"} />
                ) : (
                  <Check color={"#16A34A"} />
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
