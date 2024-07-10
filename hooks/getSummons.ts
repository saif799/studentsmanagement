import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchSummons(userId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("summons")
    .select("created_at,id, content , sent_to")
    .eq('profile_id',userId)
    .order("created_at", { ascending: false });

  let messages: {
    id: string;
    created_at: string;
    content : string;
    sent_to : string;
  }[] = [];
  if (data) messages = data;
  
  return messages;
}

// TODO : maybe update the query so that it joins with the justification table so the parent know if he already sent one or not
export const getSummons = (userId: string | undefined) =>
  useQuery({
    queryKey: ["summons", userId],
    queryFn: async () => await fetchSummons(userId),
  });
