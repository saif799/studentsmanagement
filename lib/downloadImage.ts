import { supabase } from "./supabase";

export async function downloadImage(
  path: string,
  setImage: (path: string) => void
) {
  try {
    const { data, error } = await supabase.storage
      .from("content")
      .download(path);

    if (error) {
      throw error;
    }

    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      setImage(fr.result as string);
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error downloading image: ", error.message);
    }
  }
}
