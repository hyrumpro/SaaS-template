"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import SupabaseBrowser from "@/lib/supabase/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = SupabaseBrowser();

const handleLoginWithOauth = async (provider: 'google' | 'github') => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
        if (error) throw error;
    } catch (error) {
        console.error(`Error logging in with ${provider}:`, error);
        toast.error(`Failed to login with ${provider}. Please try again.`);
    }
};

const handleLoginWithEmail = async (email: string, password: string) => {
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Logged in successfully!");
    } catch (error) {
        console.error("Error logging in with email:", error);
        toast.error("Invalid email or password. Please try again.");
    }
};

export default function LoginForm() {
    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        setEmailError("");
        setIsSubmitting(true);
        await handleLoginWithEmail(email, password);
        setIsSubmitting(false);
    };

    if (!isClient) return null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10"
                                />
                            </div>
                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <Link href="#" className="text-xs text-indigo-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleLoginWithOauth('google')}
                        >
                            <FcGoogle className="mr-2 h-4 w-4" /> Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleLoginWithOauth('github')}
                        >
                            <FaGithub className="mr-2 h-4 w-4" /> GitHub
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2 w-full">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="text-indigo-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}