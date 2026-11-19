import { useState } from 'react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import StatusBadge from './StatusBadge'

const columns = [
  { accessorKey: 'id', header: 'ID' },
  {
    id: 'route',
    header: "Yo'nalish",
    accessorFn: (row) => `${row.origin} → ${row.destination}`,
  },
  { accessorKey: 'driver', header: 'Haydovchi' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  },
  { accessorKey: 'eta', header: 'ETA' },
]

export default function ShipmentsDataTable({ shipments }) {
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: shipments,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  })

  if (shipments.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Yuk topilmadi</p>
    )
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}
                    scope="col"
                    aria-sort={{ asc: 'ascending', desc: 'descending' }[header.column.getIsSorted()] ?? 'none'}
                    className="px-4 py-3">
                    <button type="button" onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-1 font-semibold hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span aria-hidden="true">{{ asc: '↑', desc: '↓' }[header.column.getIsSorted()] ?? ''}</span>
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2-TOPSHIRIQ: pagination boshqaruvi */}
    </div>
  )
}