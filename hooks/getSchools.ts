import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchSchools() {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("role", "admin");

  let schools: {
    id: string;
    username: string;
  }[] = [];

  if (data) schools = data;
  return schools;
}

export const getSchools = () =>
  useQuery({
    queryKey: ["Schools"],
    queryFn: async () => await fetchSchools(),
  });
