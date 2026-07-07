"use client"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type {ColumnDef} from "@tanstack/react-table"
import {
  
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SearchResult = {
  code: string
  product_name: string
  brands: string
  nutrition_grades: string
  
}

const columns: ColumnDef<SearchResult>[] = [
  { accessorKey: "product_name", header: "Produktname" },
  { accessorKey: "brands", header: "Marke" },
  { accessorKey: "nutrition_grades", header: "Nutri-Score" },
]





function Navbar() {

    const [query, setQuery] = useState("")
    const [data, setData] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    
    

    const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

const handleSearch = async () => {
    if (query.trim() === "") {
        setData([])
        return
    }

    setIsLoading(true)
    try {
        const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=20&fields=code,product_name,brands,nutrition_grades`
        )
        const result = await response.json()   // ← Antwort in JSON umwandeln
        setData(result.products ?? [])          // ← Ergebnis speichern
    } catch (err) {
        console.error(err)
    } finally {
        setIsLoading(false)                     // ← Ladezustand zurücksetzen
    }
}

    


    return (
    <div className = "search-bar-container flex items-center gap-2 p-4 border border-gray-300 rounded-md">
        <Input
        type = "text"
        value = {query}
        onChange = {(e) => setQuery(e.target.value)}
        placeholder = "Suchen..."
        />

        <Button
        onClick = {handleSearch}
        className = "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >Suchen</Button>
        
        <div className="overflow-hidden rounded-md border">
  <Table>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Lädt...
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Keine Ergebnisse gefunden.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>


      </div>
    )


}

export default Navbar

