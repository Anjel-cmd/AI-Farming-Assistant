import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Leaf } from "lucide-react";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({ isOpen, onOpenChange, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const { login, signup, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Network delay
      await login(data.email, data.password);
      onOpenChange(false);
      loginForm.reset();
    } catch (error: any) {
      if (error.message.includes("password")) {
        loginForm.setError("password", { type: "manual", message: error.message });
      } else {
        loginForm.setError("email", { type: "manual", message: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Network delay
      await signup(data.email, data.name, data.password);
      onOpenChange(false);
      signupForm.reset();
    } catch (error: any) {
      signupForm.setError("email", { type: "manual", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await loginWithGoogle();
    setIsGoogleLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 rounded-[2rem] border-border bg-card shadow-lift">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <DialogHeader className="mb-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-primary grid place-items-center mb-4 shadow-soft">
              <Leaf size={24} />
            </div>
            <DialogTitle className="text-2xl font-bold text-primary-dark">Welcome to AI Farm</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              Join us to start diagnosing your crops instantly.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50 rounded-xl p-1 h-auto">
              <TabsTrigger value="login" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="animate-fade-up">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary-dark">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="farmer@example.com" 
                    {...loginForm.register("email")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-primary-dark">Password</Label>
                    <a href="#" className="text-xs text-primary hover:text-primary-dark transition-colors">Forgot password?</a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    {...loginForm.register("password")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading || isGoogleLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft hover:bg-primary-dark transition disabled:opacity-70 mt-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Log In"}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-3 rounded-xl bg-background border border-border text-foreground font-semibold shadow-sm hover:bg-secondary transition disabled:opacity-70"
                >
                  {isGoogleLoading ? <Loader2 size={18} className="animate-spin" /> : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Google
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="animate-fade-up">
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-primary-dark">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="John Doe" 
                    {...signupForm.register("name")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                  />
                  {signupForm.formState.errors.name && (
                    <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-primary-dark">Email Address</Label>
                  <Input 
                    id="signup-email" 
                    placeholder="farmer@example.com" 
                    {...signupForm.register("email")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-primary-dark">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      {...signupForm.register("password")}
                      className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-primary-dark">Confirm</Label>
                    <Input 
                      id="signup-confirm" 
                      type="password" 
                      placeholder="••••••••" 
                      {...signupForm.register("confirmPassword")}
                      className="rounded-xl bg-background/50 border-border focus-visible:ring-primary h-11"
                    />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading || isGoogleLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft hover:bg-primary-dark transition disabled:opacity-70 mt-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Create Account"}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-3 rounded-xl bg-background border border-border text-foreground font-semibold shadow-sm hover:bg-secondary transition disabled:opacity-70"
                >
                  {isGoogleLoading ? <Loader2 size={18} className="animate-spin" /> : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Google
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
