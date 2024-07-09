"use client";
import React, { useState, ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
    children: ReactNode;
}


export default function QueryProvider({ children}: QueryProviderProps) {

    const [ queryClient ] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            }
        }
    }))

    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}




