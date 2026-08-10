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

    return (
        <div className = "flex flex-row gap-5">
    

        <Item className = "border bg-red-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Fruktane</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

<Item className = "border bg-blue-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Fruktose</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

<Item className = "border bg-green-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Laktose</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

<Item className = "border bg-yellow-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>GOS</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

<Item className = "border bg-violet-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Mannit</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

<Item className = "border bg-orange-500 px-2 w-fit">
  <ItemMedia variant="icon">
    <Icon iconNode={[]} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Sorbit</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  
</Item>

</div>

)}

export default FodmapOverview;