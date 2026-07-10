// Datos de ejemplo (mock) para el prototipo visual.
// En una etapa posterior esto se reemplaza por datos reales desde una base de datos.

export type TipoInstitucion =
  | "Jardín"
  | "Primaria"
  | "Secundaria"
  | "Especial"
  | "Otro";

export interface Institucion {
  id: string;
  nombre: string;
  tipo: TipoInstitucion;
  nivel: string;
  direccion: string;
  telefono: string;
  email: string;
  referente: string;
  cargoReferente: string;
  telefonoReferente: string;
  observaciones: string;
}

export type ModalidadMesa = "Presencial" | "Virtual";
export type EstadoMesa = "Programada" | "Realizada" | "Suspendida";

export interface Mesa {
  id: string;
  institucionId: string;
  fecha: string; // ISO yyyy-mm-dd
  bimestre: number; // 1 a 6
  anioLectivo: number;
  modalidad: ModalidadMesa;
  participantes: string;
  temasTratados: string;
  acuerdos: string;
  acta: string;
  estado: EstadoMesa;
}

export type SituacionEscolar =
  | "Escolarizado"
  | "Con inasistencias"
  | "Desescolarizado"
  | "En proceso de inclusión";

export interface Alumno {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // ISO
  genero: string;
  direccion: string;
  localidad: string;
  telefono: string;
  // Responsable / tutor
  responsableNombre: string;
  responsableVinculo: string;
  responsableDni: string;
  responsableTelefono: string;
  // Educativos
  institucionId: string;
  nivel: string;
  gradoAnioSala: string;
  turno: string;
  situacionEscolar: SituacionEscolar;
  trayectoriaPrevia: string;
  // Salud / otros
  obraSocial: string;
  condicionesSalud: string;
  tratamientos: string;
  cud: boolean;
  observaciones: string;
}

export type TipoIntervencion =
  | "Entrevista"
  | "Derivación"
  | "Seguimiento"
  | "Articulación"
  | "Otro";

export type EstadoIntervencion = "Abierta" | "En seguimiento" | "Cerrada";

export interface Intervencion {
  id: string;
  alumnoId: string;
  institucionId: string;
  fecha: string; // ISO
  tipo: TipoIntervencion;
  descripcion: string;
  acuerdosAcciones: string;
  responsable: string;
  estado: EstadoIntervencion;
  fechaProximoSeguimiento: string | null; // ISO
}

// ---------------------------------------------------------------------------
// INSTITUCIONES
// ---------------------------------------------------------------------------

export const instituciones: Institucion[] = [
  {
    id: "inst-1",
    nombre: "Jardín de Infantes N°904 \"Arco Iris\"",
    tipo: "Jardín",
    nivel: "Inicial",
    direccion: "Calle Belgrano 452",
    telefono: "0299-442-1120",
    email: "jardin904@edu.rionegro.gov.ar",
    referente: "María Eugenia Sosa",
    cargoReferente: "Directora",
    telefonoReferente: "0299-15-455-3312",
    observaciones: "Referente disponible los martes y jueves por la mañana.",
  },
  {
    id: "inst-2",
    nombre: "Escuela Primaria N°12 \"Domingo F. Sarmiento\"",
    tipo: "Primaria",
    nivel: "Primario",
    direccion: "Av. Roca 1180",
    telefono: "0299-442-3456",
    email: "primaria12@edu.rionegro.gov.ar",
    referente: "Carlos Alberto Núñez",
    cargoReferente: "Vicedirector",
    telefonoReferente: "0299-15-460-7788",
    observaciones: "Institución con gabinete propio, coordinar con orientadora Vanina Pérez.",
  },
  {
    id: "inst-3",
    nombre: "Escuela Secundaria N°8 \"Islas Malvinas\"",
    tipo: "Secundaria",
    nivel: "Secundario",
    direccion: "Calle San Martín 780",
    telefono: "0299-442-9901",
    email: "secundaria8@edu.rionegro.gov.ar",
    referente: "Laura Beatriz Giménez",
    cargoReferente: "Preceptora general",
    telefonoReferente: "0299-15-433-2201",
    observaciones: "",
  },
  {
    id: "inst-4",
    nombre: "Escuela Especial N°22",
    tipo: "Especial",
    nivel: "Especial",
    direccion: "Calle Rivadavia 233",
    telefono: "0299-442-6677",
    email: "especial22@edu.rionegro.gov.ar",
    referente: "Fernanda Soledad Aguirre",
    cargoReferente: "Directora",
    telefonoReferente: "0299-15-477-1010",
    observaciones: "Trabaja en conjunto con equipos de integración de otras escuelas.",
  },
  {
    id: "inst-5",
    nombre: "Centro Educativo de Nivel Secundario N°3",
    tipo: "Secundaria",
    nivel: "Secundario",
    direccion: "Calle Neuquén 90",
    telefono: "0299-442-1290",
    email: "cens3@edu.rionegro.gov.ar",
    referente: "Ricardo Daniel Molina",
    cargoReferente: "Coordinador",
    telefonoReferente: "0299-15-499-8834",
    observaciones: "Turno vespertino, modalidad para jóvenes y adultos.",
  },
];

