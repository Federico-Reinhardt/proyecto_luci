export function str(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export function optStr(formData: FormData, name: string): string | null {
  const value = str(formData, name);
  return value === "" ? null : value;
}

export function num(formData: FormData, name: string): number {
  return Number(formData.get(name));
}

export type ActionState = { error?: string } | undefined;
