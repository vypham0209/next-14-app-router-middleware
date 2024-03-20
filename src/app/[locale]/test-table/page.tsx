'use client'
//THIRD PARTY MODULES
import { useContext, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
  type Row,
} from '@tanstack/react-table'
//LAYOUT, COMPONENTS
import T from '_@shared/components/table/TableBuilder'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'LENSLEY',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'Hieu',
    lastName: 'Nguyen',
    age: 28,
    visits: 80,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'MILLER',
    age: 40,
    visits: 60,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const checkboxCol = columnHelper.display({
  id: 'select',
  header: ({ table }) => (
    <input
      type="checkbox"
      checked={table.getIsAllRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
      name="select-all"
    />
  ),
  cell: ({ row }) => (
    <input
      type="checkbox"
      onChange={() => {
        row.toggleExpanded()
        row.toggleSelected()
      }}
      checked={row.getIsSelected()}
      name="select-all"
    />
  ),
})
const firstNameCol = columnHelper.accessor('firstName', {
  header: () => (
    <div className="space-i-2 flex">
      <span>First Name</span>
      <T.Sorter />
    </div>
  ),
  sortingFn: () => 0, // only sort by APIs
  cell: (info) => <h3>{info.getValue()}</h3>,
})
const lastNameCol = columnHelper.accessor('lastName', {
  header: () => (
    <div className="space-i-2 flex">
      <span>Last Name</span>
      <T.Sorter />
    </div>
  ),
  sortingFn: (a, b) => a.original.lastName.length - b.original.lastName.length,
})
const ageCol = columnHelper.accessor('age', {
  header: () => <span>Age</span>,
})
const visitCol = columnHelper.accessor('visits', {
  header: () => <span>Visits</span>,
  cell: (info) => {
    return (
      <h3
        style={{
          color: info.getValue() > 70 ? 'red' : info.getValue() > 50 ? 'blue' : 'orange',
        }}
      >
        {info.getValue()}
      </h3>
    )
  },
})
const statusCol = columnHelper.accessor('status', {
  header: () => <span>Status</span>,
  //props is dynamic props pass from TDCellSlot, how to make it type-safe ????
  cell: (info) => <p>{info.getValue()}</p>,
})
const profileProgressCol = columnHelper.accessor('progress', {
  header: () => <span>Profile Progress</span>,
})

const typeStrictColumns = [
  checkboxCol,
  columnHelper.group({
    header: 'Name',
    columns: [firstNameCol, lastNameCol],
  }),
  columnHelper.group({
    header: 'Info',
    columns: [
      ageCol,
      columnHelper.group({
        header: 'More Info',
        columns: [visitCol, statusCol, profileProgressCol],
      }),
    ],
  }),
]

// const SortHeader = ({ column }) => {
//   const [sort, setSort] = useState<'asc' | 'desc' | undefined>(undefined)

//   return (
//     <div className="space-i-2 flex">
//       <span>{column.header}</span>
//       <ChevronDownIcon/>
//     </div>
//   )
// }

const defaultColumns: ColumnDef<Person, Person>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        name="select-all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        onChange={() => {
          row.toggleExpanded()
          row.toggleSelected()
        }}
        checked={row.getIsSelected()}
        name="select-all"
      />
    ),
  },
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => {
              // const [sort, setSort] = useState<'asc' | 'desc' | undefined>('asc')
              return <span>Visits</span>
            },
            cell: (info) => {
              return (
                <h3
                  style={{
                    color: info.getValue() > 70 ? 'red' : info.getValue() > 50 ? 'blue' : 'orange',
                  }}
                >
                  {info.getValue()}
                </h3>
              )
            },
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => <p>{info.getValue()}</p>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
]

export default function TestTable() {
  const [data] = useState(() => [...defaultData])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [sorting, setSorting] = useState<SortingState>([])
  console.log({ sorting })
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  })
  const typeTable = useReactTable({
    data,
    state: { sorting },
    onSortingChange: setSorting,
    columns: typeStrictColumns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  })

  return (
    <div className="h-full bg-white full-fledge">
      <h1>Hello to table test</h1>
      <T.Root tableInstance={table}>
        <T.Table style={{ width: table.getCenterTotalSize() }}>
          <T.Head>
            <T.RowHead>
              <T.TH>
                <T.Resizer />
                <T.THCellSlot />
              </T.TH>
            </T.RowHead>
          </T.Head>
          <T.TBody />
        </T.Table>
      </T.Root>

      <h1>This is a typestrict one</h1>
      <T.Root tableInstance={typeTable}>
        <T.Table style={{ width: typeTable.getCenterTotalSize() }}>
          <T.Head />
          <T.TBody>
            <T.RowBody>
              <T.TD data-column-id="lastName">
                <h4 style={{ color: 'green' }}>
                  +++
                  <T.TDCellSlot />
                  ----
                </h4>
              </T.TD>
              <T.TD data-column-id="status">
                <h4 style={{ color: 'purple' }}>
                  <T.TDCellSlot />
                </h4>
              </T.TD>
            </T.RowBody>
            <ExpandRow />
          </T.TBody>
        </T.Table>
      </T.Root>
    </div>
  )
}

function ExpandRow() {
  const row = useContext<Row<Person>>(T.rowContext)
  return row.getIsExpanded() ? (
    <tr>
      <td colSpan={row.getVisibleCells().length}>
        <code style={{ whiteSpace: 'pre-wrap', color: 'magenta' }}>
          {JSON.stringify(row.original, null, 2)}
        </code>
        <div
          style={{
            height: '100px',
            width: '100%',
            background: 'linear-gradient(to top right, plum, #76c5cc, peachpuff)',
          }}
        />
      </td>
    </tr>
  ) : null
}
