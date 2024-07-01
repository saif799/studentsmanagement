import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const studentNotes = [
  { matiere: "Mathématiques", coefficient: 5, moyenne: 15.5 },
  { matiere: "Physique", coefficient: 4, moyenne: 14.0 },
  { matiere: "Sciences naturelles", coefficient: 4, moyenne: 14.0 },
  { matiere: "Informatique", coefficient: 3, moyenne: 16.0 },
  { matiere: "Français", coefficient: 2, moyenne: 14.5 },
  { matiere: "Anglais", coefficient: 2, moyenne: 9.0 },
  { matiere: "Histoire", coefficient: 2, moyenne: 8.5 },
  { matiere: "Géographie", coefficient: 2, moyenne: 7.0 },
  { matiere: "Philosophie", coefficient: 1, moyenne: 14.0 },
  { matiere: "Éducation Physique", coefficient: 1, moyenne: 17.0 },
  { matiere: "Éducation Islamique", coefficient: 2, moyenne: 15.0 }
];



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

export const getMyNotes = (studentId?: string) => {return studentNotes};
  // useQuery({
  //   queryKey: ["myNotes", studentId],
  //   queryFn: async () => await fetchMyNotes(studentId),
  // });
