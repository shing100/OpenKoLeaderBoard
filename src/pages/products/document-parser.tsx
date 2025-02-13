import { Layout } from "@/components/layout";
import { useState } from "react";
import { useDocuments } from "@/lib/hooks/useDocuments";
import { Toolbar } from "@/components/document-parser/toolbar";
import { DocumentViewer } from "@/components/document-parser/document-viewer";
import { ParsedResults } from "@/components/document-parser/parsed-results";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs"

const DocumentParser = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { uploadDocument, updateParsedContent } = useDocuments();

  const handleFileSelect = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      setSelectedFile(file);
      setCurrentPage(1);
      setZoom(100);
      setRotation(0);

      const docId = await uploadDocument(file);
      const parsedContent = { text: "Sample parsed content" };
      await updateParsedContent(docId, parsedContent);
    } catch (error) {
      console.error("Error handling file:", error);
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload document",
      );
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] -mx-6 -mt-6">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col border-r">
            <Toolbar
              zoom={zoom}
              currentPage={currentPage}
              numPages={numPages}
              selectedFile={selectedFile}
              onZoomIn={() => setZoom((prev) => Math.min(prev + 10, 200))}
              onZoomOut={() => setZoom((prev) => Math.max(prev - 10, 50))}
              onRotate={() => setRotation((prev) => (prev + 90) % 360)}
              onPreviousPage={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              onNextPage={() =>
                setCurrentPage((prev) => Math.min(prev + 1, numPages || 1))
              }
              onDownload={handleDownload}
            />
            <DocumentViewer
              selectedFile={selectedFile}
              isUploading={isUploading}
              uploadError={uploadError}
              zoom={zoom}
              currentPage={currentPage}
              rotation={rotation}
              onFileSelect={handleFileSelect}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onErrorReset={() => setUploadError(null)}
            />
          </div>
          <ParsedResults
            isUploading={isUploading}
            uploadError={uploadError}
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DocumentParser;
