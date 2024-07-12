import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchChildren(parentId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);
  
  const { data } = await supabase
    .from("profiles")
    .select("  id, username, familyName, avatar_url")
    .eq("parentId", parentId);

  let students: {
    id: string;
    username: string;
    familyName: string;
    avatar_url: string;
  }[] = [];
  if (data) students = data;
  console.log(data);

  return students;
}

export const getChildren = (parentId: string | undefined) =>
  useQuery({
    queryKey: ["children"],
    queryFn: async () => await fetchChildren(parentId),
  });
