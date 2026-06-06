import { VOXL_AUTH_API_URL } from "./env.js";

export type AuthenticatedUser = {
  userId: string;
  username: string;
  accessToken: string;
};

export async function requireAuthenticatedUser(
  req: Request
): Promise<AuthenticatedUser> {
  const authHeader = req.headers.get("authorization") ?? "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    throw new Response(
      JSON.stringify({ ok: false, error: "missing bearer token" }),
      {
        status: 401,
        headers: { "content-type": "application/json" },
      }
    );
  }

  const accessToken = match[1];
  const res = await fetch(`${VOXL_AUTH_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const payload = (await res.json()) as {
    user_id?: string;
    username?: string;
  };

  if (!payload.user_id) {
    throw new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  return {
    userId: payload.user_id,
    username: payload.username ?? "",
    accessToken,
  };
}
