import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, GraduationCap } from "lucide-react";
import logo from "@/assets/logo.png";

const courses = [
  { 
    id: "cse4101", 
    name: "Database Management Systems", 
    code: "CSE 4101",
    level: "4", 
    term: "1",
    students: 120,
    color: "bg-blue-600"
  },
  { 
    id: "cse3201", 
    name: "Data Structures and Algorithms", 
    code: "CSE 3201",
    level: "3", 
    term: "2",
    students: 135,
    color: "bg-green-600"
  },
  { 
    id: "cse4102", 
    name: "Software Engineering", 
    code: "CSE 4102",
    level: "4", 
    term: "1",
    students: 118,
    color: "bg-purple-600"
  },
  { 
    id: "cse2101", 
    name: "Object Oriented Programming", 
    code: "CSE 2101",
    level: "2", 
    term: "1",
    students: 145,
    color: "bg-indigo-600"
  },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string, level: string, term: string) => {
    navigate(`/teacher-course?courseId=${courseId}&level=${level}&term=${term}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground border-b border-primary-light shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="UniBee" className="w-12 h-12 bg-white rounded-full p-1" />
            <div>
              <h1 className="text-2xl font-bold">UniBee Teacher Portal</h1>
              <p className="text-sm text-primary-foreground/90">Manage your courses</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-light"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Your Courses
          </h2>
          <p className="text-muted-foreground text-lg">Select a course to manage content and students</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-secondary bg-card/80 backdrop-blur"
              onClick={() => handleCourseClick(course.id, course.level, course.term)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`${course.color} p-4 rounded-xl shadow-lg`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-gradient-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {course.code}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">{course.name}</CardTitle>
                <CardDescription className="text-base mt-2">
                  Level {course.level} • Term {course.term}
                </CardDescription>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  <span>{course.students} Students</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full">
                  Manage Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
