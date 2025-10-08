import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, FileText, Bell, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { getDepartmentName } from "@/lib/departments";
import logo from "@/assets/logo.png";

interface Notice {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  folder: string;
  created_at: string;
}

const UploadView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile } = useAuth();
  const dept = searchParams.get("dept") || profile?.department_id || "";
  const level = parseInt(searchParams.get("level") || "1");
  const term = parseInt(searchParams.get("term") || "1");

  const [uploadType, setUploadType] = useState<"notice" | "resource">("notice");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  const [noticeForm, setNoticeForm] = useState({ title: "", content: "" });
  const [resourceForm, setResourceForm] = useState({
    title: "",
    type: "pdf",
    url: "",
    folder: "resources",
  });

  useEffect(() => {
    if (profile?.role === 'cr' && profile.is_verified) {
      loadNotices();
      loadResources();
    }
  }, [profile]);

  const loadNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('department_id', dept)
        .eq('level', level)
        .eq('term', term)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error loading notices:', error);
    }
  };

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('department_id', dept)
        .eq('level', level)
        .eq('term', term)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('notices').insert({
        title: noticeForm.title,
        content: noticeForm.content,
        department_id: dept,
        level,
        term,
        uploaded_by: profile.id,
      });

      if (error) throw error;

      toast.success("Notice uploaded successfully!");
      setNoticeForm({ title: "", content: "" });
      loadNotices();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload notice");
    } finally {
      setLoading(false);
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('resources').insert({
        title: resourceForm.title,
        type: resourceForm.type,
        url: resourceForm.url,
        folder: resourceForm.folder,
        department_id: dept,
        level,
        term,
        uploaded_by: profile.id,
      });

      if (error) throw error;

      toast.success("Resource uploaded successfully!");
      setResourceForm({ title: "", type: "pdf", url: "", folder: "resources" });
      loadResources();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload resource");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      const { error } = await supabase.from('notices').delete().eq('id', id);
      if (error) throw error;
      toast.success("Notice deleted");
      loadNotices();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete notice");
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id);
      if (error) throw error;
      toast.success("Resource deleted");
      loadResources();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete resource");
    }
  };

  if (!profile?.is_verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Verification Required</CardTitle>
            <CardDescription>
              Your CR account is pending verification. Please wait for admin approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-gradient-primary text-primary-foreground border-b border-primary-light shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-light"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo} alt="UniBee" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">Upload Center</h1>
              <p className="text-sm text-primary-foreground/90">
                {getDepartmentName(dept)} • Level {level} Term {term}
              </p>
            </div>
          </div>
          <span className="bg-secondary px-3 py-1 rounded-full text-xs font-semibold">CR</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Content
              </CardTitle>
              <CardDescription>Post notices or upload resources for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={uploadType === "notice" ? "default" : "outline"}
                  onClick={() => setUploadType("notice")}
                  className="flex-1"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notice
                </Button>
                <Button
                  variant={uploadType === "resource" ? "default" : "outline"}
                  onClick={() => setUploadType("resource")}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resource
                </Button>
              </div>

              {uploadType === "notice" ? (
                <form onSubmit={handleNoticeSubmit} className="space-y-4">
                  <div>
                    <Label>Notice Title</Label>
                    <Input
                      value={noticeForm.title}
                      onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      placeholder="Enter notice title"
                      required
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={noticeForm.content}
                      onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                      placeholder="Enter notice content"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Uploading..." : "Post Notice"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleResourceSubmit} className="space-y-4">
                  <div>
                    <Label>Resource Title</Label>
                    <Input
                      value={resourceForm.title}
                      onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                      placeholder="Enter resource title"
                      required
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={resourceForm.type}
                      onValueChange={(value) => setResourceForm({ ...resourceForm, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Folder</Label>
                    <Select
                      value={resourceForm.folder}
                      onValueChange={(value) => setResourceForm({ ...resourceForm, folder: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resources">Resources</SelectItem>
                        <SelectItem value="materials">Class Materials</SelectItem>
                        <SelectItem value="sources">Sources</SelectItem>
                        <SelectItem value="notes">Notes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={resourceForm.url}
                      onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                      placeholder="Enter resource URL"
                      type="url"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Resource"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notices ({notices.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {notices.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No notices posted yet</p>
                ) : (
                  notices.map((notice) => (
                    <div key={notice.id} className="p-3 bg-muted rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{notice.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notice.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNotice(notice.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Resources ({resources.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {resources.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No resources uploaded yet</p>
                ) : (
                  resources.map((resource) => (
                    <div key={resource.id} className="p-3 bg-muted rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.folder} • {resource.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resource.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteResource(resource.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadView;
