import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Document {
  id: string;
  name: string;
  file_type: string;
  file_url: string;
  parsed_content: any;
  created_at: string;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File) => {
    // Convert HWP PDF to standard PDF mime type if needed
    const modifiedFile = new File([file], file.name, {
      type:
        file.type === "application/haansoftpdf" ? "application/pdf" : file.type,
    });
    try {
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Create bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.some((bucket) => bucket.name === "documents")) {
        const { error: createError } = await supabase.storage.createBucket(
          "documents",
          {
            public: true,
            fileSizeLimit: 52428800, // 50MB
            allowedMimeTypes: [
              "image/jpeg",
              "image/png",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ],
          },
        );
        if (createError) throw createError;
      }

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, modifiedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(filePath);

      // Create document record and return the inserted row
      const { data: insertedDoc, error: insertError } = await supabase
        .from("documents")
        .insert([
          {
            name: file.name,
            file_type: fileExt,
            file_url: publicUrl,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Refresh documents list
      await fetchDocuments();
      return insertedDoc.id;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  const updateParsedContent = async (id: string, content: any) => {
    try {
      const { error } = await supabase
        .from("documents")
        .update({ parsed_content: content })
        .eq("id", id);

      if (error) throw error;
      await fetchDocuments();
    } catch (error) {
      console.error("Error updating parsed content:", error);
      throw error;
    }
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    updateParsedContent,
    refresh: fetchDocuments,
  };
}
