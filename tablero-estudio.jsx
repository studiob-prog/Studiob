import { useState, useMemo } from "react";

const DISCIPLINA_COLORS = {
  "Canto": { bg: "#FF6B35", light: "#FFF0EB", text: "#FF6B35" },
  "Teatro": { bg: "#7C3AED", light: "#F3EEFF", text: "#7C3AED" },
  "Danza": { bg: "#E91E8C", light: "#FFEEF7", text: "#E91E8C" },
  "Cine": { bg: "#0EA5E9", light: "#E8F7FF", text: "#0EA5E9" },
};

const INITIAL_GRUPOS = [
  { id: 1, nombre: "Canto Individual CDMX", disciplina: "Canto", alumnos: 9, tarifa: 1711, dia: "Mar / Jue / Dom", hora: "Varios", modalidad: "Individual", estado: "Activo", detalle: "Diego $1,500 · Jorge $3,000 · Atzin $1,500 · Alexa $1,500 · Jaime $1,500 · Elidey $1,500 · Mariana $1,500 · Karla $1,500 · TanTan $1,400" },
  { id: 2, nombre: "Canto Individual Atizapan", disciplina: "Canto", alumnos: 4, tarifa: 1425, dia: "Mie / Vie", hora: "Varios", modalidad: "Individual", estado: "Activo", detalle: "Angel $1,200 · Ceci $1,500 · Bruno $1,500 · Anahi $1,500" },
  { id: 3, nombre: "Canto Grupal CDMX", disciplina: "Canto", alumnos: 3, tarifa: 667, dia: "Domingo", hora: "11:00", modalidad: "Grupal", estado: "Activo", detalle: "Andres $800 · Alexa $800 · Diego $600" },
  { id: 4, nombre: "Canto Grupal Atizapan", disciplina: "Canto", alumnos: 5, tarifa: 1040, dia: "Domingo", hora: "17:00", modalidad: "Grupal", estado: "Activo", detalle: "Gio $960 · Sophie $960 · Alizee $960 · Damaris $960 · Renee $1,200" },
  { id: 5, nombre: "Teatro Musical — Heathers", disciplina: "Teatro", alumnos: 5, tarifa: 1200, dia: "Domingo", hora: "14:00–17:00", modalidad: "Grupal", estado: "Activo", detalle: "Gio · Sophie · Damaris · Dany · Alizee" },
  { id: 8, nombre: "Teatro Musical — Mentiras", disciplina: "Teatro", alumnos: 1, tarifa: 4000, dia: "Lunes", hora: "20:00–23:00", modalidad: "Grupal", estado: "Activo", detalle: "Grupo activo — cuota fija $4,000/mes" },
  { id: 6, nombre: "Cine / Actuacion para Camara", disciplina: "Cine", alumnos: 6, tarifa: 1200, dia: "Por definir", hora: "Por definir", modalidad: "Grupal", estado: "Activo", detalle: "Omar · Luis · Irlanda · Andres · Pau · Angel" },
  { id: 7, nombre: "Actuacion Escenica", disciplina: "Teatro", alumnos: 2, tarifa: 1200, dia: "Por definir", hora: "Por definir", modalidad: "Individual", estado: "Activo", detalle: "Irlanda · Andres" },
  { id: 9, nombre: "Creacion Escenica — Facultad de Cine", disciplina: "Teatro", alumnos: 6, tarifa: 1500, dia: "Lunes", hora: "18:00–20:00", modalidad: "Grupal", estado: "Pausado", detalle: "En apertura · 13 abr – 6 jul 2026 · $3,000 taller / $1,500 mens. / $1,200 estudiantes" },
  { id: 10, nombre: "Coro — Escuela Ford Atizapan", disciplina: "Canto", alumnos: 1, tarifa: 5400, dia: "Mie y Vie", hora: "08:00–10:00", modalidad: "Institucional", estado: "Activo", detalle: "Contrato con escuela primaria Ford, Atizapan" },
  { id: 11, nombre: "Colegio Harden CDMX — Canto", disciplina: "Canto", alumnos: 0, tarifa: 0, dia: "Lun o Mar", hora: "Por confirmar", modalidad: "Institucional", estado: "Pausado", detalle: "Propuesta pendiente" },
  { id: 12, nombre: "Colegio Harden CDMX — Actuacion", disciplina: "Teatro", alumnos: 0, tarifa: 0, dia: "Lun o Mar", hora: "Por confirmar", modalidad: "Institucional", estado: "Pausado", detalle: "Propuesta pendiente" },
];

