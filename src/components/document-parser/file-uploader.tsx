import { Button } from "@/components/ui/button";

const EXAMPLE_DOCS = [
  {
    title: "견적서 템플릿",
    image: "/examples/invoice.png",
    type: "PDF",
  },
  {
    title: "재무제표 샘플",
    image: "/examples/financial.png",
    type: "XLSX",
  },
  {
    title: "계약서 샘플",
    image: "/examples/contract.png",
    type: "DOCX",
  },
];

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  return (
    <div className="space-y-8 w-full max-w-md mx-auto mt-32">
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
            onClick={() => document.getElementById("file-input")?.click()}
          >
            파일 선택하기
          </Button>
          <span className="text-sm text-muted-foreground">
            {" "}
            또는 여기에 드래그 앤 드롭
          </span>
        </div>

        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf,.docx,.xlsx,.pptx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />

        <div className="text-sm text-muted-foreground">
          <p>JPEG, PNG, BMP, PDF, TIFF, HEIC, DOCX, XLSX, PPTX up to 50MB</p>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-sm font-medium text-center">
          또는 예제 문서 사용하기
        </h3>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {EXAMPLE_DOCS.map((doc, i) => (
            <div
              key={i}
              className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all overflow-hidden group rounded-lg bg-card"
            >
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-3">
                  <div>
                    <p className="text-sm font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
