import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchStudents() {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("profiles")
    .select("id, username, familyName");

  let students: {
    id: string;
    fullName: string;
  }[] = [];

  if (data) {
    students = data.map((e) => ({
      id: e.id,
      fullName:
        e.familyName && e.username
          ? e.familyName + " " + e.username
          : e.username
          ? e.username
          : e.familyName
          ? e.familyName
          : "inconnu",
    }));
  }

  return students;
}

// TODO : maybe update the query so that it joins with the justification table so the parent know if he already sent one or not
export const getStudents = () =>
  useQuery({
    queryKey: ["studentNames"],
    queryFn: async () => await fetchStudents(),
  });
