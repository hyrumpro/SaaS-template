"use client";
import useUser from '@/app/hook/useUser';
import { useProtectedRoute } from '../hook/useProtectedRoute';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProtectedContent() {
    const { data: user, isFetching: userFetching } = useUser();
    const { isAuthorized, isLoading } = useProtectedRoute('enterprise'); // Set the required tier here
    const [authStatus, setAuthStatus] = useState('loading');

    useEffect(() => {
        console.log('ProtectedContent: User', user, 'isFetching', userFetching, 'isAuthorized', isAuthorized, 'isLoading', isLoading);
        if (!userFetching && !isLoading) {
            if (isAuthorized) {
                setAuthStatus('authorized');
            } else if (user && !user.subscription) {
                setAuthStatus('no_subscription');
            } else {
                setAuthStatus('unauthorized');
            }
        }
    }, [user, userFetching, isAuthorized, isLoading]);

    if (userFetching || isLoading || authStatus === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (authStatus !== 'authorized') {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Access Denied</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {authStatus === 'no_subscription'
                            ? "You need an active subscription to access this content."
                            : "Your current subscription does not allow access to this content."}
                    </p>
                    <div className="mt-5">
                        <Link
                            href={authStatus === 'no_subscription' ? "/#pricing" : "/upgrade"}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {authStatus === 'no_subscription' ? "View Pricing Plans" : "Upgrade Subscription"}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Protected Enterprise Content
                </h1>
                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                            Exclusive Enterprise Content
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            This content is only available to Enterprise tier subscribers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}