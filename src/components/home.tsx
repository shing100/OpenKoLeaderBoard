import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ModelComparisonGrid from "./dashboard/ModelComparisonGrid";
import ModelSubmissionForm from "./dashboard/ModelSubmissionForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, LogIn, Plus } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useNavigate, Route, Routes } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between max-w-[1400px] mx-auto">
            <div className="flex items-center gap-8">
              <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                LLM Benchmark
              </h1>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Models</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Leaderboard
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Compare and analyze performance metrics across
                                different models
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Benchmarks</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <ListItem
                          href="/benchmarks/text"
                          title="Text Generation"
                        >
                          Natural language generation and completion tasks
                        </ListItem>
                        <ListItem
                          href="/benchmarks/code"
                          title="Code Generation"
                        >
                          Code completion and generation capabilities
                        </ListItem>
                        <ListItem href="/benchmarks/vision" title="Vision">
                          Image understanding and generation tasks
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <ListItem href="/docs" title="Documentation">
                          Guides and API documentation
                        </ListItem>
                        <ListItem href="/blog" title="Blog">
                          Latest updates and insights
                        </ListItem>
                        <ListItem href="/community" title="Community">
                          Join our Discord community
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-[300px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button onClick={() => navigate("/submit")} className="gap-2">
                <Plus className="h-4 w-4" />
                Submit Model
              </Button>
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => logout()}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => loginWithRedirect()}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-6 space-y-6">
            <Routes>
              <Route
                path="/"
                element={<ModelComparisonGrid searchQuery={searchQuery} />}
              />
              <Route path="/submit" element={<ModelSubmissionForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const ListItem = ({ className, title, children, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default Home;