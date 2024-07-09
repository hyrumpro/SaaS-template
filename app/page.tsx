import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import Price from "../components/subscription/price";

export default function Home() {
    const features = [
        "Advanced Analytics",
        "Team Collaboration",
        "Real-time Insights",
        "Customizable Dashboards"
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
            <div className="max-w-6xl w-full space-y-20">
                <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Revolutionize Your Workflow with MyApp
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-100">
                            Streamline processes, boost productivity, and unlock your team's potential.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-300 font-semibold px-8 py-3 rounded-full">
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#pricing">
                                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-indigo-600 transition-colors duration-300 font-semibold px-8 py-3 rounded-full">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full max-w-md aspect-square">
                        <Image
                            src="/hero-image.png"
                            alt="MyApp Dashboard Preview"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </section>

                <section className="text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Choose MyApp?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-400" />
                                <span className="text-lg">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="pricing" className="space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center">Flexible Pricing for Every Team</h2>
                    <Price />
                </section>
            </div>
        </main>
    );
}