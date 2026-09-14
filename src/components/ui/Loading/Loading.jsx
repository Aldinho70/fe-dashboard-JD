import CircularProgress from "@mui/material/CircularProgress";

function Loading({ message = "Cargando información...", className = "" }) {
  return (
    <div
      className={`flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-panel)] px-6 py-8 text-center text-[var(--app-text)] shadow-xl shadow-slate-950/20 backdrop-blur-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      <CircularProgress size={34} thickness={4} sx={{ color: "var(--accent)" }} />
      <span className="text-sm font-semibold text-[var(--muted-text)]">{message}</span>
    </div>
  );
}

export default Loading;
