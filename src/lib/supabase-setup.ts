import { supabase } from "./supabase";

export async function setupSupabase() {
  try {
    // Create documents bucket if it doesn't exist
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) throw bucketsError;

    const documentsBucketExists = buckets.some(
      (bucket) => bucket.name === "documents",
    );

    if (!documentsBucketExists) {
      const { error: createError } = await supabase.storage.createBucket(
        "documents",
        {
          public: true,
          fileSizeLimit: 52428800, // 50MB in bytes
          allowedMimeTypes: [
            "image/jpeg",
            "image/png",
            "image/bmp",
            "application/pdf",
            "image/tiff",
            "image/heic",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          ],
        },
      );

      if (createError) throw createError;
      console.log("Documents bucket created successfully");
    }
  } catch (error) {
    console.error("Error setting up Supabase:", error);
    throw error;
  }
}
