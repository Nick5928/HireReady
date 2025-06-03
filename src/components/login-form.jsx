"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({
  login,
  signup,
  className,
  ...props
}) {
  const log = process.env.NEXT_PUBLIC_LOG === 'true'
  const [mode, setMode] = useState("login");
  const [error, setError] = useState('');
  const [internalError, setInternalError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInternalError(false);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (mode === 'login') {
      const response = await login(formData);
      log && console.log(response);
      if(response.code === "invalid_credentials") {
        setError(response.code)
        return;
      }
      setInternalError(true);
    }
    else if(mode === 'signup') {
      if (!emailRegex.test(email)) {
        setError("invalid_email");
        return;
      }

      if (!passwordRegex.test(password)) {
        setError("invalid_pass");
        return;
      }
      const response = await signup(formData);
      log && console.log(response);

      if(response.code === 'user_already_exists') {
        setError(response.code)
        return;
      }
      setInternalError(true)

    }
  };

  
   return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login to your HireReady account" : "Create a HireReadyaccount"}</CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email below to login to your account"
              : "Enter your email below to create a new account"}
              {mode === 'login' && error === 'invalid_credentials' && (
                  <p className="text-red-500 text-sm">Invalid email or password. Please retype credentials.</p>
                )}
              {mode === 'signup' && error === 'user_already_exists' && (
                  <p className="text-red-500 text-sm">User already exists please login.</p>
                )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
                {mode === 'signup' && error === 'invalid_email' && (
                  <p className="text-red-500 text-sm">Invalid email</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* {mode === "login" && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  )} */}
                </div>
                <Input name="password" id="password" type="password" required />
                {mode === 'signup' && error != 'invalid_pass' && (
                    <p className="text-sm">Use 8+ characters with upper, lower, number & symbol.</p>
                )}
                {mode === 'signup' && error === 'invalid_pass' && (
                    <p className="text-red-500 text-sm">Invalid password use 8+ characters with upper, lower, number & symbol.</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {mode === "login" ? "Login" : "Sign Up"}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Continue with Google
                </Button> */}
              </div>
              {internalError && (
                  <p className="text-red-500 text-sm">Error occured try again later.</p>
                )}
            </div>
            <div className="mt-4 text-center text-sm">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="underline underline-offset-4 text-blue-600">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="underline underline-offset-4 text-blue-600">
                    Login
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
