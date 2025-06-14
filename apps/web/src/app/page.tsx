'use client';
import { Button } from '@invoice/ui/button';
import { Input } from '@invoice/ui/input';
import { Separator } from '@invoice/ui/separator';
import { useTRPC } from '@/utils/trpc';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

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
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const trpc = useTRPC();

  const {
    data: loginData,
    mutate,
    isPending,
  } = useMutation(trpc.auth.login.mutationOptions());

  console.log(loginData);
  console.log(isPending);

  return (
    <div className="py-[50px] flex flex-col items-center gap-14">
      <div className="flex items-center gap-10">
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
                    <NavigationMenuLink asChild>
                      <Link href="/docs">
                        <div className="font-medium">Modern Product Teams</div>
                        <div className="text-muted-foreground">
                          Mainline is built on the habits that make the best
                          product teams successful.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/docs">
                        <div className="font-medium">Resource Allocation</div>
                        <div className="font-medium text-muted-foreground">
                          Mainline resource allocation and execution
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="font-medium">
              <NavigationMenuLink>
                <Link href="/about-us">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="font-medium">
              <NavigationMenuLink>
                <Link href="/pricing">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="font-medium">
              <NavigationMenuLink>
                <Link href="/faq">FAQ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="font-medium">
              <NavigationMenuLink>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
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
      <div className="flex text-sm gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[2.25rem]">
              Mainline your product.
            </div>
            <div className="font-medium text-2xl text-muted-foreground">
              Mainline is the fit-for-purpose tool for <br /> planning and
              building modern <br />
              software products.
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="default">Get Started</Button>
            <Button className="flex items-center" variant="outline">
              Mainline Raises $12 from Roba Ventures{' '}
              <svg
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="font-medium flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="icon">
              <svg
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 280q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>Tailored workflows</div>
              <div className="text-muted-foreground">
                Track progress across custom issue flows <br /> for your team.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="icon">
              <svg
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M360-80q-116 0-198-82T80-360q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198T360-80Zm0-80q83 0 141.5-58.5T560-360q0-83-58.5-141.5T360-560q-83 0-141.5 58.5T160-360q0 83 58.5 141.5T360-160Zm318-172q2-6 2-13v-15q0-133-93.5-226.5T360-680h-15q-7 0-13 2 26-88 98.5-145T600-880q116 0 198 82t82 198q0 97-57 169.5T678-332Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>Cross-team projects</div>
              <div className="text-muted-foreground">
                Track progress across custom issue flows <br /> for your team.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="icon">
              <svg
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm0-321Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>Milestones</div>
              <div className="text-muted-foreground">
                Track progress across custom issue flows <br /> for your team.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="icon">
              <svg
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>Progress insights</div>
              <div className="text-muted-foreground">
                Track progress across custom issue flows <br /> for your team.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
