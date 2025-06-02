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
import { useRouter } from 'next/navigation'
import axios from "axios"

export function LoginForm({
  className,
  ...props
}) {
  const log = process.env.NEXT_PUBLIC_LOG === 'true'
  const [mode, setMode] = useState("login");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [wrongCred, setWrongCred] = useState(false);
  const router = useRouter()


  const onLogin = async ({ email, password }) => {
    try{
      const response = await axios.post("/api/login", {
          email,
          password,
      });
      return response
    }
    catch (error) {
      setWrongCred(true);
      return error.response
    }
  };

  const onSignup = async ({ email, password }) => {
    const response = await axios.post("/api/signup", {
        email,
        password,
    });
    return response
  }

  const handleSubmit = async (e) => {
    setWrongCred(false);
    setErrorOccured(false);
    setInvalidEmail(false);
    setInvalidPass(false);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (mode === 'login') {
      const response = await onLogin({ email, password });
      log && console.log(response);
      if(wrongCred) return;

     if(response.status === 200) {
      log && console.log(true)
      //router.push('/home')
    }
    else if(response.status != 200) {
      setErrorOccured(true);
    }

    }
    else if(mode === 'signup') {
      if (!emailRegex.test(email)) {
        setInvalidEmail(true);
        return;
      }

      if (!passwordRegex.test(password)) {
        setInvalidPass(true);
        return;
      }
      const response = await onSignup({ email, password });
      log && console.log(response);

      if(response.status === 200) {
        setMode("login");
      }
      else if(response.status != 200) {
        setErrorOccured(true);
      }
      setInvalidEmail(false);
      setInvalidPass(false);
      return;
    }
  };

  
   return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login to your account" : "Create an account"}</CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email below to login to your account"
              : "Enter your email below to create a new account"}
              {mode === 'login' && wrongCred && (
                  <p className="text-red-500 text-sm">Invalid email or password</p>
                )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
                {mode === 'signup' && invalidEmail && (
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
                <Input id="password" type="password" required />
                {mode === 'signup' && !invalidPass && (
                    <p className="text-sm">Use 8+ characters with upper, lower, number & symbol.</p>
                )}
                {mode === 'signup' && invalidPass && (
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
              {errorOccured && (
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
