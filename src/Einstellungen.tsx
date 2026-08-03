import {supabase}   from  "@/lib/supabase"
import {useState, useEffect } from "react"
import {Button} from "@/components/ui/button"


function Einstellungen () {

    const [kalorienziel, setKalorienziel] = useState(1500)
    const [proteinziel, setProteinziel] = useState(50)
    const [eisenziel, setEisenziel] = useState(12)



    useEffect(() => {
        supabase.from("settings").select("*").single().then(({data}) => {
            setKalorienziel(data.kalorien_ziel)
            setProteinziel(data.protein_ziel)
            setEisenziel(data.eisen_ziel)
        })
    }, [])
    


    return (
        <>
        <p>{kalorienziel} kcal</p>
        <p>{proteinziel} kcal</p>
        <p>{eisenziel} kcal</p>
        </>
    )

}

export default Einstellungen;