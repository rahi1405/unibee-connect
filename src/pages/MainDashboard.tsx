import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  FileText, 
  BookOpen, 
  Link as LinkIcon,
  StickyNote,
  Bell,
  Calendar,
  ArrowLeft,
  LogOut
} from "lucide-react";
import logo from "@/assets/logo.png";

const folders = [
  {
    id: "resources",
    name: "Resources",
    icon: FolderOpen,
    description: "Past papers, CT questions, and senior notes",
    color: "bg-blue-500",
  },
  {
    id: "materials",
    name: "Class Materials",
    icon: FileText,
    description: "Lecture slides and course materials",
    color: "bg-green-500",
  },
  {
    id: "sources",
    name: "Sources",
    icon: LinkIcon,
    description: "Journal links, YouTube videos, and demos",
    color: "bg-purple-500",
  },
  {
    id: "notes",
    name: "Notes",
    icon: StickyNote,
    description: "Student-uploaded notes and study materials",
    color: "bg-amber-500",
  },
];

const MainDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");
  const level = searchParams.get("level");
  const term = searchParams.get("term");

  const handleFolderClick = (folderId: string) => {
    // Navigate to folder view - to be implemented
    console.log(`Opening folder: ${folderId}`);
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
              <p className="text-sm text-muted-foreground">
                Dept {dept} • Level {level} Term {term}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Notice Board */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Notice Board</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground">Mid-term Examination Schedule Released</p>
              <p className="text-sm text-muted-foreground mt-1">Posted 2 days ago</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground">Lab Report Submission Deadline Extended</p>
              <p className="text-sm text-muted-foreground mt-1">Posted 5 days ago</p>
            </div>
          </CardContent>
        </Card>

        {/* Routine */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-secondary" />
              <CardTitle className="text-2xl">Class Routine</CardTitle>
            </div>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Database Management Systems</p>
                  <p className="text-sm text-muted-foreground">Room: A-301</p>
                </div>
                <span className="text-primary font-semibold">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Digital Signal Processing</p>
                  <p className="text-sm text-muted-foreground">Room: B-205</p>
                </div>
                <span className="text-primary font-semibold">11:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Machine Learning Lab</p>
                  <p className="text-sm text-muted-foreground">Lab: C-102</p>
                </div>
                <span className="text-primary font-semibold">2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Folders */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Resource Folders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <Card
                  key={folder.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-primary"
                  onClick={() => handleFolderClick(folder.id)}
                >
                  <CardHeader>
                    <div className={`${folder.color} p-4 rounded-lg w-fit mb-2`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{folder.name}</CardTitle>
                    <CardDescription>{folder.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Open Folder
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
