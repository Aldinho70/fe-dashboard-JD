import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

function CardOperation({ nameOperation, length, gradientClass = "" }) {
  return (
    <Card
      className={`w-full cursor-pointer overflow-hidden rounded-xl border border-[var(--border-subtle)] text-[var(--app-text)] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-amber-950/40 ${gradientClass}`}
    >
      <CardHeader
        className="px-1 py-2"
        avatar={
          <Avatar
            src="http://ws4cjdg.com/JD.INTEGRACIONES.COM/img/logojd.png"
            className="h-9 w-9 border border-[var(--accent)]/30 bg-[var(--app-background)] p-1"
          />
        }
        title={
          <div className="flex items-center justify-between gap-1">
            <span className="flex min-w-0 items-center gap-1.5 truncate text-xl font-bold text-[var(--app-text)]">
              {nameOperation}
            </span>

            <span className="shrink-0 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent-soft)] px-2.5 py-1 text-lg font-bold text-[var(--accent)]">
              {length}
            </span>
          </div>
        }
      />
    </Card>
  );
}

export default CardOperation;