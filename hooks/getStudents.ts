import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchStudents() {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("profiles")
    .select("id, username, familyName, avatar_url")
    .eq("role", "student");

  let students: {
    id: string;
    username: string;
    familyName: string;
    avatar_url: string;
  }[] = [];

  if (data) students = data;
  return students;
}

export const getStudents = () =>
  useQuery({
    queryKey: ["Students"],
    queryFn: async () => await fetchStudents(),
  });
