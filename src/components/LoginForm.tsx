"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, Loader2 } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Hardcoded credentials as provided by the user
    setTimeout(() => {
        if (email === "admin@technoml.in" && password === "TechnoML") {
            sessionStorage.setItem("isAdminAuthenticated", "true");
            onLogin();
        } else {
            setError("Invalid email or password. Please try again.");
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="glass border-none shadow-2xl w-full max-w-md rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">Admin Access</CardTitle>
          <CardDescription className="text-slate-400 mt-2 font-medium">
            Please enter your credentials to manage LinkFlow.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="bg-white/5 border-white/10 text-white pl-10 h-12 focus-visible:ring-indigo-500 rounded-2xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white pl-10 h-12 focus-visible:ring-indigo-500 rounded-2xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <p className="text-red-400 text-sm font-bold text-center bg-red-400/10 py-2 rounded-xl border border-red-400/20 animate-pulse">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all duration-300 transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Authenticate"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
