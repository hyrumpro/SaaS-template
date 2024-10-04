import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import Price from "../components/subscription/price";
import { testimonials } from "@/lib/data/testimonials";

export default function Home() {
    const features = [
        "Advanced Analytics",
        "Team Collaboration",
        "Real-time Insights",
        "Customizable Dashboards",
    ];

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50">
            <div className="max-w-7xl w-full space-y-24 px-6 py-20">
                <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
                    <div className="flex-1 relative w-full max-w-md aspect-square">
                        <Image
                            src="/hero.jpeg"
                            alt="MyApp Dashboard Preview"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-xl shadow-2xl"
                            priority
                        />
                    </div>
                    {/* Text Content */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                            Revolutionize Your Workflow with <span className="text-indigo-600">MyApp</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-lg mx-auto md:mx-0">
                            Streamline processes, boost productivity, and unlock your teams potential with our comprehensive solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-semibold px-8 py-3 rounded-full shadow-md flex items-center justify-center"
                                >
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#pricing">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 font-semibold px-8 py-3 rounded-full flex items-center justify-center"
                                >
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-900">
                        Why Choose <span className="text-indigo-600">MyApp</span>?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <CheckCircle className="h-6 w-6 text-indigo-600 mt-1" />
                                <span className="text-lg font-medium text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white py-12">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                            What Our Users Say
                        </h2>
                        <div className="space-y-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="text-gray-600">"{testimonial.message}"</p>
                                        <p className="mt-2 text-indigo-600 font-semibold">{testimonial.name}, {testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="pricing" className="space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                        Flexible Pricing for Every Team
                    </h2>
                    <Price />
                </section>

                <section className="bg-indigo-600 py-12 rounded-xl">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                            Ready to take your workflow to the next level?
                        </h3>
                        <Link href="/signup">
                            <Button
                                size="lg"
                                className="bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 font-semibold px-8 py-3 rounded-full shadow-md"
                            >
                                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            <footer className="w-full bg-gray-800 text-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex space-x-4">
                        <Link href="/" className="hover:text-white transition-colors duration-200">
                            Home
                        </Link>
                        <Link href="/features" className="hover:text-white transition-colors duration-200">
                            Features
                        </Link>
                        <Link href="/pricing" className="hover:text-white transition-colors duration-200">
                            Pricing
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors duration-200">
                            Contact
                        </Link>
                    </div>
                    <div className="text-sm">
                        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