// ---------------------------------------------------------------------------
// MESAS DE COORDINACIÓN
// ---------------------------------------------------------------------------

export const mesas: Mesa[] = [
  {
    id: "mesa-1",
    institucionId: "inst-2",
    fecha: "2026-07-14",
    bimestre: 4,
    anioLectivo: 2026,
    modalidad: "Presencial",
    participantes: "Carlos Núñez (Vicedirector), Vanina Pérez (Orientadora), Federico (Psicopedagogía)",
    temasTratados: "Seguimiento de casos con inasistencias reiteradas. Revisión de acuerdos del bimestre anterior.",
    acuerdos: "Se acuerda realizar entrevista domiciliaria con la familia de T. Ramírez antes de fin de mes.",
    acta: "Acta N°14-2026 firmada por los presentes.",
    estado: "Programada",
  },
  {
    id: "mesa-2",
    institucionId: "inst-3",
    fecha: "2026-07-21",
    bimestre: 4,
    anioLectivo: 2026,
    modalidad: "Virtual",
    participantes: "Laura Giménez (Preceptora), Equipo directivo, Federico (Psicopedagogía)",
    temasTratados: "Situación de alumnos de 2° año con riesgo de abandono.",
    acuerdos: "Pendiente de definir en la reunión.",
    acta: "",
    estado: "Programada",
  },
  {
    id: "mesa-3",
    institucionId: "inst-1",
    fecha: "2026-05-19",
    bimestre: 3,
    anioLectivo: 2026,
    modalidad: "Presencial",
    participantes: "María Eugenia Sosa (Directora), Docentes de sala de 5, Federico (Psicopedagogía)",
    temasTratados: "Proceso de inclusión de alumno con diagnóstico reciente. Adaptaciones en sala.",
    acuerdos: "Se implementarán apoyos visuales y se solicitará acompañamiento externo (equipo de integración).",
    acta: "Acta N°09-2026 firmada por los presentes.",
    estado: "Realizada",
  },
  {
    id: "mesa-4",
    institucionId: "inst-4",
    fecha: "2026-05-05",
    bimestre: 3,
    anioLectivo: 2026,
    modalidad: "Presencial",
    participantes: "Fernanda Aguirre (Directora), Equipo de integración, Federico (Psicopedagogía)",
    temasTratados: "Revisión de proyectos pedagógicos individuales (PPI) del bimestre.",
    acuerdos: "Se actualizan tres PPI y se programan nuevas evaluaciones psicopedagógicas.",
    acta: "Acta N°08-2026 firmada por los presentes.",
    estado: "Realizada",
  },
  {
    id: "mesa-5",
    institucionId: "inst-5",
    fecha: "2026-04-10",
    bimestre: 2,
    anioLectivo: 2026,
    modalidad: "Virtual",
    participantes: "Ricardo Molina (Coordinador)",
    temasTratados: "Reprogramación por paro docente.",
    acuerdos: "",
    acta: "",
    estado: "Suspendida",
  },
];

// ---------------------------------------------------------------------------
// ALUMNOS
// ---------------------------------------------------------------------------

