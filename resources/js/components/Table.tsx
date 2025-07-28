import { Link } from '@inertiajs/react';
import get from 'lodash/get';
import { ChevronRight } from 'lucide-react';

interface TableProps<T> {
  columns: {
    name: string;
    label: string;
    colSpan?: number;
    renderCell?: (row: T) => React.ReactNode;
  }[];
  rows: T[];
  getRowDetailsUrl?: (row: T) => string;
}

export default function Table<T>({
  columns = [],
  rows = [],
  getRowDetailsUrl
}: TableProps<T>) {
  return (
    <div className="h-[550px] overflow-auto bg-white rounded shadow border">
      <table className="w-full table-auto text-sm text-left">
        <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
          <tr className="font-bold text-gray-700 uppercase">
            {columns.map(column => (
              <th
                key={column.label}
                colSpan={column.colSpan ?? 1}
                className="px-6 py-4"
              >
                {column.label}
              </th>
            ))}
            <th className="w-px px-6 py-4" /> {/* Chevron column */}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                className="px-6 py-24 text-center text-gray-500 border-t"
                colSpan={columns.length + 1}
              >
                No data found.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 focus-within:bg-gray-100 transition"
              >
                {columns.map(column => (
                  <td key={column.name} className="px-6 py-4 border-t">
                    <Link
                      tabIndex={-1}
                      href={getRowDetailsUrl?.(row) as string}
                      className="block focus:text-indigo-600 focus:outline-none"
                    >
                      {column.renderCell?.(row) ?? get(row, column.name) ?? 'N/A'}
                    </Link>
                  </td>
                ))}
                <td className="w-px border-t">
                  <Link
                    href={getRowDetailsUrl?.(row)!}
                    className="flex items-center px-4 py-4 focus:outline-none"
                  >
                    <ChevronRight size={20} className="text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
