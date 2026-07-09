
import { supabase } from "@/lib/supabase"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
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

import { SearchIcon } from "lucide-react"


import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

type SearchResult = {
  name: string
  Kalorien: number
  Protein: number
  Eisen: number
  fodmap_types: string[]
  Einheit: string
  GewichtProStueck: number | null
}

const columns: ColumnDef<SearchResult>[] = [
  { accessorKey: "name", header: "Produktname" },
  { accessorKey: "Kalorien", header: "Kalorien (pro 100g)" },
  { accessorKey: "Protein", header: "Protein (pro 100g)" },
  { accessorKey: "Eisen", header: "Eisen (pro 100g)" },
  { accessorKey: "fodmap_types", header: "FODMAPs" },
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
    const { data: result, error } = await supabase
      .from("Food Database")
      .select("*")
      .ilike("name", `%${query}%`)

    if (error) {
      console.error(error)
      setData([])
    } else {
      setData(result ?? [])
    }
  } catch (err) {
    console.error(err)
  } finally {
    setIsLoading(false)
  }
}
    


    return (

      <>

      <div className = "flex items-center gap-2">
        <Item>
  <ItemMedia variant="icon">
    <SearchIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Mahlzeiten Hinzufügen</ItemTitle>
    <ItemDescription>Wähle Lebensmittel aus...</ItemDescription>
  </ItemContent>
  
</Item>

<ModeToggle />
      </div>

      

      <div className = "flex flex-col gap-2" >

      <div className = "search-bar-container flex items-center gap-2 p-4 border border-gray-300 rounded-md">
        <Input
        type = "text"
        value = {query}
        onChange = {(e) => setQuery(e.target.value)}
        placeholder = "Suchen..."
        />

        <Button
        onClick = {handleSearch}
        className = "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >Suchen</Button>
        </div>
        
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

      

</>
    )

  }




  

export default Navbar

