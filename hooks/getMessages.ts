import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchMessages(userId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("messages")
    .select("created_at,id, content , title , sent_to")
    .eq('profile_id',userId)
    .order("created_at", { ascending: false });

  let messages: {
    id: string;
    created_at: string;
    content : string;
    title : string;
    sent_to : string;
  }[] = [];
  if (data) messages = data;
  
  return messages;
}

// TODO : maybe update the query so that it joins with the justification table so the parent know if he already sent one or not
export const getMessages = (userId: string | undefined) =>
  useQuery({
    queryKey: ["messages", userId],
    queryFn: async () => await fetchMessages(userId),
  });
