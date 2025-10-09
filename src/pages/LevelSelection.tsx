import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { getDepartmentName } from "@/utils/departments";

const levels = [
  { level: "1", terms: ["1", "2"] },
  { level: "2", terms: ["1", "2"] },
  { level: "3", terms: ["1", "2"] },
  { level: "4", terms: ["1", "2"] },
];

const LevelSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");

  const handleLevelTermSelect = (level: string, term: string) => {
    navigate(`/main-dashboard?dept=${dept}&level=${level}&term=${term}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-primary">UniBee</h1>
              <p className="text-sm text-muted-foreground">{getDepartmentName(dept)}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-2">Select Level & Term</h2>
          <p className="text-muted-foreground">{getDepartmentName(dept)} - Choose your academic level and term</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {levels.map(({ level, terms }) => (
            <Card key={level} className="border-2">
              <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Level {level}
                </CardTitle>
                <CardDescription className="text-white/80">
                  Select a term to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="lg"
                      className="h-20 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={() => handleLevelTermSelect(level, term)}
                    >
                      Term {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;
