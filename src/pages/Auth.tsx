import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Email validation patterns
  const studentEmailPattern = /^u\d{7}@student\.cuet\.ac\.bd$/;
  const teacherEmailPattern = /^[a-z]+@cuet\.ac\.bd$/;

  const validateEmail = (email: string, type: 'student' | 'teacher') => {
    if (type === 'student') {
      return studentEmailPattern.test(email);
    }
    return teacherEmailPattern.test(email);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const userType = formData.get("userType") as 'student' | 'teacher';

    // Validate email format
    if (!validateEmail(email, userType)) {
      toast.error(
        userType === 'student' 
          ? "Please use valid student email format: u2204112@student.cuet.ac.bd"
          : "Please use valid teacher email format: name@cuet.ac.bd"
      );
      setIsLoading(false);
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate signup - replace with actual backend integration
    setTimeout(() => {
      toast.success("Account created successfully!");
      setIsLoading(false);
      
      // Extract department from student email for direct routing
      if (userType === 'student') {
        const deptId = email.substring(3, 5);
        navigate(`/level-selection?dept=${deptId}`);
      } else {
        navigate("/teacher-dashboard");
      }
    }, 1500);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userType = formData.get("userType") as 'student' | 'teacher';

    // Validate email format
    if (!validateEmail(email, userType)) {
      toast.error("Invalid email format for selected user type");
      setIsLoading(false);
      return;
    }

    // Simulate login - replace with actual backend integration
    setTimeout(() => {
      toast.success("Logged in successfully!");
      setIsLoading(false);
      
      // Extract department from student email for direct routing to level selection
      if (userType === 'student') {
        const deptId = email.substring(3, 5);
        navigate(`/level-selection?dept=${deptId}`);
      } else {
        navigate("/teacher-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="UniBee" className="w-20 h-20" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">UniBee</CardTitle>
          <CardDescription>Access your academic resources</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-type">I am a</Label>
                  <select
                    name="userType"
                    id="login-type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="u2204112@student.cuet.ac.bd"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-type">I am a</Label>
                  <select
                    name="userType"
                    id="signup-type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="u2204112@student.cuet.ac.bd"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Students: u[batch][dept][roll]@student.cuet.ac.bd<br />
                    Teachers: name@cuet.ac.bd
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
