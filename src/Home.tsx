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
 import Einstellungen from "./Einstellungen";

 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FodmapOverview from "./components/organisms/FodmapOverview";
 

type LogEntry = {
    kalorien: number
    protein: number
    eisen: number
    name: string
    menge: number
    mahlzeit: string
    datum: string
    fodmap_types: string[]
}



function Home() {
    const [log, setLog] = useState<LogEntry[]>([])
    const [ziele, setZiele] = useState({kalorien: 0, protein: 0, eisen: 0})
    const [profile,setProfile] = useState({name: "", surname: ""})

    useEffect(() => {

        const fetchLog = async () => {
            const { data, error } = await supabase 
            .from("daily_log")
            .select("*")
            .eq("datum", new Date().toISOString().split("T")[0])

            if (!error) setLog(data ?? [])

        }

        const fetchZiele = async () => {
            const {data} = await supabase 
            .from("settings")
            .select("*")
            .single()
            if (data) setZiele({
                kalorien: data.kalorien_ziel,
                protein: data.protein_ziel,
                eisen: data.eisen_ziel
            })
        }

        const fetchProfile = async () => {
            const {data} = await supabase
            .from("settings")
            .select("*")
            .eq("id", 1)
            .single()
            if (data) setProfile({name: data.name, surname: data.surname})
        }
        fetchLog()
        fetchZiele()
        fetchProfile()

    }, [])

    

    const gesamtKalorien = log.reduce((sum, item) => sum + item.kalorien, 0)
    const gesamtProtein = log.reduce((sum, item) => sum + item.protein, 0)
    const gesamtEisen = log.reduce((sum, item) => sum + item.eisen, 0)



    

    return ( 
        <div className = "flex flex-col gap-10 ">

        <div className = "flex items-center  right-10 gap-2 fixed top-5 right-20 border rounded-full px-20 py-1 bg-gray-400">
            <Avatar className = "">
                <AvatarImage src="IMG_0883 2.heic" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className = " font-normal">Hi {profile.name}!</p>

        </div>

            

        <ItemGroup className = "flex-row gap-20 border justify-between">
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

        <Progress value={(gesamtKalorien / ziele.kalorien) * 100} className = "w-full max-w-sm gap-1">
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

        <FodmapOverview entries={log} />

        

        </div>

        


    )
}

export default Home;