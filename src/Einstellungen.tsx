import {supabase}   from  "@/lib/supabase"
import {useState, useEffect } from "react"
import {Button} from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup
  } from "@/components/ui/item"


function Einstellungen () {

    const [ziele, setZiele] = useState({
        kalorien: 0,
        protein: 0,
        eisen: 0
    })

    const [input, setInput] = useState({
        kalorien: "",
        protein: "",
        eisen: "",
    })
    



    useEffect(() => {
        supabase.from("settings").select("*").single().then(({data, error}) => {
          console.log("geladen:", data, "fehler:", error)
          if (error || !data) return
            setZiele({
                kalorien: data.kalorien_ziel,
                protein: data.protein_ziel,
                eisen: data.eisen_ziel
            })
            setInput({
                kalorien: data.kalorien_ziel,
                protein: data.protein_ziel,
                eisen: data.eisen_ziel
            })
        })
    }, [])
    


    return (
        <div className = "flex flex-col gap-20">
        <ItemGroup className = "flex-row gap-20 border">
            <Item>
                <ItemContent>
                    <ItemTitle>Kalorien</ItemTitle>
                    <ItemDescription>{ziele.kalorien} kcal</ItemDescription>
                </ItemContent>
                
            </Item>

            <Item>
                <ItemContent>
                    <ItemTitle>Protein</ItemTitle>
                    <ItemDescription>{ziele.protein} g</ItemDescription>
                </ItemContent>
                
            </Item>

            <Item>
                <ItemContent>
                    <ItemTitle>Eisen</ItemTitle>
                    <ItemDescription>{ziele.eisen} mg</ItemDescription>
                </ItemContent>
                
            </Item>
            
        </ItemGroup>  

        


        <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>K</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="2000" 
        value = {input.kalorien} 
        onChange = {(e) => setInput({...input, kalorien: e.target.value})} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>kcal Kalorienziel</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>P</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="80"
        value = {input.protein} 
        onChange = {(e) => setInput({...input, protein: e.target.value})} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>g Proteinziel</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>E</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="10"
        value = {input.eisen} 
        onChange = {(e) => setInput({...input, eisen: e.target.value})} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>mg Eisenziel</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      
    </div>
        <Button onClick = {async () => {
          const neueZiele = {
            kalorien: Number(input.kalorien),
            protein: Number(input.protein),
            eisen: Number(input.eisen),
          }

          const {data, error} = await supabase.from("settings").update({
          kalorien_ziel: neueZiele.kalorien,
          protein_ziel: neueZiele.protein,
          eisen_ziel: neueZiele.eisen,
        }).eq("id", 1)

        console.log("gespeichert:", data, "fehler:", error)

        setZiele(neueZiele)
            
        }}>

      
            Speichern
    </Button>
        
        </div>

    
    )

}

export default Einstellungen;