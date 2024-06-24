import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const AddChildMutation = () =>
  useMutation({
    mutationFn: async ({
      parentId,
      id,
    }: {
      parentId: string | undefined;
      id: string;
    }) => supabase.from("profiles").update({ parentId }).eq("id", id),
  });
