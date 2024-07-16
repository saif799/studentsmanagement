import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

async function fetchAbsence(userId: string | undefined) {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("presence")
    .select("created_at,id ,justification(id,accepted)")
    .match({ userId: userId })
    .order("created_at", { ascending: true });

  let absences: {
    id: string;
    created_at: string;
    justification: {
      id: string;
      accepted: string;
    }[];
  }[] = [];
  if (data) absences = data;
  return absences;
}
async function fetchJustification() {
  // const setCurrentCHild = useCurrentChild((state) => state.change);

  const { data } = await supabase
    .from("justification")
    .select("created_at,id ,accepted,presence(id,created_at)")
    .order("created_at", { ascending: true });

  let justification: {
    id: string;
    created_at: string;
    accepted: boolean;
    presence: {
      created_at: string;
    }[];
  }[] = [];
  if (data) justification = data;
  return justification;
}
async function fetchUnAcceptedJustification(school: string) {

  const { data } = await supabase
    .from("justification")
    .select(
      "created_at, id, accepted, file_path, absence_Id, presence(id , userId , profiles(id , school , username , familyName))"
    )
    .match({ accepted: false, "presence.profiles.school": school })
    .order("created_at", { ascending: true });
      
  let justification: {
    id: string;
    created_at: string;
    accepted: boolean;
    file_path: string;
    absence_Id: string;
    presence: {
      id: string;
      userId: string;
      profiles: {
        id: string;
        school: string;
        username: string;
        familyName: string;
      }[];
    }[];
  }[] = [];

  if (data) {
    justification = data;
  }
  console.log(justification);
  
  return justification;
}

// TODO : maybe update the query so that it joins with the justification table so the parent know if he already sent one or not
export const getAbsence = (userId: string | undefined) =>
  useQuery({
    queryKey: ["absence", userId],
    queryFn: async () => await fetchAbsence(userId),
  });

export const getJustification = () =>
  useQuery({
    queryKey: ["justification"],
    queryFn: async () => await fetchJustification(),
  });

export const getUnaAcceptedJustification = (schoolId: string) =>
  useQuery({
    queryKey: ["admin_justification"],
    queryFn: async () => await fetchUnAcceptedJustification(schoolId),
  });