export const alumnos: Alumno[] = [
  {
    id: "alu-1",
    nombre: "Tomás",
    apellido: "Ramírez",
    dni: "58.412.309",
    fechaNacimiento: "2016-03-12",
    genero: "Masculino",
    direccion: "Calle Los Álamos 233",
    localidad: "Cipolletti",
    telefono: "0299-15-611-2233",
    responsableNombre: "Silvana Ramírez",
    responsableVinculo: "Madre",
    responsableDni: "27.884.112",
    responsableTelefono: "0299-15-611-2233",
    institucionId: "inst-2",
    nivel: "Primario",
    gradoAnioSala: "4° grado",
    turno: "Mañana",
    situacionEscolar: "Con inasistencias",
    trayectoriaPrevia: "Repitió 2° grado en 2023. Cambió de escuela en 2024.",
    obraSocial: "Sin cobertura",
    condicionesSalud: "TDAH diagnosticado en 2024.",
    tratamientos: "Acompañamiento terapéutico una vez por semana (Hospital Cipolletti).",
    cud: false,
    observaciones: "Familia con dificultades para sostener la asistencia por motivos laborales.",
  },
  {
    id: "alu-2",
    nombre: "Abril",
    apellido: "Contreras",
    dni: "56.998.201",
    fechaNacimiento: "2010-11-02",
    genero: "Femenino",
    direccion: "Av. Roca 2456",
    localidad: "Cipolletti",
    telefono: "0299-15-622-9087",
    responsableNombre: "Marcelo Contreras",
    responsableVinculo: "Padre",
    responsableDni: "24.100.887",
    responsableTelefono: "0299-15-622-9087",
    institucionId: "inst-3",
    nivel: "Secundario",
    gradoAnioSala: "2° año",
    turno: "Tarde",
    situacionEscolar: "En proceso de inclusión",
    trayectoriaPrevia: "Trayectoria regular hasta 1° año, discontinuidad por mudanza.",
    obraSocial: "OSDE",
    condicionesSalud: "Ninguna relevante.",
    tratamientos: "",
    cud: false,
    observaciones: "Buen vínculo con pares. Requiere seguimiento por bajo rendimiento en matemática.",
  },
  {
    id: "alu-3",
    nombre: "Benjamín",
    apellido: "Huenchul",
    dni: "59.001.774",
    fechaNacimiento: "2017-07-25",
    genero: "Masculino",
    direccion: "Calle Fray Luis Beltrán 88",
    localidad: "Cipolletti",
    telefono: "0299-15-633-4521",
    responsableNombre: "Romina Huenchul",
    responsableVinculo: "Madre",
    responsableDni: "30.221.456",
    responsableTelefono: "0299-15-633-4521",
    institucionId: "inst-1",
    nivel: "Inicial",
    gradoAnioSala: "Sala de 5",
    turno: "Mañana",
    situacionEscolar: "En proceso de inclusión",
    trayectoriaPrevia: "Primer año en el sistema educativo.",
    obraSocial: "Sin cobertura",
    condicionesSalud: "Diagnóstico dentro del espectro autista (en proceso de evaluación).",
    tratamientos: "Estimulación temprana, dos veces por semana.",
    cud: true,
    observaciones: "Se solicitó maestra de apoyo a la integración (MAI).",
  },
  {
    id: "alu-4",
    nombre: "Valentina",
    apellido: "Ojeda",
    dni: "57.334.900",
    fechaNacimiento: "2013-01-30",
    genero: "Femenino",
    direccion: "Calle Mitre 145",
    localidad: "Cipolletti",
    telefono: "0299-15-644-7712",
    responsableNombre: "Gabriela Ojeda",
    responsableVinculo: "Madre",
    responsableDni: "26.554.321",
    responsableTelefono: "0299-15-644-7712",
    institucionId: "inst-2",
    nivel: "Primario",
    gradoAnioSala: "6° grado",
    turno: "Tarde",
    situacionEscolar: "Escolarizado",
    trayectoriaPrevia: "Trayectoria regular.",
    obraSocial: "Swiss Medical",
    condicionesSalud: "Ninguna relevante.",
    tratamientos: "",
    cud: false,
    observaciones: "",
  },
  {
    id: "alu-5",
    nombre: "Franco",
    apellido: "Villalba",
    dni: "55.780.221",
    fechaNacimiento: "2009-09-14",
    genero: "Masculino",
    direccion: "Calle Perito Moreno 501",
    localidad: "Cipolletti",
    telefono: "0299-15-655-8834",
    responsableNombre: "Hugo Villalba",
    responsableVinculo: "Padre",
    responsableDni: "22.445.678",
    responsableTelefono: "0299-15-655-8834",
    institucionId: "inst-3",
    nivel: "Secundario",
    gradoAnioSala: "3° año",
    turno: "Tarde",
    situacionEscolar: "Desescolarizado",
    trayectoriaPrevia: "Abandonó a mitad de 2025. Se encuentra en proceso de revinculación.",
    obraSocial: "Sin cobertura",
    condicionesSalud: "Ninguna relevante.",
    tratamientos: "",
    cud: false,
    observaciones: "Familia contactada, se evalúa pase al CENS N°3.",
  },
  {
    id: "alu-6",
    nombre: "Camila",
    apellido: "Fernández",
    dni: "58.112.667",
    fechaNacimiento: "2015-05-08",
    genero: "Femenino",
    direccion: "Calle Chubut 320",
    localidad: "Cipolletti",
    telefono: "0299-15-666-2210",
    responsableNombre: "Natalia Fernández",
    responsableVinculo: "Madre",
    responsableDni: "29.887.001",
    responsableTelefono: "0299-15-666-2210",
    institucionId: "inst-4",
    nivel: "Especial",
    gradoAnioSala: "Nivel 2",
    turno: "Mañana",
    situacionEscolar: "Escolarizado",
    trayectoriaPrevia: "Ingresó a la escuela especial en 2023.",
    obraSocial: "IPROSS",
    condicionesSalud: "Discapacidad intelectual leve.",
    tratamientos: "Fonoaudiología y psicomotricidad, semanal.",
    cud: true,
    observaciones: "Buena evolución en el último año.",
  },
];

