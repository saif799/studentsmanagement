import { queryClient } from "@/app/_layout";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const UploadPlanning = () =>
  useMutation({
    mutationFn: async ({ path }: { path: string }) =>
      await supabase.from("schedule").insert({ path }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planning"] }),
  });

export const UploadExamPlanning = () =>
  useMutation({
    mutationFn: async ({ path }: { path: string }) =>
      await supabase.from("exam_planning").insert({ path }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["exam_planning"] }),
    onError: (error) =>
      console.log("there was an error uploading exams ", error.message),
  });

export const UploadMaiter = () =>
  useMutation({
    mutationFn: async ({ path }: { path: string }) =>
      await supabase.from("matier").insert({ path }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["matier"] }),
  });

export const UploadRules = () =>
  useMutation({
    mutationFn: async ({ path }: { path: string }) =>
      await supabase.from("rules").insert({ path }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rules"] }),
    onError: (error) =>
      console.log(
        "there was an error uploading Règlement Intérieur ",
        error.message
      ),
  });
