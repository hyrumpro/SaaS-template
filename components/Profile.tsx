"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import SupabaseBrowser from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import useUser from "../app/hook/useUser";

const DEFAULT_IMAGE_URL = "/images/default-avatar.png";

export default function Profile() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const supabase = SupabaseBrowser();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const { data: user, isLoading, isError } = useUser();

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            queryClient.clear();
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (isError) {
        return <div>Error loading user data</div>;
    }

    if (!user || user.id === "") {
        return (
            <Link href="/auth">
                <Button variant="outline" className="animate-fade-in">Sign In</Button>
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Image
                        src={user.image_url || DEFAULT_IMAGE_URL}
                        alt={user.display_name || "User"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.display_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ProfileSkeleton() {
    return (
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
}

