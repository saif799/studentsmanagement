import { NoNotes } from "@/app/student/pages/mynotes";
import ErrorComp from "@/components/ErrorComp";
import { LoadingAnimationComp } from "@/components/LoadingComp";
import { useCurrentChild } from "@/context/currentChild";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Chat() {
  const currentChild = useCurrentChild()
  // create some data from their GUi and make sure that the sent to property is your parent account
  const { data ,isLoading, isError} = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select("id,content,title,created_at")
        .eq("sent_to", currentChild.currentChild?.id);

      let content: {
        id: string;
        title: string;
        content: string;
        created_at: string;
      }[] = [];

      if (data) content = data;
      return content;
    },
  });

  if (isLoading) {
    return <LoadingAnimationComp />;
  }

  if (isError  ) {
    console.log(isError);
    
    return <ErrorComp />
  }

  if (!data) {
    return <NoNotes />
  }
  return (
    <View className="flex-1 bg-white items-center px-4 pt-4 relative">
      <View className="w-full flex-row justify-between px-2 items-center pb-2">
        <Text className="text-lg font-pmedium  text-darkestGray ">
          Notes pour : {currentChild.currentChild?.username}
        </Text>
        <Text
          className={`text-lg font-pregular text-white ${
            data.length > 0 ? "bg-red-400" : "bg-green-500"
          } px-2 pt-1 items-center rounded-md`}
        >
          {data.length}
        </Text>
      </View>

      {data.length ? (
        <ScrollView
          className="grow mb-[8vh] w-full h-full"
          showsVerticalScrollIndicator={false}
        >
          {data.map((n) => (
            <TouchableOpacity
              key={n.created_at}
              className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3 mb-3 justify-center items-center`}
            >
              <View className="w-full flex-row justify-between">
                <Text className="pl-1 text-lg max-w-[60%] font-pmedium text-darkestGray pb-2">
                  {n.title}
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
        <NoNotes />
      )}
    </View>
  );
}
