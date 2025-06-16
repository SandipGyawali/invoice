import Link from 'next/link';
import { Button } from '@invoice/ui/button';
import { Sun, Moon } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@invoice/ui/navigation-menu';

export default function MainlineNavigation() {
  return (
    <div className="nav-menu flex items-center gap-10 bg-primary-foreground py-2 px-8 rounded-4xl">
      <div className="brand-name">
        <Link href="/">Mainline</Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="font-medium">
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink href="/docs" asChild>
                    <div>
                      <div className="font-medium">Modern Product Teams</div>
                      <div className="font-medium text-muted-foreground">
                        Mainline is built on the habits that make the best
                        product teams successful.
                      </div>
                    </div>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/docs">
                      <div>
                        <div className="font-medium">Resource Allocation</div>
                        <div className="font-medium text-muted-foreground">
                          Mainline resource allocation and execution
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="font-medium">
            <NavigationMenuLink href="/about-us">About Us</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="font-medium">
            <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="font-medium">
            <NavigationMenuLink href="/faq">FAQ</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="font-medium">
            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="buttons-container flex gap-1">
        <Button variant="outline" size="sm">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          // className="bg-red-500"
          // disabled={isPending}
          // onClick={() => mutate()}
          // className="border rounded-lg"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
