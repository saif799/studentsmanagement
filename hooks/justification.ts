import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useJustification = () =>
  useMutation({
    mutationFn: async (absence_Id: string) =>
      await supabase.from("justification").insert({ absence_Id }),
  });
