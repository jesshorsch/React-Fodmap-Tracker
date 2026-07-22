import {useState} from "react"
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"


type SearchBarProps = {
    onSearch: (query: string) => void
}

function SearchBar ({onSearch}: SearchBarProps) {
    const [query, setQuery] = useState("")



    return (
    <div className = "search-bar-container flex items-center gap-2 p-4 border border-gray-300 rounded-md">
        <Input
        type = "text"
        value = {query}
        onChange = {(e) => setQuery(e.target.value)}
        onKeyDown = {(e) => {
          if (e.key === "Enter") {
            onSearch(query);
          }

        }
      }
        placeholder = "Suchen..."
        />

        <Button
        onClick = {() => onSearch(query)}
        className = "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >Suchen</Button>
        </div>


    )
}







    export default SearchBar;

