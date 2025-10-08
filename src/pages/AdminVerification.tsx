import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, UserCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDepartmentFullName } from "@/lib/departments";
import logo from "@/assets/logo.png";

interface PendingCR {
  id: string;
  email: string;
  department_id: string;
  batch: string | null;
  created_at: string;
}

const AdminVerification = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [pendingCRs, setPendingCRs] = useState<PendingCR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'admin') {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }
    loadPendingCRs();
  }, [profile]);

  const loadPendingCRs = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'cr')
        .eq('is_verified', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingCRs(data || []);
    } catch (error) {
      console.error('Error loading pending CRs:', error);
      toast.error("Failed to load pending CRs");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, approve: boolean) => {
    try {
      if (approve) {
        const { error } = await supabase
          .from('users')
          .update({ is_verified: true })
          .eq('id', id);

        if (error) throw error;
        toast.success("CR verified successfully!");
      } else {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id);

        if (error) throw error;
        toast.success("CR rejected and removed");
      }

      loadPendingCRs();
    } catch (error: any) {
      toast.error(error.message || "Failed to process verification");
    }
  };

  if (profile?.role !== 'admin') {
    return null;
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
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-primary-foreground/90">CR Verification Center</p>
            </div>
          </div>
          <Badge variant="secondary">Admin</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Pending CR Verifications</CardTitle>
            </div>
            <CardDescription>
              Review and approve or reject Class Representative applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : pendingCRs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No pending CR verifications
              </p>
            ) : (
              <div className="space-y-4">
                {pendingCRs.map((cr) => (
                  <div
                    key={cr.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg border"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{cr.email}</p>
                      <div className="flex gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">
                          Department: {getDepartmentFullName(cr.department_id)}
                        </p>
                        {cr.batch && (
                          <p className="text-sm text-muted-foreground">
                            Batch: {cr.batch}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied: {new Date(cr.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleVerify(cr.id, true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleVerify(cr.id, false)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminVerification;
