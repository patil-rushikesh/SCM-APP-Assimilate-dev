
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

async function fetchUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`, {
        credentials: 'include',
    });
    if (!res.ok) return null;
    return res.json();
}

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchUser()
            .then((userData) => {
                setUser(userData);
                setLoading(false);
            })
            .catch(() => {
                setError('Authentication failed');
                setUser(null);
                setLoading(false);
            });
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            await fetchUser().then(setUser);
            setLoading(false);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch {
            // Ignore logout errors
        }
        setUser(null);
        router.push('/');
    };

    return {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
    };
}