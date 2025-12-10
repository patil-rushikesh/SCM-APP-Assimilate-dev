import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const authorization = req.headers.get("Authorization") || "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization,
        },
        credentials: "include",
    });

    const data = await res.json();
    
    if (!res.ok) {
        return NextResponse.json({ ok: false, message: data.message || "Logout failed" }, { status: res.status });
    }

    const response = NextResponse.json({ ok: true, message: "Logged out" });

    response.headers.append(
        "Set-Cookie",
        `user_token=; path=/; max-age=0; SameSite=Lax`
    );

    return response;
}
