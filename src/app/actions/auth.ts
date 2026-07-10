"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const validUser = process.env.APP_USERNAME;
  const validPassword = process.env.APP_PASSWORD;

  if (!validUser || !validPassword) {
    throw new Error(
      "Faltan las variables de entorno APP_USERNAME / APP_PASSWORD"
    );
  }

  if (username !== validUser || password !== validPassword) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  await createSession(username);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
