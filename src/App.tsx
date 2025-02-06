import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LogicKor from "./pages/logickor";
import Rag from "./pages/rag";
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
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logickor" element={<LogicKor />} />
        <Route path="/rag" element={<Rag />} />
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
