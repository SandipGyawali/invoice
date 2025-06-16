import Link from 'next/link';
import { Button } from '@invoice/ui/button';
import { Sun, Moon } from 'lucide-react';
import { Separator } from '@invoice/ui/separator';
import { useState } from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@invoice/ui/collapsible';

export default function MainlineNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropDownOpen] = useState(false);

  function handleClick(e) {
    setIsMenuOpen(isMenuOpen ? false : true);
  }

  function handleDropdownClick(e) {
    setIsNavDropDownOpen(isNavDropdownOpen ? false : true);
  }

  return (
    <>
      <div className="nav-menu flex items-center gap-10 bg-primary-foreground py-2 px-8 rounded-4xl max-lg:hidden">
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

      <div className="z-1 w-[min(90%,700px)] nav-menu flex items-center justify-between gap-10 bg-primary-foreground py-2 px-8 rounded-4xl lg:hidden">
        <div className="brand-name">
          <Link href="/">Mainline</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="relative" onClick={handleClick} variant="ghost">
            <svg
              className={
                'menu-btn absolute transition-all rotate-0 fill-foreground ' +
                (isMenuOpen ? 'opacity-0 rotate-90' : '')
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            <svg
              className={
                'close absolute transition-all rotate-0 fill-foreground ' +
                (isMenuOpen ? '' : 'rotate-90 opacity-0')
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </Button>
        </div>
      </div>

      <div
        className={
          'w-[min(90%,700px)] nav-menu flex flex-col items-center gap-2 bg-primary-foreground rounded-4xl lg:hidden navigation-menu fixed top-1/4 transition-all left-1/2 -translate-x-1/2 p-5 border-1 ' +
          (isMenuOpen
            ? 'z-10 opacity-100 translate-0'
            : 'z-0 opacity-0 -translate-y-20')
        }
      >
        <div className="w-full flex flex-col gap-4" ratio={16 / 9}>
          <Collapsible>
            <CollapsibleTrigger
              onClick={handleDropdownClick}
              className="w-full flex items-center justify-between"
            >
              Features
              <svg
                className={
                  'fill-foreground transition-all duration-300 ' +
                  (isNavDropdownOpen ? 'rotate-90' : '')
                }
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <NavigationMenu className="cursor-pointer">
                <NavigationMenuList className="grid w-[300px] gap-4 w-full">
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
                </NavigationMenuList>
              </NavigationMenu>
            </CollapsibleContent>
          </Collapsible>
          <div>
            <Separator />
          </div>
          <Link href="/about-us">About Us</Link>
          <Separator />
          <Link href="/pricing">Pricing</Link>
          <Separator />
          <Link href="/faq">FAQ</Link>
          <Separator />
          <Link href="/contact">Contacts</Link>
        </div>
      </div>
    </>
  );
}
