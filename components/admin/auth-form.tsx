"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "setup" | "sign-in" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSetup = mode === "setup";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (isSetup) {
      if (password.length < 10) {
        setError("Use a password of at least 10 characters.");
        return;
      }
      if (password !== String(form.get("confirm") ?? "")) {
        setError("The passwords don't match.");
        return;
      }
    }

    setPending(true);
    const result = isSetup
      ? await authClient.signUp.email({ email, password, name: "Caitlyne Corry" })
      : await authClient.signIn.email({ email, password });
    setPending(false);

    if (result.error) {
      console.error("[admin] auth failed", result.error);
      setError(
        isSetup
          ? "The account couldn't be created. It may already exist. Try signing in."
          : "That email and password didn't match."
      );
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7" noValidate>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isSetup ? "new-password" : "current-password"}
          required
          minLength={isSetup ? 10 : undefined}
        />
      </div>
      {isSetup ? (
        <div className="flex flex-col gap-1">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
        </div>
      ) : null}
      {error ? (
        <p role="alert" className="m-0 font-grotesk text-sm text-[#9b3b3f]">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "One moment…" : isSetup ? "Create admin login" : "Sign in"}
      </Button>
    </form>
  );
}
