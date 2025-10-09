import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, ThumbsUp, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getDepartmentName } from "@/utils/departments";

const ContentView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");
  const level = searchParams.get("level");
  const term = searchParams.get("term");
  const folder = searchParams.get("folder");
  const subfolder = searchParams.get("subfolder");
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  // Sample content - in real app, this would come from backend
  const sampleFiles = [
    { id: 1, name: "Lecture 01 - Introduction.pdf", likes: 45, comments: 12 },
    { id: 2, name: "Lecture 02 - Core Concepts.pdf", likes: 38, comments: 8 },
    { id: 3, name: "Tutorial Session Notes.pdf", likes: 52, comments: 15 },
    { id: 4, name: "Practice Problems Set 1.pdf", likes: 29, comments: 6 },
  ];

  const handleUpload = () => {
    if (!uploadFile || !noteTitle) {
      toast({
        title: "Upload Failed",
        description: "Please select a file and provide a title",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload Successful",
      description: "Your note has been uploaded successfully!",
    });

    setUploadFile(null);
    setNoteTitle("");
    setNoteDescription("");
  };

  const handleLike = (fileId: number) => {
    toast({
      title: "Liked!",
      description: "You liked this content",
    });
  };

  const isNotesFolder = folder === "notes";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground border-b border-primary-light shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/folder-view?dept=${dept}&level=${level}&term=${term}&folder=${folder}`)}
              className="text-primary-foreground hover:bg-primary-light"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">UniBee</h1>
              <p className="text-sm text-primary-foreground/90">
                {getDepartmentName(dept)} • {subfolder?.replace(/-/g, ' ').toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Section for Notes */}
        {isNotesFolder && (
          <Card className="mb-8 border-2 border-secondary/50 bg-gradient-to-r from-secondary/10 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-secondary bg-clip-text text-transparent">
                Upload Your Notes
              </CardTitle>
              <CardDescription>Share your notes with classmates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Note Title</label>
                <Input 
                  placeholder="e.g., Chapter 3 Summary Notes"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                <Textarea 
                  placeholder="Brief description of the content..."
                  value={noteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Upload File</label>
                <Input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button 
                onClick={handleUpload}
                variant="hero"
                className="w-full"
              >
                Upload Note
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Content List */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Available Content</h2>
          <p className="text-muted-foreground">Browse and download materials</p>
        </div>

        <div className="grid gap-4">
          {sampleFiles.map((file) => (
            <Card 
              key={file.id} 
              className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary bg-card/80 backdrop-blur"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-gradient-primary p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">{file.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {file.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {file.comments} comments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => handleLike(file.id)}
                      className="border-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="default"
                      onClick={() => toast({ title: "Downloading...", description: file.name })}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentView;
