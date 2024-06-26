import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchMyNotes(studentId: string) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("notes")
    .select("math,asd")
    .eq("student_id", studentId)
    .single();

  let students: {
    math: string;
    asd: string;
  } = {
    math: "",
    asd: "",
  };

  if (data) students = data;

  return students;
}

export const getMyNotes = (studentId: string) =>
  useQuery({
    queryKey: ["myNotes", studentId],
    queryFn: async () => await fetchMyNotes(studentId),
  });
