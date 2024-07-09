"use client";
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import Checkout from '@/components/subscription/checkout';

type PlanFeature = {
    name: string;
    included: boolean;
};

type Price = {
    title: string;
    description: string;
    features: PlanFeature[];
    monthlyPrice: number;
    yearlyPrice: number;
    bestValue?: boolean;
    priceId: string;
};

const prices: Price[] = [
    {
        title: "Starter",
        description: "For individuals and small teams",
        features: [
            { name: "5 team members", included: true },
            { name: "Basic analytics", included: true },
            { name: "24/7 email support", included: true },
            { name: "Custom integrations", included: false },
            { name: "Advanced security", included: false },
        ],
        monthlyPrice: 10,
        yearlyPrice: 100,
        priceId: "price_1PRhQ9Rx3Htmu8VkeCWj9DLX"
    },
    {
        title: "Pro",
        description: "For growing businesses",
        features: [
            { name: "20 team members", included: true },
            { name: "Advanced analytics", included: true },
            { name: "24/7 priority support", included: true },
            { name: "Custom integrations", included: true },
            { name: "Advanced security", included: false },
        ],
        monthlyPrice: 20,
        yearlyPrice: 200,
        bestValue: true,
        priceId: "price_1PRhRWRx3Htmu8VkORLaiwHy"
    },
    {
        title: "Enterprise",
        description: "For large-scale operations",
        features: [
            { name: "Unlimited members", included: true },
            { name: "Enterprise analytics", included: true },
            { name: "24/7 dedicated support", included: true },
            { name: "Custom integrations", included: true },
            { name: "Advanced security", included: true },
        ],
        monthlyPrice: 100,
        yearlyPrice: 1000,
        priceId: "price_1PRhU1Rx3Htmu8Vk0RXFZEsm",
    },
];

export default function Price() {
    const [isYearly, setIsYearly] = React.useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose the perfect plan for your teams needs. No hidden fees, no surprises.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="bg-white p-1 rounded-full shadow-md">
                    <button
                        className={`${
                            !isYearly ? 'bg-blue-600 text-white' : 'text-gray-700'
                        } relative w-40 rounded-full py-2 text-sm font-medium transition-all duration-300 focus:outline-none`}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </button>
                    <button
                        className={`${
                            isYearly ? 'bg-blue-600 text-white' : 'text-gray-700'
                        } relative w-40 rounded-full py-2 text-sm font-medium transition-all duration-300 focus:outline-none`}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly <span className="text-xs font-normal">(Save 20%)</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {prices.map((price, index) => (
                    <Card key={index} className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl ${price.bestValue ? 'border-4 border-blue-500 shadow-xl scale-105' : 'border border-gray-200 shadow-lg'}`}>
                        {price.bestValue && (
                            <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold py-1 px-4 rounded-br-lg">
                                Most Popular
                            </div>
                        )}
                        <CardHeader className={`p-8 ${price.bestValue ? 'bg-blue-50' : 'bg-white'}`}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{price.title}</h3>
                            <p className="text-gray-600">{price.description}</p>
                            <div className="mt-6">
                                <span className="text-5xl font-bold text-gray-900">
                                    ${isYearly ? price.yearlyPrice : price.monthlyPrice}
                                </span>
                                <span className="text-gray-600 ml-2">/{isYearly ? 'year' : 'month'}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <ul className="space-y-4">
                                {price.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                                        )}
                                        <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400'} text-base`}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="p-8 bg-gray-50">
                            <Checkout
                                priceId={price.priceId}
                                className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                                    price.bestValue
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-white hover:bg-gray-100 text-blue-600 border-2 border-blue-600'
                                }`}
                            >
                                {price.bestValue ? 'Get Started Now' : 'Choose Plan'}
                            </Checkout>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}