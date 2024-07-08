import { Database } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export const AddChildMutation = () =>
  useMutation({
    mutationFn: async ({
      parentId,
      id,
    }: {
      parentId: string | undefined;
      id: string;
    }) => {
      const { data } = await supabase.from("profiles").select().eq("id", id);

      let retrievedRow: Database["public"]["Tables"]["profiles"]["Row"][] = [];
      if (data) {
        retrievedRow = data;
        if (retrievedRow[0].role !== "student") {
          Alert.alert("Ce Qr n'appartient pas à un étudiant");
        } else if (retrievedRow[0].parentId !== null) {
          Alert.alert("Cet étudiant est déja affecté");
        } else {
          await supabase.from("profiles").update({ parentId }).eq("id", id);
        }
      }
    },
  });
