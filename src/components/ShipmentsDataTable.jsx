import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import StatusBadge from './StatusBadge'

export default function ShipmentsDataTable({ shipments }) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState([])

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: t('table.id') },
      {
        id: 'route',
        header: t('table.route'),
        accessorFn: (row) =>`${t(`cities.${row.origin}`, { defaultValue: row.origin })} → ${t(`cities.${row.destination}`, { defaultValue: row.destination })}`,
      },
      { accessorKey: 'driver', header: t('table.driver') },
      {
        accessorKey: 'status',
        header: t('table.status'),
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      },
      { accessorKey: 'eta', header: t('table.eta') },
    ],
  [t],
)

  const table = useReactTable({
    data: shipments,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  if (shipments.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">{t('table.empty')}</p>
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
                  <th key={header.id} scope="col" aria-sort={{ asc: 'ascending', desc: 'descending' }[header.column.getIsSorted()] ?? 'none'} className="px-4 py-3">
                    <button type="button" onClick={header.column.getToggleSortingHandler()} className="flex cursor-pointer items-center gap-1 font-semibold hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
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

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">{t('table.prev')}</button>

          <span aria-live="polite" className="text-sm text-slate-600">{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>

          <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">{t('table.next')}</button>
        </div>
      )}
    </div>
  )
}