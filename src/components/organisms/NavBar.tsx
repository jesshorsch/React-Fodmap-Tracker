import {Link} from "react-router-dom";

import {
    NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavBar() {
  return (
    <div className = "m-4 rounded-full px-2 py-1 bg-gray-400 inline-flex ">
    <NavigationMenu>
    <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link to="/hinzufuegen" />}
        className={navigationMenuTriggerStyle()}
      >
        Hinzufügen
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link to="/" />}
        className={navigationMenuTriggerStyle()}
      >
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link to="/woche" />}
        className={navigationMenuTriggerStyle()}
      >
        Woche
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link to="/einstellungen" />}
        className={navigationMenuTriggerStyle()}
      >
        Einstellungen
      </NavigationMenuLink>
    </NavigationMenuItem>
    </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

