import { Card } from "@/components/ui";
import LoginForm from "@/app/login/_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            TE
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Trayectorias Educativas</h1>
          <p className="mt-1 text-sm text-slate-500">Ingresá con tu usuario y contraseña</p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}
