import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchAbsence(userId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("presence")
    .select("created_at,id")
    .match({ userId: userId, state: "absent" });

  let absences: {
    id: string;
    created_at: string;
  }[] = [];
  if (data) absences = data;
  return absences;
}

// TODO : maybe update the query so that it joins with the justification table so the parent know if he already sent one or not
export const getAbsence = (userId: string | undefined) =>
  useQuery({
    queryKey: ["absence", userId],
    queryFn: async () => await fetchAbsence(userId),
  });
