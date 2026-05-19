// Lightweight auth client that talks to the mounted Better Auth HTTP endpoints
// Avoids importing `better-auth/react` at build time while providing client methods.

const jsonOrNull = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const postJson = async (path, body) => {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await jsonOrNull(res);
  return { res, data, error: res.ok ? null : data };
};

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
  console.warn("NEXT_PUBLIC_BETTER_AUTH_URL is not set; ensure .env.local contains it");
}

export const authClient = {
  signIn: {
    email: async (payload) => {
      const { res, data, error } = await postJson("/api/auth/sign-in/email", payload);
      return { data, error };
    }
  },
  signUp: {
    email: async (payload) => {
      const { res, data, error } = await postJson("/api/auth/sign-up/email", payload);
      return { data, error };
    }
  },
  signOut: async () => {
    try {
      const res = await fetch("/api/auth/sign-out", { method: "POST" });
      return { data: null, error: res.ok ? null : await jsonOrNull(res) };
    } catch (e) {
      return { data: null, error: e };
    }
  },
  // Social sign-in helper that calls the unified social sign-in endpoint.
  signInWithProvider: async (provider, opts = {}) => {
    const body = { provider, disableRedirect: !!opts.disableRedirect };
    const { res, data, error } = await postJson("/api/auth/sign-in/social", body);
    return { data, error };
  }
};

export default authClient;
