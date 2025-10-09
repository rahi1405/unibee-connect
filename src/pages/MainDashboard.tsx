import { useEffect, useState } from "react";
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
  LogOut,
  Upload
} from "lucide-react";
import logo from "@/assets/logo.png";
import { getDepartmentName } from "@/utils/departments";

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
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleFolderClick = (folderId: string) => {
    if (folderId === "upload") {
      navigate(`/cr-upload?dept=${dept}&level=${level}&term=${term}`);
    } else {
      navigate(`/folder-view?dept=${dept}&level=${level}&term=${term}&folder=${folderId}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate("/");
  };

  const isCR = userRole === 'cr';

  // Add CR upload folder if user is CR
  const displayFolders = isCR 
    ? [
        ...folders,
        {
          id: "upload",
          name: "Upload (CR Only)",
          icon: Upload,
          description: "Upload notices and resources",
          color: "bg-rose-500",
        }
      ]
    : folders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground border-b border-primary-light shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-light">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">UniBee</h1>
              <p className="text-sm text-primary-foreground/90">
                {getDepartmentName(dept)} • Level {level} Term {term}
                {isCR && <span className="ml-2 bg-secondary/20 px-2 py-0.5 rounded text-xs">CR</span>}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-light">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Notice Board */}
        <Card className="mb-8 border-2 border-secondary/50 bg-gradient-to-r from-secondary/10 to-secondary/5 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-secondary p-2 rounded-lg">
                <Bell className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl bg-gradient-secondary bg-clip-text text-transparent">Notice Board</CardTitle>
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
        <Card className="mb-8 border-2 border-primary/30 shadow-xl bg-card/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">Class Routine</CardTitle>
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
          <h2 className="text-3xl font-bold text-foreground mb-6 bg-gradient-primary bg-clip-text text-transparent">Resource Folders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFolders.map((folder) => {
              const Icon = folder.icon;
              return (
                <Card
                  key={folder.id}
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-secondary bg-card/80 backdrop-blur"
                  onClick={() => handleFolderClick(folder.id)}
                >
                  <CardHeader>
                    <div className={`${folder.color} p-4 rounded-xl w-fit mb-2 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{folder.name}</CardTitle>
                    <CardDescription>{folder.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-2 hover:bg-primary hover:text-primary-foreground">
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
