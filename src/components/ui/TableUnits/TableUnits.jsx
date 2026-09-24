const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function TableUnits({
  columns = [],
  rows = [],
  caption = "Tabla de unidades",
  renderCell,
  getRowKey = (row, rowIndex) => row.id ?? row.unit ?? rowIndex,
  className = "",
  containerClassName = "max-h-80",
  rowClassName = "h-12",
}) {

  return (
    <div className={`w-full  overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-table)] ${className}`}>
      <div className={`overflow-x-auto overflow-y-auto scrollbar-thin ${containerClassName}`}>
        <table className="w-full min-w-screem border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="sticky top-0 z-10 bg-[var(--surface-table-header)]">
            <tr className="h-10">
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={`border-b border-[var(--border-muted)] px-4 py-0 text-xs font-bold uppercase tracking-wider text-[var(--accent)] ${alignmentClasses[column.align] ?? "text-left"} ${column.headerClassName ?? ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--muted-text)]">
                  No hay registros para mostrar.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={getRowKey(row, rowIndex)}
                  className={`${rowClassName} border-b border-[var(--border-muted)] transition-colors hover:bg-[var(--accent-soft)]`}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    const content = renderCell
                      ? renderCell(value, row, column, rowIndex)
                      : column.format && typeof value === "number"
                        ? column.format(value)
                        : value;

                    return (
                      <td
                        key={column.id}
                        className={`px-4 py-0 text-[var(--muted-text)] ${alignmentClasses[column.align] ?? "text-left"} ${column.cellClassName ?? ""}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
