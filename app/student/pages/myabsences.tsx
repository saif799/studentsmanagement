import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSession } from "@/context/authProvider";
import { getAbsence } from "@/hooks/getAbsence";
import { supabase } from "@/lib/supabase";
import LoadingComp from "@/components/LoadingComp";
export default function Myabsences() {
  const { session } = useSession();
  const [loadingUserName, setLoadingUserName] = useState(true);
  const { data: absences, isLoading, isError } = getAbsence(session?.user.id);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (session) getUserName();
  }, [session]);

  async function getUserName() {
    try {
      setLoadingUserName(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoadingUserName(false);
    }
  }
  // TODO : handle the loading and error UI
  if (isLoading || !absences || loadingUserName) return <LoadingComp />;

  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4">
        <View className="w-full flex-row justify-between px-2 items-center pb-2">
          <Text className="text-lg font-pmedium  text-darkestGray ">
            Absences de : {username}
          </Text>
          <Text className="text-lg font-pregular text-white bg-red-400 px-2 pt-1 items-center rounded-md">
            {absences.length}
          </Text>
        </View>

        {absences.length ? (
          <ScrollView className="grow flex-1 w-full">
            {absences.map((e) => (
              <TouchableOpacity
                key={e.created_at}
                className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3 mb-3 flex-row justify-center items-center`}
              >
                <Text className="text-lg font-pmedium text-darkestGray pb-2">
                  {e.created_at}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <NoAbsences />
        )}
      </View>
    </>
  );
}

function NoAbsences() {
  return (
    <View className="w-full flex-1 items-center pt-[25%] bg-white">
      <Image
        source={require("@/assets/images/no-absences.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        Vous n'avez pas d'absences
      </Text>
    </View>
  );
}
