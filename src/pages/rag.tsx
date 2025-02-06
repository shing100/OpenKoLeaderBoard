import { useState } from "react";
import RagGrid from "@/components/dashboard/RagGrid";
import { Layout } from "@/components/layout";

const Rag = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <RagGrid searchQuery={searchQuery} />
    </Layout>
  );
};

export default Rag;
