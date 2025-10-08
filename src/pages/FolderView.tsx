import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderOpen, FileText, Video, Link as LinkIcon, FileUp } from "lucide-react";
import logo from "@/assets/logo.png";

const folderContents: Record<string, Array<{ id: string; name: string; icon: any; description: string; color: string }>> = {
  resources: [
    { id: "past-papers", name: "5 Years Term Questions", icon: FileText, description: "Past exam papers collection", color: "bg-blue-600" },
    { id: "ct-questions", name: "Last Year CT Questions", icon: FileText, description: "Class test questions", color: "bg-indigo-600" },
    { id: "last-year-materials", name: "Class Materials of Last Year", icon: FolderOpen, description: "Previous year resources", color: "bg-violet-600" },
    { id: "chothas", name: "Chothas (Senior Notes)", icon: FileText, description: "Top-rated senior notes", color: "bg-purple-600" },
  ],
  materials: [
    { id: "dbms", name: "Database Management Systems", icon: FileText, description: "DBMS lecture slides", color: "bg-green-600" },
    { id: "java", name: "JAVA Programming", icon: FileText, description: "JAVA course materials", color: "bg-emerald-600" },
    { id: "dsp", name: "Digital Signal Processing", icon: FileText, description: "DSP slides and notes", color: "bg-teal-600" },
    { id: "machine", name: "Machine Learning", icon: FileText, description: "ML course content", color: "bg-cyan-600" },
    { id: "math", name: "Mathematics", icon: FileText, description: "Math lecture slides", color: "bg-sky-600" },
  ],
  sources: [
    { id: "dbms-sources", name: "DBMS Resources", icon: LinkIcon, description: "Journals, videos, demos", color: "bg-purple-600" },
    { id: "java-sources", name: "JAVA Resources", icon: Video, description: "Video tutorials and demos", color: "bg-fuchsia-600" },
    { id: "dsp-sources", name: "DSP Resources", icon: LinkIcon, description: "External learning resources", color: "bg-pink-600" },
    { id: "machine-sources", name: "ML Resources", icon: Video, description: "Machine learning tutorials", color: "bg-rose-600" },
    { id: "math-sources", name: "Math Resources", icon: LinkIcon, description: "Math video lectures", color: "bg-red-600" },
  ],
  notes: [
    { id: "dbms-notes", name: "DBMS Student Notes", icon: FileUp, description: "Upload and view notes", color: "bg-amber-600" },
    { id: "java-notes", name: "JAVA Student Notes", icon: FileUp, description: "Community shared notes", color: "bg-yellow-600" },
    { id: "dsp-notes", name: "DSP Student Notes", icon: FileUp, description: "Student contributions", color: "bg-lime-600" },
    { id: "machine-notes", name: "ML Student Notes", icon: FileUp, description: "Collaborative notes", color: "bg-orange-600" },
    { id: "math-notes", name: "Math Student Notes", icon: FileUp, description: "Peer-reviewed notes", color: "bg-amber-500" },
  ],
};

const FolderView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");
  const level = searchParams.get("level");
  const term = searchParams.get("term");
  const folder = searchParams.get("folder") || "";

  const contents = folderContents[folder] || [];

  const handleSubFolderClick = (subFolderId: string) => {
    navigate(`/content-view?dept=${dept}&level=${level}&term=${term}&folder=${folder}&subfolder=${subFolderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground border-b border-primary-light shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/main-dashboard?dept=${dept}&level=${level}&term=${term}`)}
              className="text-primary-foreground hover:bg-primary-light"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">UniBee</h1>
              <p className="text-sm text-primary-foreground/90">
                {folder.charAt(0).toUpperCase() + folder.slice(1)} • Level {level} Term {term}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {folder.charAt(0).toUpperCase() + folder.slice(1)}
          </h2>
          <p className="text-muted-foreground text-lg">Browse available content</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary bg-card/80 backdrop-blur"
                onClick={() => handleSubFolderClick(item.id)}
              >
                <CardHeader>
                  <div className={`${item.color} p-4 rounded-xl w-fit mb-3 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{item.name}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
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
  );
};

export default FolderView;