// ---------------------------------------------------------------------------
// INTERVENCIONES
// ---------------------------------------------------------------------------

export const intervenciones: Intervencion[] = [
  {
    id: "int-1",
    alumnoId: "alu-1",
    institucionId: "inst-2",
    fecha: "2026-06-10",
    tipo: "Entrevista",
    descripcion: "Entrevista con la madre de Tomás para abordar las inasistencias reiteradas del último mes.",
    acuerdosAcciones: "La familia se compromete a sostener la asistencia. Se coordina apoyo con el comedor escolar.",
    responsable: "Federico (Psicopedagogía)",
    estado: "En seguimiento",
    fechaProximoSeguimiento: "2026-07-15",
  },
  {
    id: "int-2",
    alumnoId: "alu-3",
    institucionId: "inst-1",
    fecha: "2026-05-20",
    tipo: "Derivación",
    descripcion: "Derivación a equipo de integración escolar para evaluación e inicio de proceso de inclusión.",
    acuerdosAcciones: "Se envía informe al equipo de integración. Se solicita MAI (maestra de apoyo a la inclusión).",
    responsable: "Federico (Psicopedagogía)",
    estado: "Abierta",
    fechaProximoSeguimiento: "2026-08-01",
  },
  {
    id: "int-3",
    alumnoId: "alu-5",
    institucionId: "inst-3",
    fecha: "2026-06-02",
    tipo: "Articulación",
    descripcion: "Articulación con CENS N°3 para evaluar la revinculación educativa de Franco.",
    acuerdosAcciones: "Se acuerda inscripción condicional al CENS a partir de agosto, sujeta a entrevista previa.",
    responsable: "Federico (Psicopedagogía)",
    estado: "En seguimiento",
    fechaProximoSeguimiento: "2026-07-18",
  },
  {
    id: "int-4",
    alumnoId: "alu-2",
    institucionId: "inst-3",
    fecha: "2026-04-15",
    tipo: "Seguimiento",
    descripcion: "Seguimiento del rendimiento en matemática y adaptación al proceso de inclusión.",
    acuerdosAcciones: "Se realizarán apoyos individuales quincenales con la profesora de matemática.",
    responsable: "Federico (Psicopedagogía)",
    estado: "Cerrada",
    fechaProximoSeguimiento: null,
  },
  {
    id: "int-5",
    alumnoId: "alu-6",
    institucionId: "inst-4",
    fecha: "2026-06-25",
    tipo: "Seguimiento",
    descripcion: "Control periódico de la evolución de Camila en el proceso pedagógico.",
    acuerdosAcciones: "Continuar con el plan actual, sin modificaciones.",
    responsable: "Federico (Psicopedagogía)",
    estado: "Cerrada",
    fechaProximoSeguimiento: null,
  },
  {
    id: "int-6",
    alumnoId: "alu-1",
    institucionId: "inst-2",
    fecha: "2026-07-01",
    tipo: "Entrevista",
    descripcion: "Nueva entrevista domiciliaria acordada en la mesa de coordinación de julio.",
    acuerdosAcciones: "Pendiente de realizar.",
    responsable: "Federico (Psicopedagogía)",
    estado: "Abierta",
    fechaProximoSeguimiento: "2026-07-20",
  },
];

// ---------------------------------------------------------------------------
// Helpers de acceso (para consumo en las pantallas del prototipo)
// ---------------------------------------------------------------------------

export function getInstitucion(id: string): Institucion | undefined {
  return instituciones.find((i) => i.id === id);
}

export function getAlumno(id: string): Alumno | undefined {
  return alumnos.find((a) => a.id === id);
}

export function getMesa(id: string): Mesa | undefined {
  return mesas.find((m) => m.id === id);
}

export function getIntervencion(id: string): Intervencion | undefined {
  return intervenciones.find((i) => i.id === id);
}

export function mesasDeInstitucion(institucionId: string): Mesa[] {
  return mesas.filter((m) => m.institucionId === institucionId);
}

export function alumnosDeInstitucion(institucionId: string): Alumno[] {
  return alumnos.filter((a) => a.institucionId === institucionId);
}

export function intervencionesDeInstitucion(institucionId: string): Intervencion[] {
  return intervenciones.filter((i) => i.institucionId === institucionId);
}

export function intervencionesDeAlumno(alumnoId: string): Intervencion[] {
  return intervenciones.filter((i) => i.alumnoId === alumnoId);
}
