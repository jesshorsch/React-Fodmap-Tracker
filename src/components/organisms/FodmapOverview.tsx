import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@base-ui/react";
import { Icon } from "lucide-react";



function FodmapOverview() {

  const categories = [
  {name: "Fruktane", color: "bg-red-500"},
  {name: "Fruktose", color: "bg-blue-500"},
  {name: "Laktose", color: "bg-green-500"},
  {name: "GOS", color: "bg-yellow-500"},
  {name: "Mannit", color: "bg-violet-500"},
  {name: "Sorbit", color: "bg-orange-500"},

]

    return (
        <div className = "flex flex-row gap-5">
    {categories.map((cat) => {
      return <Item className = {`border ${cat.color} px-2 w-fit`}>{cat.name}</Item>
    })}

</div>

)}

export default FodmapOverview;