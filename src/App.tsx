import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LogicKor from "./pages/logickor";
import Rag from "./pages/rag";
import DocumentParser from "./pages/products/document-parser";
import ChatProduct from "./pages/products/chat";
import Embedding from "./pages/products/embedding";
import Documentation from "./pages/documentation";
import routes from "tempo-routes";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logickor" element={<LogicKor />} />
        <Route path="/rag" element={<Rag />} />
        <Route path="/products/document-parser" element={<DocumentParser />} />
        <Route path="/products/chat" element={<ChatProduct />} />
        <Route path="/products/embedding" element={<Embedding />} />
        <Route path="/documentation" element={<Documentation />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
