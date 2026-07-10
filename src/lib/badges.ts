import type { EstadoMesa, EstadoIntervencion, SituacionEscolar } from "@/data/mock";
import type { BadgeColor } from "@/components/ui";

export function colorEstadoMesa(estado: EstadoMesa): BadgeColor {
  switch (estado) {
    case "Programada":
      return "blue";
    case "Realizada":
      return "green";
    case "Suspendida":
      return "red";
  }
}

export function colorEstadoIntervencion(estado: EstadoIntervencion): BadgeColor {
  switch (estado) {
    case "Abierta":
      return "amber";
    case "En seguimiento":
      return "blue";
    case "Cerrada":
      return "gray";
  }
}

export function colorSituacionEscolar(situacion: SituacionEscolar): BadgeColor {
  switch (situacion) {
    case "Escolarizado":
      return "green";
    case "Con inasistencias":
      return "amber";
    case "Desescolarizado":
      return "red";
    case "En proceso de inclusión":
      return "blue";
  }
}
