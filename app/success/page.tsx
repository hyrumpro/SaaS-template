"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-800">Payment Successful!</CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-2">
                        Thank you for your purchase. Your account has been upgraded.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Whats next?</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-blue-700">
                                <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                                Explore your new premium features
                            </li>
                            <li className="flex items-center text-blue-700">
                                <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                                Set up your account preferences
                            </li>
                            <li className="flex items-center text-blue-700">
                                <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                                Invite your team members
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => router.push('/dashboard')}>
                            Go to Dashboard
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="flex-1">
                            Download Receipt
                            <Download className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Weve sent a confirmation email to your inbox
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}