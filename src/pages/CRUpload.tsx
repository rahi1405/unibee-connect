import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Bell, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { getDepartmentName } from "@/utils/departments";

const CRUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dept = searchParams.get("dept");
  const level = searchParams.get("level");
  const term = searchParams.get("term");
  const [isUploading, setIsUploading] = useState(false);

  const handleNoticeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    
    // Simulate upload
    setTimeout(() => {
      toast.success("Notice posted successfully!");
      setIsUploading(false);
      e.currentTarget.reset();
    }, 1500);
  };

  const handleResourceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    
    // Simulate upload
    setTimeout(() => {
      toast.success("Resource uploaded successfully!");
      setIsUploading(false);
      e.currentTarget.reset();
    }, 1500);
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
              <h1 className="text-2xl font-bold">UniBee - CR Panel</h1>
              <p className="text-sm text-primary-foreground/90">
                {getDepartmentName(dept)} • Level {level} Term {term}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-secondary bg-clip-text text-transparent">
            Class Representative Upload Panel
          </h2>
          <p className="text-muted-foreground text-lg">Upload notices and resources for your classmates</p>
        </div>

        <Card className="shadow-2xl border-2 border-secondary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-secondary p-2 rounded-lg">
                <Upload className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Upload Content</CardTitle>
            </div>
            <CardDescription>Post notices or upload resources for your batch</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notice" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notice" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Post Notice
                </TabsTrigger>
                <TabsTrigger value="resource" className="gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Upload Resource
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notice" className="space-y-4 mt-6">
                <form onSubmit={handleNoticeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notice-title">Notice Title</Label>
                    <Input
                      id="notice-title"
                      name="title"
                      placeholder="e.g., Mid-term Exam Schedule"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notice-content">Notice Content</Label>
                    <Textarea
                      id="notice-content"
                      name="content"
                      placeholder="Enter the full notice details..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={isUploading}>
                    {isUploading ? "Posting..." : "Post Notice"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="resource" className="space-y-4 mt-6">
                <form onSubmit={handleResourceSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-title">Resource Title</Label>
                    <Input
                      id="resource-title"
                      name="title"
                      placeholder="e.g., DBMS Lab Manual"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resource-category">Category</Label>
                    <select
                      id="resource-category"
                      name="category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="past-papers">Past Papers</option>
                      <option value="ct-questions">CT Questions</option>
                      <option value="class-materials">Class Materials</option>
                      <option value="notes">Notes</option>
                      <option value="other">Other Resources</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Description</Label>
                    <Textarea
                      id="resource-description"
                      name="description"
                      placeholder="Brief description of the resource..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resource-file">Upload File</Label>
                    <Input
                      id="resource-file"
                      name="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX, PPT, PPTX, ZIP
                    </p>
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Resource"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRUpload;
