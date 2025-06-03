import { LoginForm } from "@/components/login-form"
import { login, signup } from './actions'
export default function Login() {
  return (
    <main>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm login={login} signup={signup}/>
      </div>
    </div>
    </main>
  );
}