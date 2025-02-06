import { useState } from "react";
import LogicKorGrid from "@/components/dashboard/LogicKorGrid";
import { Layout } from "@/components/layout";

const LogicKor = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <LogicKorGrid searchQuery={searchQuery} />
    </Layout>
  );
};

export default LogicKor;
