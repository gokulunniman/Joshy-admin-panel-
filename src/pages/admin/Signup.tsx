import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { signupSchema } from "@/lib/validation";
import { AuthError } from "@/lib/auth";
import { toast } from "sonner";
import { z } from "zod";

type SignupFormData = z.infer<typeof signupSchema>;

export default function AdminSignup() {
  const navigate = useNavigate();
  const { signUp, user, isAdmin, loading } = useAuth();
  const [authError, setAuthError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Redirect if already authenticated admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setAuthError("");
      await signUp({
        email: data.email,
        password: data.password,
        fullName: data.fullName
      });
      
      toast.success("Account created! Please check your email to verify your account.");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      if (error instanceof AuthError) {
        setAuthError(error.message);
      } else {
        setAuthError("An unexpected error occurred. Please try again.");
      }
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create Admin Account</h1>
          <p className="text-gray-600">
            Sign up to access the admin panel
          </p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              aria-label="Full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              aria-label="Email address"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              {...register("password")}
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              aria-label="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          <Link 
            to="/admin/login" 
            className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            Already have an account? Sign in
          </Link>
          <br />
          <Link 
            to="/" 
            className="text-sm text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}