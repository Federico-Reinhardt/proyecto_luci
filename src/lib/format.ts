export function formatFecha(iso: string | null | undefined): string {
  if (!iso) return "-";
  const date = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export function calcularEdad(fechaNacimiento: string): number {
  const nacimiento = new Date(fechaNacimiento + "T00:00:00");
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();
  if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}
