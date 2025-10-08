import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/85 to-secondary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-8 animate-fade-in">
            <img src={logo} alt="UniBee Logo" className="w-32 h-32 drop-shadow-2xl" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
            Welcome to UniBee
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in">
            Your Academic Resource Hub for CUET
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 h-auto"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white hover:text-primary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-center text-foreground">
              Comprehensive Resources
            </h3>
            <p className="text-muted-foreground text-center">
              Access past papers, lecture notes, and curated study materials from seniors
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-secondary p-4 rounded-full">
                <GraduationCap className="w-8 h-8 text-secondary-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-center text-foreground">
              Department-Wise Organization
            </h3>
            <p className="text-muted-foreground text-center">
              Navigate through your specific department, level, and term with ease
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-center text-foreground">
              Collaborative Learning
            </h3>
            <p className="text-muted-foreground text-center">
              Share notes, like content, and learn together with your peers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
