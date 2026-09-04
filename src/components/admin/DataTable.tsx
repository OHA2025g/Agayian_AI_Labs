import type { ReactNode } from "react";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

type Row = Record<string, string | number | boolean | null | undefined | ReactNode> & {
  href?: string;
  id?: string;
};

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: { key: string; label: string }[];
  rows: Row[];
  empty: string;
}) {
  if (!rows.length) {
    return <p className="admin-empty">{empty}</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? row.href ?? index)}>
              {columns.map((column, columnIndex) => {
                const raw = row[column.key];
                return (
                  <td key={column.key}>
                    {typeof raw !== "string" &&
                    typeof raw !== "number" &&
                    typeof raw !== "boolean" &&
                    raw != null ? (
                      raw
                    ) : column.key === "status" ? (
                      <StatusBadge value={String(raw ?? "")} />
                    ) : columnIndex === 0 && row.href ? (
                      <Link href={row.href} className="admin-table-link">
                        {String(raw ?? "—")}
                      </Link>
                    ) : (
                      String(raw ?? "—")
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
