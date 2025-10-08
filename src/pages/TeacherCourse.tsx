import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Bell, FileText, Send } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";

const TeacherCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const level = searchParams.get("level");
  const term = searchParams.get("term");

  const [slideFile, setSlideFile] = useState<File | null>(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const handleUploadSlide = () => {
    if (!slideFile || !slideTitle) {
      toast({
        title: "Upload Failed",
        description: "Please select a file and provide a title",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Slide Uploaded",
      description: "Class material has been uploaded successfully!",
    });

    setSlideFile(null);
    setSlideTitle("");
  };

  const handlePostNotice = () => {
    if (!noticeTitle || !noticeContent) {
      toast({
        title: "Post Failed",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice Posted",
      description: "Your notice has been published successfully!",
    });

    setNoticeTitle("");
    setNoticeContent("");
  };

  const handleSendMessage = () => {
    if (!messageContent) {
      toast({
        title: "Send Failed",
        description: "Please write a message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent to all students!",
    });

    setMessageContent("");
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
              onClick={() => navigate("/teacher-dashboard")}
              className="text-primary-foreground hover:bg-primary-light"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">Course Management</h1>
              <p className="text-sm text-primary-foreground/90">
                {courseId?.toUpperCase()} • Level {level} Term {term}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="slides" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 backdrop-blur border-2">
            <TabsTrigger value="slides" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              <Upload className="w-4 h-4 mr-2" />
              Upload Slides
            </TabsTrigger>
            <TabsTrigger value="notices" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4 mr-2" />
              Post Notices
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              <Send className="w-4 h-4 mr-2" />
              Send Messages
            </TabsTrigger>
          </TabsList>

          {/* Upload Slides Tab */}
          <TabsContent value="slides">
            <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-primary p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Upload Class Materials</CardTitle>
                    <CardDescription>Share lecture slides and course materials with students</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Material Title</label>
                  <Input 
                    placeholder="e.g., Lecture 5 - Advanced Topics"
                    value={slideTitle}
                    onChange={(e) => setSlideTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload File</label>
                  <Input 
                    type="file" 
                    accept=".pdf,.ppt,.pptx"
                    onChange={(e) => setSlideFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Supported formats: PDF, PPT, PPTX</p>
                </div>
                <Button onClick={handleUploadSlide} variant="hero" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Material
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Notices Tab */}
          <TabsContent value="notices">
            <Card className="border-2 border-secondary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-secondary p-3 rounded-lg">
                    <Bell className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Post Notice</CardTitle>
                    <CardDescription>Create important announcements for students</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Notice Title</label>
                  <Input 
                    placeholder="e.g., Mid-term Exam Schedule"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Notice Content</label>
                  <Textarea 
                    placeholder="Write the notice details here..."
                    rows={6}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                  />
                </div>
                <Button onClick={handlePostNotice} variant="accent" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Publish Notice
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Send Messages Tab */}
          <TabsContent value="messages">
            <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-accent p-3 rounded-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Send Message</CardTitle>
                    <CardDescription>Communicate directly with all enrolled students</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Type your message to students..."
                    rows={8}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendMessage} variant="hero" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send to All Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherCourse;
