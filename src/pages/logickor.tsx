import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LogicKorGrid from "@/components/dashboard/LogicKorGrid";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const LogicKor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto h-14">
          <div className="flex items-center gap-8">
            <h1
              className="text-xl font-bold cursor-pointer hover:text-primary/90 transition-colors"
              onClick={() => navigate("/")}
            >
              {t("llm_benchmark")}
            </h1>

            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 text-base">
                    {t("leaderboard")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-card">
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                          onClick={() => navigate("/")}
                        >
                          <div className="text-base font-medium mb-1">
                            Korean LLM
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t("leaderboard_desc")}
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                          onClick={() => navigate("/logickor")}
                        >
                          <div className="text-base font-medium mb-1">
                            LogicKor
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive evaluation of Korean language models
                            across logical reasoning tasks
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 text-base">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-card">
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                        >
                          <div className="text-base font-medium mb-1">
                            {t("text_generation")}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t("text_generation_desc")}
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                        >
                          <div className="text-base font-medium mb-1">
                            {t("code_generation")}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t("code_generation_desc")}
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                        >
                          <div className="text-base font-medium mb-1">
                            {t("vision")}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t("vision_desc")}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 text-base">
                    {t("resources")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] bg-card">
                      <li>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            "w-full cursor-pointer",
                          )}
                        >
                          <div className="text-base font-medium mb-1">
                            {t("documentation")}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t("documentation_desc")}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-[280px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search_models")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/10">
        <div className="max-w-[1670px] w-full mx-auto p-6 space-y-6">
          <LogicKorGrid searchQuery={searchQuery} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LogicKor;
