import { Database } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export const AddStudentMutation = () =>
  useMutation({
    mutationFn: async ({
      school,
      id,
    }: {
      school: string | undefined;
      id: string;
    }) => {
      const { data } = await supabase.from("profiles").select().eq("id", id);

      let retrievedRow: Database["public"]["Tables"]["profiles"]["Row"][] = [];
      if (data) {
        retrievedRow = data;
        if (retrievedRow[0].role !== "student") {
          Alert.alert("Ce Qr n'appartient pas à un étudiant");
        } else if (retrievedRow[0].school !== null) {
          Alert.alert("Cet étudiant est déja affecté");
        } else {
          await supabase.from("profiles").update({ school }).eq("id", id);
        }
      }
    },
  });
