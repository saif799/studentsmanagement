import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchStudentMessages(userId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("messages")
    .select("created_at,id, content , title , sent_to")
    .eq('sent_to',userId)
    .order("created_at", { ascending: true });

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
export const getStudentMessages = (userId: string | undefined) =>
  useQuery({
    queryKey: ["stumessages", userId],
    queryFn: async () => await fetchStudentMessages(userId),
  });
