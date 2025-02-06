import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, RotateCcw, Share } from "lucide-react";
import { useState } from "react";
import { useDocuments } from "@/lib/hooks/useDocuments";

const EXAMPLE_DOCS = [
  {
    title: "Invoice Template",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=200&h=280&auto=format&fit=crop",
    type: "PDF",
  },
  {
    title: "Financial Report",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=200&h=280&auto=format&fit=crop",
    type: "XLSX",
  },
  {
    title: "Business Contract",
    image:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=200&h=280&auto=format&fit=crop",
    type: "DOCX",
  },
];

const DocumentParser = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const { documents, loading, error, uploadDocument, updateParsedContent } =
    useDocuments();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      setSelectedFile(file);

      const url = await uploadDocument(file);
      // Here you would typically call your document parsing API
      const parsedContent = { text: "Sample parsed content" };
      await updateParsedContent(url, parsedContent);
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

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Left Panel - Document Viewer */}
          <Card className="flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm">{zoom}%</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom(100)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} / 1
                </span>
                <Button variant="ghost" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Document View */}
            <ScrollArea className="flex-1">
              <div className="p-8 min-h-full flex items-center justify-center">
                {isUploading ? (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Uploading document...
                    </p>
                  </div>
                ) : uploadError ? (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-destructive"
                      >
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-destructive">
                        Upload failed
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {uploadError}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadError(null)}
                      >
                        Try again
                      </Button>
                    </div>
                  </div>
                ) : selectedFile ? (
                  <div
                    className="relative bg-white shadow-lg"
                    style={{
                      width: `${(zoom / 100) * 595}px`,
                      height: `${(zoom / 100) * 842}px`,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected document"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="space-y-8 w-full max-w-md">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 rounded-lg border-2 border-dashed flex items-center justify-center mx-auto">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground/40"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="text-primary"
                          onClick={() =>
                            document.getElementById("file-input")?.click()
                          }
                        >
                          Select a file
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          or drop it here
                        </span>
                      </div>

                      <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf,.docx,.xlsx,.pptx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file);
                        }}
                      />

                      <div className="text-sm text-muted-foreground">
                        <p>
                          The demo shows only the first three pages for
                          multi-page files.
                        </p>
                        <p>
                          JPEG, PNG, BMP, PDF, TIFF, HEIC, DOCX, XLSX, PPTX up
                          to 50MB
                        </p>
                      </div>
                    </div>

                    {/* Example Documents */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-center">
                        Or try an example
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {EXAMPLE_DOCS.map((doc, i) => (
                          <Card
                            key={i}
                            className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all overflow-hidden group"
                          >
                            <div className="relative">
                              <img
                                src={doc.image}
                                alt={doc.title}
                                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-3">
                                <div>
                                  <p className="text-sm font-medium">
                                    {doc.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.type}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Right Panel - Parsed Results */}
          <Card className="flex flex-col">
            <div className="border-b p-4">
              <h2 className="font-semibold">Parsed Results</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              {isUploading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="space-y-4 text-center">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Processing document...
                    </p>
                  </div>
                </div>
              ) : uploadError ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Failed to process document
                </div>
              ) : selectedFile ? (
                <div className="space-y-4">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Upload a document to see parsed results
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentParser;
