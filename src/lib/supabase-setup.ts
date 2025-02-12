import { supabase } from "./supabase";

export async function setupSupabase() {
  try {
    // Create documents bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();

    if (!buckets?.some((bucket) => bucket.name === "documents")) {
      await supabase.storage.createBucket("documents", {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/bmp",
          "application/pdf",
          "application/haansoftpdf",
          "application/x-pdf",
          "image/tiff",
          "image/heic",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ],
      });
      console.log("Documents bucket created successfully");
    }

    // Update bucket to be public
    await supabase.storage.updateBucket("documents", {
      public: true,
      fileSizeLimit: 52428800,
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
    });
  } catch (error) {
    console.error("Error setting up Supabase:", error);
    throw error;
  }
}
