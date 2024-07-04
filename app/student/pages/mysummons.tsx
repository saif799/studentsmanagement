import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,

  } from "react-native";
  
  import React from "react";
  import { useSession } from "@/context/authProvider";
  import  { LoadingAnimationComp } from "@/components/LoadingComp";
  import ErrorComp from "@/components/ErrorComp";
import { getStudentSummons } from "@/hooks/getStudentSummons";
  export default function StudentSummons() {
    const { session } = useSession();
    const { data: summons, isLoading, isError } = getStudentSummons(session?.user.id);
  
    if (isError ) return <ErrorComp />;
    // TODO : handle the loading and error UI
    if (isLoading || !summons )
      return <LoadingAnimationComp />;
 
  
    return (
      <>
        <View className="flex-1 bg-white items-center px-4 pt-4 relative">
        <View className="w-full flex-row justify-between px-2 items-center pb-2">
          <Text className="text-lg font-pmedium  text-darkestGray ">
            Vos Convocations : 
          </Text>
          <Text className={`text-lg font-pregular text-white ${summons.length > 0 ? 'bg-red-400' : "bg-green-500" } px-2 pt-1 items-center rounded-md`}>
            {summons.length}
          </Text>
        </View>
  
          {summons.length ? (
            <ScrollView
              className="grow mb-[8vh] w-full h-full"
              showsVerticalScrollIndicator={false}
            >
              {summons.map((n,index) => (
                <TouchableOpacity
                  key={n.created_at}
                  className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3 mb-3 justify-center items-center`}
                >
                  
                  <View className="w-full flex-row justify-between">
                    <Text className="pl-1 text-lg font-pmedium text-darkestGray pb-2">
                      Convocation {index+1}
                    </Text>
  
                    <Text className="text-lg font-pregular text-disabledGray pb-2">
                      {n.created_at.slice(0, 10)}
                    </Text>
                  </View>
  
                  <Text className="w-full pl-2 text-base font-plight text-darkestGray pb-2">
                    {n.content}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <NoSummons />
          )}
          
        </View>
      </>
    );
  }
  
  function NoSummons() {
    return (
      <View className="w-full flex-1 items-center pt-[25%] bg-white">
        <Image
          source={require("@/assets/images/no-absences.png")}
          resizeMode="contain"
          className="w-full h-1/2 border"
        />
        <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
          pas des convocation pour le moment
        </Text>
      </View>
    );
  }
  
  