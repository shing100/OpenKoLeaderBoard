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
    try {
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(filePath);

      // Create document record
      const { error: insertError } = await supabase.from("documents").insert([
        {
          name: file.name,
          file_type: fileExt,
          file_url: publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      // Refresh documents list
      await fetchDocuments();
      return publicUrl;
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
