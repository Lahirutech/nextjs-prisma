'use server'

import { headers } from 'next/headers';

interface User {
    id: string;
    email: string;
}

interface GetUsersResponse {
    message: User[];
    status: number;
}

export async function getUsers(): Promise<GetUsersResponse> {
    try {
        // Ensure we're using an absolute URL
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const host = headers().get('host') || 'localhost:3000';
        const url = `${protocol}://${host}/api/getusers`;

        const response = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Cookie': headers().get('cookie') ?? ''
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GetUsersResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { message: [], status: 500 };
    }
}