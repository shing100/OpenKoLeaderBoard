import { useState } from "react";
import ModelComparisonGrid from "./dashboard/ModelComparisonGrid";
import { Layout } from "./layout";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <ModelComparisonGrid searchQuery={searchQuery} />
    </Layout>
  );
};

export default Home;
