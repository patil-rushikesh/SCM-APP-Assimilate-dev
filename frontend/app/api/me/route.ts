import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`;
    const authorization = req.headers.get("Authorization") || "";
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorization,
      },
      credentials: "include",
    });

    const data = await res.json();

    const setCookieHeader = res.headers.get("set-cookie");
    const response = NextResponse.json(data, { status: res.status });

    if (setCookieHeader) {
      const cookies = setCookieHeader.split(/,(?=[^;]+?=)/g);
      for (const cookie of cookies) {
        response.headers.append("Set-Cookie", cookie);
      }
    }

    return response;
  } catch (error) {
    console.error("Me API Error:", error);
    return NextResponse.json({ error: "Me API failed" }, { status: 500 });
  }
}
