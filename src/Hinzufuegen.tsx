"use client"
import { supabase } from "@/lib/supabase"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import type {ColumnDef} from "@tanstack/react-table"
import SearchBar from "@/components/molecules/SearchBar"
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




import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



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







function Hinzufuegen() {

    
    const [data, setData] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [position, setPosition] = useState("")
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState <SearchResult | null> (null)
    const [menge, setMenge] = useState<number>(100)
    
    

    const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})






const handleSearch = async (query: string) => {
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

const handleAdd = async () => {
  console.log("aufgerufen")
  if (!selected ) return

  const kalorien = (selected.Kalorien / 100 ) * menge
  const protein = (selected.Protein / 100) * menge
  const eisen = (selected.Eisen / 100) * menge

  const {error} = await supabase
.from("daily_log")
.insert({
  name: selected.name,
  menge,
  kalorien,
  protein,
  eisen,
  mahlzeit: position, 
  datum: new Date().toISOString().split("T")[0],

})

if (error) {
  console.log("Error") 
  return 
}
console.log("Erfolgreich hinzugefügt")
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

      <DropdownMenu open = {open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button variant="outline">Mahlzeit auswählen</Button>} />
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Mahlzeit</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
            setPosition(value)
            setOpen(false)
          }}>
            <DropdownMenuRadioItem value="fruehstueck">Frühstück</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mittagessen">Mittagessen</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="abendessen">Abendessen</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="snack">Snack</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

      

      <div className = "flex flex-col gap-2" >

          <SearchBar onSearch={handleSearch} />
      
        
        
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
          <TableRow 
          key={row.id}
          className = "cursor-pointer hover:bg-white/10"
          onClick = {() => setSelected(row.original)}  >
           
          
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

  {selected ? (<div><span>{selected.name} </span>
  <input
  type = "number"
  value = {menge}
  onChange = {(e) => setMenge(Number(e.target.value))}
  ></input>
  <span>g</span>
  <Button onClick={handleAdd}>Hinzufügen</Button></div>) : null}
  
  
  
  </div>



      </div>

      

</>
    )

  }




  

export default Hinzufuegen