const INITIAL_PRODUCCIONES = [
  { id: 1, nombre: "Festival de Cine + Ensamble B", tipo: "Profesional", etapa: "Fechas confirmadas", fecha: "2026-06-04", presupuesto: 20000, captado: 0, notas: "4–7 jun. Cortometraje alumnos de cine + actividad Ensamble B" },
  { id: 2, nombre: "Heathers — Teatro Musical con Musica en Vivo", tipo: "Profesional", etapa: "En ensayos", fecha: "2026-07-01", presupuesto: 29000, captado: 0, notas: "Teatro 1,000 personas. Costo x funcion: $29,000. Proyeccion: 60% aforo x $200 = $91,000 neto/funcion." },
];

const INITIAL_CONCIERTOS = [
  { id: 1, alumno: "Diego", foro: "Belle Epoque", mes: "Mayo", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 2, alumno: "Mariana", foro: "Belle Epoque", mes: "Mayo", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 3, alumno: "Angel", foro: "Studio B", mes: "Mayo", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 4, alumno: "Ceci", foro: "Studio B", mes: "Mayo", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 5, alumno: "Jorge", foro: "Belle Epoque", mes: "Junio", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 6, alumno: "Karla", foro: "Belle Epoque", mes: "Junio", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 7, alumno: "Bruno", foro: "Studio B", mes: "Junio", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 8, alumno: "Anahi", foro: "Studio B", mes: "Junio", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 9, alumno: "Alexa", foro: "Belle Epoque", mes: "Agosto", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 10, alumno: "Jaime", foro: "Belle Epoque", mes: "Agosto", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 11, alumno: "Elidey", foro: "Studio B", mes: "Septiembre", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 12, alumno: "Atzin", foro: "Studio B", mes: "Septiembre", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
  { id: 13, alumno: "TanTan", foro: "Belle Epoque", mes: "Octubre", estado: "pendiente", entradaCobrada: 0, cuotaCobrada: false, asistentes: 0 },
];

const INITIAL_PASOS = [
  // CONCIERTOS
  { id: 1, categoria: "Conciertos", texto: "Comunicar programa de recitales a todos los alumnos de canto", hecho: false, prioridad: "alta" },
  { id: 2, categoria: "Conciertos", texto: "Cobrar cuota de produccion ($800) a cada alumno antes de su concierto", hecho: false, prioridad: "alta" },
  { id: 3, categoria: "Conciertos", texto: "Abrir link de MercadoPago para venta de entradas por concierto", hecho: false, prioridad: "alta" },
  { id: 4, categoria: "Conciertos", texto: "Confirmar fechas de Mayo en Belle Epoque (Diego, Mariana)", hecho: false, prioridad: "alta" },
  { id: 5, categoria: "Conciertos", texto: "Confirmar fechas de Mayo en Studio B (Angel, Ceci)", hecho: false, prioridad: "alta" },
  { id: 6, categoria: "Conciertos", texto: "Definir logistica de video/foto para documentar cada recital", hecho: false, prioridad: "media" },
  // HEATHERS
  { id: 7, categoria: "Heathers", texto: "Confirmar fecha exacta de funcion(es) en julio", hecho: false, prioridad: "alta" },
  { id: 8, categoria: "Heathers", texto: "Cerrar contrato con el teatro (pago de $14,000/funcion)", hecho: false, prioridad: "alta" },
  { id: 9, categoria: "Heathers", texto: "Confirmar y contratar ensamble de musicos ($5,000/funcion)", hecho: false, prioridad: "alta" },
  { id: 10, categoria: "Heathers", texto: "Abrir preventa de boletos — iniciar con red de alumnos y familias", hecho: false, prioridad: "alta" },
  { id: 11, categoria: "Heathers", texto: "Cerrar vestuario y produccion ($10,000)", hecho: false, prioridad: "media" },
  { id: 12, categoria: "Heathers", texto: "Definir precio de boletos y tiers (VIP / general)", hecho: false, prioridad: "media" },
  { id: 13, categoria: "Heathers", texto: "Buscar patrocinadores o empresas para bloques de boletos", hecho: false, prioridad: "media" },
  // FESTIVAL CINE
  { id: 14, categoria: "Festival Cine", texto: "Confirmar programa completo del festival 4–7 junio", hecho: false, prioridad: "alta" },
  { id: 15, categoria: "Festival Cine", texto: "Terminar corto con alumnos de cine antes del festival", hecho: false, prioridad: "alta" },
  { id: 16, categoria: "Festival Cine", texto: "Definir entrada/cuota del festival y abrir registro", hecho: false, prioridad: "media" },
  { id: 17, categoria: "Festival Cine", texto: "Coordinar participacion del Ensamble B", hecho: false, prioridad: "media" },
  // INSTITUCIONAL
  { id: 18, categoria: "Institucional", texto: "Enviar propuesta formal a Colegio Harden (canto + actuacion)", hecho: false, prioridad: "alta" },
  { id: 19, categoria: "Institucional", texto: "Confirmar inscritos del Taller Creacion Escenica — Fac. Cine", hecho: false, prioridad: "alta" },
  { id: 20, categoria: "Institucional", texto: "Cobrar inscripciones del Taller Creacion Escenica", hecho: false, prioridad: "alta" },
  // ESTUDIO
  { id: 21, categoria: "Estudio", texto: "Definir horarios del grupo de Cine / Actuacion para Camara", hecho: false, prioridad: "media" },
  { id: 22, categoria: "Estudio", texto: "Definir horarios de Actuacion Escenica (Irlanda, Andres)", hecho: false, prioridad: "media" },
  { id: 23, categoria: "Estudio", texto: "Abrir cuenta bancaria exclusiva para el estudio", hecho: false, prioridad: "alta" },
  { id: 24, categoria: "Estudio", texto: "Establecer dia fijo de cobro mensual (del 1 al 5)", hecho: false, prioridad: "alta" },
  { id: 25, categoria: "Estudio", texto: "Buscar apoyo administrativo (aunque sea medio tiempo)", hecho: false, prioridad: "media" },
];

const ETAPA_STYLE = {
  "En planeacion": { bg: "#FEF3C7", text: "#92400E" },
  "Buscando financiamiento": { bg: "#FCE7F3", text: "#9D174D" },
  "Fechas confirmadas": { bg: "#DBEAFE", text: "#1E40AF" },
  "En ensayos": { bg: "#D1FAE5", text: "#065F46" },
  "Estreno": { bg: "#EDE9FE", text: "#5B21B6" },
};

const ESTADO_CONCIERTO = {
  "pendiente": { bg: "#F3F4F6", text: "#6B7280", label: "Pendiente" },
  "confirmado": { bg: "#DBEAFE", text: "#1E40AF", label: "Confirmado" },
  "realizado": { bg: "#D1FAE5", text: "#065F46", label: "Realizado" },
};

const CAT_COLORS = {
  "Conciertos": "#FF6B35",
  "Heathers": "#7C3AED",
  "Festival Cine": "#0EA5E9",
  "Institucional": "#059669",
  "Estudio": "#6B7280",
};

function formatMXN(n) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

function Badge({ label, style }) {
  return <span style={{ ...style, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{label}</span>;
}

function Modal({ onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,10,20,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, minWidth: 320, maxWidth: 460, width: "90%", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function GrupoForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { nombre: "", disciplina: "Canto", alumnos: 1, tarifa: 1000, dia: "", hora: "", modalidad: "Grupal", estado: "Activo", detalle: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <>
      <h3 style={{ margin: "0 0 18px", fontFamily: "serif", fontSize: 18 }}>{initial ? "Editar grupo" : "Nuevo grupo"}</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {[["Nombre", "nombre", "text"], ["Alumnos", "alumnos", "number"], ["Tarifa (MXN)", "tarifa", "number"], ["Dia", "dia", "text"], ["Hora", "hora", "text"], ["Detalle / alumnos", "detalle", "text"]].map(([label, key, type]) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
            {label}
            <input type={type} value={form[key]} onChange={e => set(key, type === "number" ? +e.target.value : e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }} />
          </label>
        ))}
        {[["Disciplina", "disciplina", ["Canto","Teatro","Danza","Cine"]], ["Estado", "estado", ["Activo","Pausado","Cerrado"]], ["Modalidad", "modalidad", ["Individual","Grupal","Institucional"]]].map(([label, key, opts]) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
            {label}
            <select value={form[key]} onChange={e => set(key, e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: 7, border: "1.5px solid #E5E7EB", background: "none", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
        <button onClick={() => onSave(form)} style={{ padding: "8px 16px", borderRadius: 7, border: "none", background: "#1A1A2E", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Guardar</button>
      </div>
    </>
  );
}

function ProdForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { nombre: "", tipo: "Profesional", etapa: "En planeacion", fecha: "", presupuesto: 0, captado: 0, notas: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <>
      <h3 style={{ margin: "0 0 18px", fontFamily: "serif", fontSize: 18 }}>{initial ? "Editar produccion" : "Nueva produccion"}</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {[["Nombre", "nombre", "text"], ["Fecha", "fecha", "date"], ["Presupuesto", "presupuesto", "number"], ["Captado", "captado", "number"]].map(([label, key, type]) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
            {label}
            <input type={type} value={form[key]} onChange={e => set(key, type === "number" ? +e.target.value : e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }} />
          </label>
        ))}
        <label style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
          Notas
          <textarea value={form.notas} onChange={e => set("notas", e.target.value)} rows={2} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13, resize: "vertical" }} />
        </label>
        {[["Tipo", "tipo", ["Profesional","Infantil","Circo"]], ["Etapa", "etapa", Object.keys(ETAPA_STYLE)]].map(([label, key, opts]) => (
          <label key={key} style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
            {label}
            <select value={form[key]} onChange={e => set(key, e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: 7, border: "1.5px solid #E5E7EB", background: "none", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
        <button onClick={() => onSave(form)} style={{ padding: "8px 16px", borderRadius: 7, border: "none", background: "#1A1A2E", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Guardar</button>
      </div>
    </>
  );
}

function ConciertoEditModal({ concierto, onSave, onClose }) {
  const [form, setForm] = useState(concierto);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const ingresoEntrada = form.asistentes * 150;
  const ingresoCafe = form.foro === "Studio B" ? form.asistentes * 150 : 0;
  const cuota = form.cuotaCobrada ? 800 : 0;
  const total = ingresoEntrada + ingresoCafe + cuota;
  return (
    <>
      <h3 style={{ margin: "0 0 4px", fontFamily: "serif", fontSize: 18 }}>Concierto de {form.alumno}</h3>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: "#888" }}>{form.mes} · {form.foro}</p>
      <div style={{ display: "grid", gap: 10 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
          Estado
          <select value={form.estado} onChange={e => set("estado", e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }}>
            {Object.keys(ESTADO_CONCIERTO).map(s => <option key={s} value={s}>{ESTADO_CONCIERTO[s].label}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#555" }}>
          Asistentes reales (0 si aun no ocurre)
          <input type="number" value={form.asistentes} onChange={e => set("asistentes", +e.target.value)} style={{ padding: "7px 10px", border: "1.5px solid #E5E7EB", borderRadius: 7, fontSize: 13 }} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#555", cursor: "pointer" }}>
          <input type="checkbox" checked={form.cuotaCobrada} onChange={e => set("cuotaCobrada", e.target.checked)} style={{ width: 16, height: 16 }} />
          Cuota de produccion cobrada ($800)
        </label>
      </div>
      <div style={{ margin: "16px 0", padding: "12px 14px", background: "#F7F6F3", borderRadius: 10, fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: "#555" }}><span>Entrada ({form.asistentes} × $150)</span><span>{formatMXN(ingresoEntrada)}</span></div>
        {form.foro === "Studio B" && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: "#555" }}><span>Cafeteria Studio B ({form.asistentes} × $150)</span><span>{formatMXN(ingresoCafe)}</span></div>}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#555" }}><span>Cuota produccion</span><span>{formatMXN(cuota)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, borderTop: "1px solid #E5E7EB", paddingTop: 8 }}><span>Total noche</span><span style={{ color: "#059669" }}>{formatMXN(total)}</span></div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: 7, border: "1.5px solid #E5E7EB", background: "none", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
        <button onClick={() => onSave(form)} style={{ padding: "8px 16px", borderRadius: 7, border: "none", background: "#1A1A2E", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Guardar</button>
      </div>
    </>
  );
}

export default function Tablero() {
  const [tab, setTab] = useState("resumen");
  const [grupos, setGrupos] = useState(INITIAL_GRUPOS);
  const [producciones, setProducciones] = useState(INITIAL_PRODUCCIONES);
  const [conciertos, setConciertos] = useState(INITIAL_CONCIERTOS);
  const [pasos, setPasos] = useState(INITIAL_PASOS);
  const [modal, setModal] = useState(null);
  const [nextId, setNextId] = useState(30);
  const [filtroCat, setFiltroCat] = useState("Todos");

  const ingresoMensual = useMemo(() => grupos.filter(g => g.estado === "Activo").reduce((s, g) => s + g.alumnos * g.tarifa, 0), [grupos]);
  const totalAlumnos = useMemo(() => grupos.filter(g => g.estado === "Activo").reduce((s, g) => s + g.alumnos, 0), [grupos]);

  const ingresoConciertoTotal = useMemo(() => conciertos.reduce((s, c) => {
    const entrada = c.asistentes * 150;
    const cafe = c.foro === "Studio B" ? c.asistentes * 150 : 0;
    const cuota = c.cuotaCobrada ? 800 : 0;
    return s + entrada + cafe + cuota;
  }, 0), [conciertos]);

  const conciertosPorMes = useMemo(() => {
    const meses = {};
    conciertos.forEach(c => {
      if (!meses[c.mes]) meses[c.mes] = [];
      meses[c.mes].push(c);
    });
    return meses;
  }, [conciertos]);

  const pasosPorCat = useMemo(() => {
    const cats = {};
    pasos.forEach(p => {
      if (!cats[p.categoria]) cats[p.categoria] = [];
      cats[p.categoria].push(p);
    });
    return cats;
  }, [pasos]);

  const totalHechos = pasos.filter(p => p.hecho).length;
  const pctAvance = Math.round((totalHechos / pasos.length) * 100);

  const saveGrupo = (form) => {
    if (form.id) setGrupos(gs => gs.map(g => g.id === form.id ? form : g));
    else { setGrupos(gs => [...gs, { ...form, id: nextId }]); setNextId(n => n + 1); }
    setModal(null);
  };
  const saveProd = (form) => {
    if (form.id) setProducciones(ps => ps.map(p => p.id === form.id ? form : p));
    else { setProducciones(ps => [...ps, { ...form, id: nextId }]); setNextId(n => n + 1); }
    setModal(null);
  };
  const saveConcierto = (form) => {
    setConciertos(cs => cs.map(c => c.id === form.id ? form : c));
    setModal(null);
  };
  const togglePaso = (id) => setPasos(ps => ps.map(p => p.id === id ? { ...p, hecho: !p.hecho } : p));

  const TABS = [
    { id: "resumen", label: "📊 Resumen" },
    { id: "grupos", label: "🎭 Grupos" },
    { id: "producciones", label: "🎪 Producciones" },
    { id: "conciertos", label: "🎤 Conciertos" },
    { id: "proyeccion", label: "📈 Proyeccion" },
    { id: "pasos", label: "✅ Pasos" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F7F6F3", minHeight: "100vh", paddingBottom: 40 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; } button:hover { opacity: 0.85; }`}</style>

      <div style={{ background: "#1A1A2E", padding: "24px 28px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,107,53,0.12)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 100, width: 130, height: 130, borderRadius: "50%", background: "rgba(124,58,237,0.1)" }} />
        <p style={{ color: "#FF6B35", fontWeight: 700, letterSpacing: 3, fontSize: 10, margin: "0 0 4px", textTransform: "uppercase" }}>Estudio de Artes Escenicas</p>
        <h1 style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0 }}>Tablero de Control</h1>
        <p style={{ color: "#8B8FA8", fontSize: 12, margin: "4px 0 0" }}>Grupos · Conciertos · Producciones · Proyecciones · Pasos</p>
      </div>

      <div style={{ display: "flex", gap: 3, padding: "14px 20px 0", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 14px", borderRadius: "9px 9px 0 0", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: tab === t.id ? "#fff" : "transparent",
            color: tab === t.id ? "#1A1A2E" : "#888",
            boxShadow: tab === t.id ? "0 -2px 8px rgba(0,0,0,0.06)" : "none",
            whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ background: "#fff", margin: "0 20px", borderRadius: "0 12px 12px 12px", padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

        {/* RESUMEN */}
        {tab === "resumen" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Ingreso mensual base", value: formatMXN(ingresoMensual), color: "#FF6B35", icon: "💰" },
                { label: "Alumnos activos", value: totalAlumnos, color: "#7C3AED", icon: "👥" },
                { label: "Recitales programados", value: conciertos.length, color: "#E91E8C", icon: "🎤" },
                { label: "Recitales realizados", value: conciertos.filter(c => c.estado === "realizado").length, color: "#059669", icon: "✅" },
                { label: "Captado en recitales", value: formatMXN(ingresoConciertoTotal), color: "#0EA5E9", icon: "🎵" },
                { label: "Avance de pasos", value: `${pctAvance}%`, color: "#6B7280", icon: "📋" },
              ].map(m => (
                <div key={m.label} style={{ background: "#F7F6F3", borderRadius: 12, padding: "14px 16px", borderLeft: `3px solid ${m.color}` }}>
                  <div style={{ fontSize: 18 }}>{m.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1A2E", marginTop: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, margin: "0 0 12px" }}>Ingresos por disciplina</h3>
            <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
              {["Canto", "Teatro", "Danza", "Cine"].map(disc => {
                const gs = grupos.filter(g => g.disciplina === disc && g.estado === "Activo");
                const total = gs.reduce((s, g) => s + g.alumnos * g.tarifa, 0);
                const pct = ingresoMensual ? Math.round((total / ingresoMensual) * 100) : 0;
                const col = DISCIPLINA_COLORS[disc];
                return (
                  <div key={disc}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 13 }}>
                      <span style={{ fontWeight: 600, color: col.text }}>{disc}</span>
                      <span style={{ color: "#555" }}>{formatMXN(total)} <span style={{ color: "#aaa" }}>({pct}%)</span></span>
                    </div>
                    <div style={{ height: 6, background: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: col.bg, borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, margin: "0 0 12px" }}>Pasos urgentes pendientes</h3>
            {pasos.filter(p => p.prioridad === "alta" && !p.hecho).slice(0, 5).map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 12px", background: "#FFF9F5", borderRadius: 8, borderLeft: `3px solid ${CAT_COLORS[p.categoria] || "#888"}` }}>
                <input type="checkbox" checked={p.hecho} onChange={() => togglePaso(p.id)} style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#FF6B35" }} />
                <div>
                  <div style={{ fontSize: 12, color: CAT_COLORS[p.categoria] || "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.categoria}</div>
                  <div style={{ fontSize: 13, color: "#333" }}>{p.texto}</div>
                </div>
              </div>
            ))}
            <button onClick={() => setTab("pasos")} style={{ marginTop: 8, fontSize: 12, color: "#FF6B35", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Ver todos los pasos →</button>
          </div>
        )}

        {/* GRUPOS */}
        {tab === "grupos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: 0 }}>Grupos y Clases</h2>
              <button onClick={() => setModal({ tipo: "grupo" })} style={{ padding: "8px 16px", background: "#1A1A2E", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>+ Nuevo</button>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {grupos.map(g => {
                const col = DISCIPLINA_COLORS[g.disciplina] || { bg: "#888", light: "#f5f5f5", text: "#888" };
                const ingreso = g.alumnos * g.tarifa;
                return (
                  <div key={g.id} style={{ border: `1.5px solid ${col.bg}22`, borderRadius: 12, padding: "14px 16px", background: col.light, display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <Badge label={g.disciplina} style={{ background: col.bg, color: "#fff" }} />
                        <span style={{ fontSize: 10, color: g.estado === "Activo" ? "#059669" : "#EF4444", fontWeight: 700 }}>● {g.estado}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}>{g.nombre}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{g.dia} {g.hora} · {g.modalidad}</div>
                      {g.detalle && <div style={{ fontSize: 11, color: "#aaa", marginTop: 3, lineHeight: 1.5 }}>{g.detalle}</div>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#888" }}>{g.alumnos} al. × {formatMXN(g.tarifa)}</div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: col.text }}>{formatMXN(ingreso)}/mes</div>
                    </div>
                    <div style={{ display: "flex", gap: 5, alignSelf: "center" }}>
                      <button onClick={() => setModal({ tipo: "grupo", data: g })} style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontSize: 11 }}>Editar</button>
                      <button onClick={() => setGrupos(gs => gs.filter(x => x.id !== g.id))} style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #FEE2E2", background: "#FEF2F2", color: "#EF4444", cursor: "pointer", fontSize: 11 }}>✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#F7F6F3", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#555" }}>Total mensual (activos)</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: "#FF6B35" }}>{formatMXN(ingresoMensual)}</span>
            </div>
          </div>
        )}

        {/* PRODUCCIONES */}
        {tab === "producciones" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: 0 }}>Producciones</h2>
              <button onClick={() => setModal({ tipo: "prod" })} style={{ padding: "8px 16px", background: "#7C3AED", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>+ Nueva</button>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {producciones.map(p => {
                const pct = p.presupuesto ? Math.round((p.captado / p.presupuesto) * 100) : 0;
                const brecha = p.presupuesto - p.captado;
                const est = ETAPA_STYLE[p.etapa] || { bg: "#eee", text: "#555" };
                return (
                  <div key={p.id} style={{ border: "1.5px solid #E5E7EB", borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                          <Badge label={p.tipo} style={{ background: "#F3F4F6", color: "#374151" }} />
                          <Badge label={p.etapa} style={{ background: est.bg, color: est.text }} />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#1A1A2E" }}>{p.nombre}</div>
                        {p.fecha && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>📅 {new Date(p.fecha + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</div>}
                        {p.notas && <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4, fontStyle: "italic" }}>{p.notas}</div>}
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button onClick={() => setModal({ tipo: "prod", data: p })} style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontSize: 11 }}>Editar</button>
                        <button onClick={() => setProducciones(ps => ps.filter(x => x.id !== p.id))} style={{ padding: "5px 10px", borderRadius: 6, border: "1.5px solid #FEE2E2", background: "#FEF2F2", color: "#EF4444", cursor: "pointer", fontSize: 11 }}>✕</button>
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 4 }}>
                        <span>Captado: {formatMXN(p.captado)} / {formatMXN(p.presupuesto)}</span>
                        <span style={{ fontWeight: 700, color: pct >= 100 ? "#059669" : "#7C3AED" }}>{pct}%</span>
                      </div>
                      <div style={{ height: 7, background: "#F0F0F0", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: pct >= 100 ? "#059669" : "#7C3AED", borderRadius: 4 }} />
                      </div>
                      {brecha > 0 && <div style={{ fontSize: 11, color: "#EF4444", marginTop: 4, fontWeight: 600 }}>Falta: {formatMXN(brecha)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONCIERTOS */}
        {tab === "conciertos" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: "0 0 4px" }}>Recitales Solistas</h2>
              <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Cuota produccion $800 · Entrada $150 · Cafeteria Studio B $150/persona</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Total programados", value: conciertos.length, color: "#FF6B35" },
                { label: "Confirmados", value: conciertos.filter(c => c.estado === "confirmado").length, color: "#0EA5E9" },
                { label: "Realizados", value: conciertos.filter(c => c.estado === "realizado").length, color: "#059669" },
                { label: "Captado total", value: formatMXN(ingresoConciertoTotal), color: "#7C3AED" },
              ].map(m => (
                <div key={m.label} style={{ background: "#F7F6F3", borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${m.color}` }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A2E" }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{m.label}</div>
                </div>
              ))}
            </div>

            {Object.entries(conciertosPorMes).map(([mes, lista]) => (
              <div key={mes} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{mes}</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {lista.map(c => {
                    const est = ESTADO_CONCIERTO[c.estado] || ESTADO_CONCIERTO["pendiente"];
                    const entrada = c.asistentes * 150;
                    const cafe = c.foro === "Studio B" ? c.asistentes * 150 : 0;
                    const cuota = c.cuotaCobrada ? 800 : 0;
                    const total = entrada + cafe + cuota;
                    const esBelle = c.foro === "Belle Epoque";
                    return (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, flexWrap: "wrap" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: esBelle ? "#FFF0EB" : "#F0EDFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                          {esBelle ? "🎭" : "🎵"}
                        </div>
                        <div style={{ flex: 1, minWidth: 100 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}>{c.alumno}</div>
                          <div style={{ fontSize: 11, color: "#888" }}>{c.foro} {c.asistentes > 0 && `· ${c.asistentes} asistentes`}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <Badge label={est.label} style={{ background: est.bg, color: est.text }} />
                          {c.cuotaCobrada && <Badge label="Cuota ✓" style={{ background: "#D1FAE5", color: "#065F46" }} />}
                          {total > 0 && <span style={{ fontWeight: 700, fontSize: 13, color: "#059669" }}>{formatMXN(total)}</span>}
                        </div>
                        <button onClick={() => setModal({ tipo: "concierto", data: c })} style={{ padding: "5px 12px", borderRadius: 6, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontSize: 11 }}>Actualizar</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ padding: "14px 16px", background: "#F0EDFF", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Proyeccion total 13 recitales</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Escenario realista: 60 asistentes promedio</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#7C3AED" }}>{formatMXN(13 * (60*150 + 800) + 6 * 60*150)}</div>
                <div style={{ fontSize: 10, color: "#aaa" }}>incluye cafeteria Studio B (6 noches)</div>
              </div>
            </div>
          </div>
        )}

        {/* PROYECCION */}
        {tab === "proyeccion" && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: "0 0 16px" }}>Proyeccion Financiera</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 24 }}>
              {[
                { label: "Este mes", value: ingresoMensual, color: "#FF6B35", sub: "clases" },
                { label: "3 meses", value: ingresoMensual * 3, color: "#E91E8C", sub: "clases" },
                { label: "6 meses", value: ingresoMensual * 6, color: "#7C3AED", sub: "clases" },
                { label: "12 meses", value: ingresoMensual * 12, color: "#0EA5E9", sub: "clases" },
              ].map(p => (
                <div key={p.label} style={{ textAlign: "center", padding: "14px 10px", borderRadius: 12, border: `2px solid ${p.color}22`, background: `${p.color}08` }}>
                  <div style={{ fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: p.color }}>{formatMXN(p.value)}</div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>{p.sub}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, margin: "0 0 12px" }}>Motores de ingreso adicionales</h3>
            <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Recitales solistas (13 × ~$9,800 promedio)", min: 117000, max: 200000, color: "#FF6B35" },
                { label: "Heathers — 2 funciones (60–80% aforo)", min: 91000, max: 182000, color: "#7C3AED" },
                { label: "Festival de Cine junio", min: 10000, max: 30000, color: "#0EA5E9" },
                { label: "Colegio Harden (si cierra)", min: 8000, max: 15000, color: "#059669" },
              ].map(m => (
                <div key={m.label} style={{ padding: "12px 14px", background: "#F7F6F3", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "#333", flex: 1 }}>{m.label}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: m.color, whiteSpace: "nowrap" }}>{formatMXN(m.min)} – {formatMXN(m.max)}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 18px", background: "#1A1A2E", borderRadius: 12, color: "#fff" }}>
              <div style={{ fontSize: 11, color: "#FF6B35", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Potencial total abril – diciembre 2026</div>
              <div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
                {[
                  ["Clases (9 meses)", formatMXN(ingresoMensual * 9)],
                  ["Recitales solistas", "$117k – $200k"],
                  ["Heathers (julio)", "$91k – $182k"],
                  ["Festival de Cine", "$10k – $30k"],
                  ["Colegio Harden", "$72k – $135k"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 5 }}>
                    <span style={{ color: "#8B8FA8" }}>{k}</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#8B8FA8" }}>Total estimado</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#FF6B35" }}>$800k – $1.2M</span>
              </div>
            </div>
          </div>
        )}

        {/* PASOS */}
        {tab === "pasos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, margin: 0 }}>Lista de Pasos</h2>
              <span style={{ fontSize: 13, fontWeight: 700, color: pctAvance >= 80 ? "#059669" : pctAvance >= 40 ? "#FF6B35" : "#EF4444" }}>{totalHechos}/{pasos.length} · {pctAvance}%</span>
            </div>
            <div style={{ height: 6, background: "#F0F0F0", borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ height: "100%", width: `${pctAvance}%`, background: "#FF6B35", borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {["Todos", ...Object.keys(pasosPorCat)].map(cat => (
                <button key={cat} onClick={() => setFiltroCat(cat)} style={{
                  padding: "5px 12px", borderRadius: 20, border: "1.5px solid", cursor: "pointer", fontSize: 11, fontWeight: 700,
                  borderColor: filtroCat === cat ? (CAT_COLORS[cat] || "#1A1A2E") : "#E5E7EB",
                  background: filtroCat === cat ? (CAT_COLORS[cat] || "#1A1A2E") : "#fff",
                  color: filtroCat === cat ? "#fff" : "#555",
                }}>{cat}</button>
              ))}
            </div>

            {Object.entries(pasosPorCat).filter(([cat]) => filtroCat === "Todos" || filtroCat === cat).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: CAT_COLORS[cat] || "#888" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: CAT_COLORS[cat] || "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>{cat}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{items.filter(p => p.hecho).length}/{items.length}</span>
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {items.map(p => (
                    <label key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 8, background: p.hecho ? "#F0FDF4" : "#F9FAFB", border: `1px solid ${p.hecho ? "#BBF7D0" : "#E5E7EB"}`, cursor: "pointer" }}>
                      <input type="checkbox" checked={p.hecho} onChange={() => togglePaso(p.id)} style={{ width: 15, height: 15, marginTop: 1, cursor: "pointer", accentColor: CAT_COLORS[cat] || "#FF6B35", flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 13, color: p.hecho ? "#6B7280" : "#1A1A2E", textDecoration: p.hecho ? "line-through" : "none" }}>{p.texto}</span>
                        {!p.hecho && p.prioridad === "alta" && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: "#EF4444", textTransform: "uppercase" }}>urgente</span>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal?.tipo === "grupo" && <Modal onClose={() => setModal(null)}><GrupoForm initial={modal.data} onSave={saveGrupo} onClose={() => setModal(null)} /></Modal>}
      {modal?.tipo === "prod" && <Modal onClose={() => setModal(null)}><ProdForm initial={modal.data} onSave={saveProd} onClose={() => setModal(null)} /></Modal>}
      {modal?.tipo === "concierto" && <Modal onClose={() => setModal(null)}><ConciertoEditModal concierto={modal.data} onSave={saveConcierto} onClose={() => setModal(null)} /></Modal>}
    </div>
  );
}
