import { useSession } from "@/context/authProvider";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const { session } = useSession();

  // create some data from their GUi and make sure that the sent to property is your parent account
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select("id,content,title")
        .eq("sent_to", session!.user!.id);

      let content: {
        id: string;
        title: string;
        content: string;
      }[] = [];

      if (data) content = data;
      return content;
    },
  });

  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      <ScrollView className="px-4">
        {data?.map((message) => (
          <View
            key={message.id}
            className="w-full text-center border border-grayBorder rounded-lg p-4 mb-3 bg-gray-50 "
          >
            <Text className="text-lg font-medium">{message.title}</Text>
            <Text className="text-md font-light">{message.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
