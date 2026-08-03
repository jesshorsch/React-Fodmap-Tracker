import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ItemGroup } from "@/components/ui/item";
import {supabase} from "@/lib/supabase"
import { useState, useEffect } from "react";
import { Progress,
    ProgressLabel,
  ProgressValue,
 } from "@/components/ui/progress"

type LogEntry = {
    kalorien: number
    protein: number
    eisen: number
    name: string
    menge: number
    mahlzeit: string
    datum: string
}



function Home() {
    const [log, setLog] = useState<LogEntry[]>([])

    useEffect(() => {
        const fetchLog = async () => {
            const { data, error } = await supabase 
            .from("daily_log")
            .select("*")
            .eq("datum", new Date().toISOString().split("T")[0])

            if (!error) setLog(data ?? [])

        }
        fetchLog()

    }, [])

    const gesamtKalorien = log.reduce((sum, item) => sum + item.kalorien, 0)
    const gesamtProtein = log.reduce((sum, item) => sum + item.protein, 0)
    const gesamtEisen = log.reduce((sum, item) => sum + item.eisen, 0)

    

    return ( 
        <div className = "flex flex-col gap-10">
        <ItemGroup className = "flex-row gap-20 border">
            <Item>

            <ItemContent>
            <ItemTitle>Kalorien</ItemTitle>
            <ItemDescription>{gesamtKalorien.toFixed(0)} kcal</ItemDescription>
            </ItemContent>
            
            
            </Item>
            <Item>

            <ItemContent>
            <ItemTitle>Protein</ItemTitle>
            <ItemDescription>{gesamtProtein.toFixed(0)} g</ItemDescription>
            </ItemContent>
            
            
            </Item>
            <Item>

            <ItemContent>
            <ItemTitle>Eisen</ItemTitle>
            <ItemDescription>{gesamtEisen.toFixed(0)} mg</ItemDescription>
            </ItemContent>
            
            
            </Item>
          
        </ItemGroup>

        <div className = "flex flex-col gap-10 ">

        <Progress value={33} className = "w-full max-w-sm gap-1">
        <ProgressLabel>Kalorien</ProgressLabel>
        <ProgressValue/>
        </Progress>

        <Progress value={50} className = "w-full max-w-sm gap-1">
        <ProgressLabel>Protein</ProgressLabel>
        <ProgressValue/>
        </Progress>

        <Progress value={50} className = "w-full max-w-sm gap-1">
        <ProgressLabel>Protein</ProgressLabel>
        <ProgressValue/>
        </Progress>

        </div>

        </div>
    )
}

export default Home;