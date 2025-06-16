'use client';
import { Button } from '@invoice/ui/button';
import { Separator } from '@invoice/ui/separator';
import { useTRPC } from '@/utils/trpc';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import MainlineNavigation from './components/MainlineNavigation';
import MainlineCarousel from './components/MainlineCarousel';
import MainlinePricing from './components/MainlinePricing';

import { Sun, Moon } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    <div className="bg-primary-foreground flex flex-col gap-20 py-2 px-4">
      <div className="py-[50px] flex flex-col items-center gap-14 bg-linear-to-b from-card to-base-900 rounded-2xl">
        <MainlineNavigation />

        <div className="flex-col lg:flex-row flex text-sm gap-4">
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

        <div className="w-3/4">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <Image
              src="/placeholder-img.jpg"
              alt="demo"
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-4 w-3/4">
          <div className="flex flex-col items-center">
            <div className="font-display text-2xl">
              Powering the world's best product teams.
            </div>

            <div className="font-display text-2xl text-muted-foreground">
              From next-gen startups to established enterprises.
            </div>
          </div>
          <div className="text-2xl flex flex-col gap-2 text-muted-foreground">
            <div className="flex justify-around py-[10px]">
              <Link href="#">Mercuy</Link>
              <Link href="#">Watershed</Link>
              <Link href="#">Retool</Link>
              <Link href="#">descript</Link>
            </div>
            <div className="flex justify-between py-[10px]">
              <Link href="#">Perplexity</Link>
              <Link href="#">monzo</Link>
              <Link href="#">ramp</Link>
              <Link href="#">Raycast</Link>
              <Link href="#">Arc</Link>
            </div>
          </div>
        </div>

        <div className="flex-1 text-sm font-light">
          Measure twice. Cut once.
        </div>

        <div className="flex flex-col gap-2 lg:flex lg:justify-between lg:items-center lg:gap-10">
          <div className="font-display text-[2.25rem]">
            Made for modern <br /> product teams.
          </div>
          <div className="font-medium text-sm text-muted-foreground">
            Mainline is built on the habits that make the best product teams{' '}
            <br />
            successful: staying focused, moving quickly, and always aiming for{' '}
            <br />
            high-quality work.
          </div>
        </div>

        <div className="grid grid-cols-3 bg-card w-3/4">
          <div className="card flex flex-col flex-1">
            <Image
              className="rounded-lg flex-1 pt-4 pl-4 object-cover"
              width={500}
              height={500}
              src="/placeholder-img.jpg"
              alt="placeholder"
            />
            <div className="flex p-4 gap-2">
              <div className="flex-1">
                Purpose-built for product development
              </div>
              <div className="rounded-full border-1 border-foreground w-12 h-12 relative">
                <svg
                  className="fill-foreground absolute translate-1/2 hover:translate-x-3/4 transition duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="card flex flex-col flex-1">
            <Image
              className="rounded-lg flex-1 pt-4 pl-4 object-cover"
              width={500}
              height={500}
              src="/placeholder-img.jpg"
              alt="placeholder"
            />
            <div className="flex p-4 gap-2">
              <div className="flex-1">Manage projects end-to-end</div>
              <div className="rounded-full border-1 border-foreground w-12 h-12 relative">
                <svg
                  className="fill-foreground absolute translate-1/2 hover:translate-x-3/4 transition duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="card flex flex-col flex-1">
            <Image
              className="rounded-lg flex-1 pt-4 pl-4 object-cover"
              width={500}
              height={500}
              src="/placeholder-img.jpg"
              alt="placeholder"
            />
            <div className="flex p-4 gap-2">
              <div className="flex-1">Build momentum and healthy habits</div>
              <div className="rounded-full border-1 border-foreground w-12 h-12 relative">
                <svg
                  className="fill-foreground absolute translate-1/2 hover:translate-x-3/4 transition duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center w-3/4">
          <div className="font-display text-[2.5rem] text-center">
            Mainline your resource <br /> allocation and execution
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 justify-center">
              <div className="grid grid-rows-[80px_1fr] gap-6 p-4">
                <div className="font-light text-sm">
                  <span className="font-medium">Reusable issue templates.</span>
                  Draft lightning-fast <br /> documents with our Smart
                  Instructions and Templates.
                </div>
                <Image
                  className="place-self-start"
                  src="/placeholder-img.jpg"
                  width={400}
                  height={100}
                  alt="Placeholder image"
                />
              </div>
              <div className="grid grid-rows-[80px_1fr] gap-6 p-4">
                <div className="font-light text-sm">
                  <span className="font-medium">Simplify your stack. </span>No
                  more Confluence, SharePoint, or Microsoft Word.
                </div>
                <Image
                  className="place-self-start"
                  src="/placeholder-img.jpg"
                  width={400}
                  height={100}
                  alt="Placeholder image"
                />
              </div>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3">
              <div className="grid grid-rows-[80px_1fr] p-4">
                <div className="font-light text-sm">
                  <span className="font-medium">Graveyard it.</span>
                  Lorem ipsum dolor sit amet.
                </div>
                <Image
                  className="place-self-start"
                  src="/placeholder-img.jpg"
                  width={450}
                  height={100}
                  alt="Placeholder image"
                />
              </div>
              <div className="grid grid-rows-[80px_1fr] p-4">
                <div className="font-light text-sm">
                  <span className="font-medium">Task discussions.</span>
                  Lorem ipsum dolor sit amet.
                </div>
                <Image
                  className="place-self-center"
                  src="/placeholder-img.jpg"
                  width={450}
                  height={100}
                  alt="Placeholder image"
                />
              </div>
              <div className="grid grid-rows-[80px_1fr] p-4">
                <div className="font-light text-sm">
                  <span className="font-medium">Notifications.</span>
                  Lorem ipsum dolor sit amet.
                </div>
                <Image
                  className="place-self-center"
                  src="/placeholder-img.jpg"
                  width={450}
                  height={100}
                  alt="Placeholder image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-20 rounded-b-2xl bg-linear-to-b from-primary-foreground to-base-100">
        <div className="flex flex-col gap-2 items-start w-3/4">
          <div className="text-[2.5rem] font-display">
            Trusted by product builders
          </div>
          <div className="font-light text-sm">
            Mainline is built on the habits that make the best product <br />{' '}
            teams successful: staying focused, moving quickly, and <br /> always
            aiming for high-quality work.
          </div>
          <Button className="flex items-center" variant="outline">
            Read our customer stories.
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

        <MainlineCarousel />

        <MainlinePricing />
      </div>

      <div className="social-links flex flex-col items-center gap-8">
        <div className="flex flex-col">
          <div className="text-[2.5rem]">Start your free trial today</div>
          <div className="text-muted-foreground font-medium text-center">
            Mainline is the fit-for-purpose tool for <br />
            planning and building modern software products.
          </div>
        </div>
        <Button variant="default">Get Started </Button>
        <nav className="flex gap-2 flex-col items-center">
          <ol className="flex gap-4 font-medium">
            <li>
              <Link className="hover:opacity-75" href="/product">
                Product
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/about-us">
                About us
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/x.com/invoice">
                <div className="flex gap-1 flex items-center">
                  Xwitter
                  <svg
                    className="fill-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                  </svg>
                </div>
              </Link>
            </li>
          </ol>
          <Link
            className="font-light hover:text-muted-foreground flex justify-center"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </div>
  );
}
