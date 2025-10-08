import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const departments = [
  { id: "01", name: "Civil Engineering" },
  { id: "02", name: "Electrical & Electronic Engineering" },
  { id: "03", name: "Mechanical Engineering" },
  { id: "04", name: "Computer Science & Engineering" },
  { id: "05", name: "Urban & Regional Planning" },
  { id: "06", name: "Architecture" },
  { id: "07", name: "Petroleum & Mining Engineering" },
  { id: "08", name: "Electronics & Telecommunication Engineering" },
  { id: "11", name: "Biomedical Engineering" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deptFromUrl = searchParams.get("dept");
  const [selectedDept, setSelectedDept] = useState<string | null>(deptFromUrl);

  const handleDepartmentSelect = (deptId: string) => {
    setSelectedDept(deptId);
    navigate(`/level-selection?dept=${deptId}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="UniBee" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">UniBee</h1>
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
          <h2 className="text-4xl font-bold text-foreground mb-2">Select Your Department</h2>
          <p className="text-muted-foreground">Choose your department to access resources</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-primary"
              onClick={() => handleDepartmentSelect(dept.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-primary p-3 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Dept {dept.id}</CardTitle>
                </div>
                <CardDescription className="text-base font-medium text-foreground">
                  {dept.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Enter Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
