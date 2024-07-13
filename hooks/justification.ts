import { supabase } from "@/lib/supabase";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

export const useJustification = (queryClient : QueryClient) =>
  useMutation({onSuccess : () => queryClient.invalidateQueries({queryKey : ["absence"]}) ,
    mutationFn: async ({
      file_path,
      absence_Id,
    }: {
      file_path: string;
      absence_Id: string;
    }) =>
      await supabase.from("justification").insert({ absence_Id, file_path }),
  });
  
export const useAcceptJustification = () =>
  useMutation({
    mutationFn: async ({
      id,
      presenceId,
    }: {
      id: string;
      presenceId: string;
    }) => {
      await supabase
        .from("justification")
        .update({ accepted: true })
        .eq("id", id);
      await supabase
        .from("presence")
        .update({ state: "present" })
        .eq("id", presenceId);
    },
  });
