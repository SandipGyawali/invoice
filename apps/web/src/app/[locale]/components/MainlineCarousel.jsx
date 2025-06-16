import Image from 'next/image';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@invoice/ui/carousel';

export default function MainlineCarousel() {
  return (
    <Carousel className="w-3/4 py-20">
      <CarouselContent>
        <CarouselItem />
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <Card className="h-100">
              <CardContent className="p-0 h-full w-full grid grid-rows-[1fr_160px]">
                <Image
                  className="rounded-t-xl h-full"
                  src="/placeholder-img.jpg"
                  height={400}
                  width={400}
                  alt="Placeholder"
                />
                <div className="flex flex-col justify-between p-4">
                  <div className="text-md font-display">
                    I can use the tool as a substitute from my PM.
                  </div>
                  <div className="text-sm flex flex-col">
                    <div className="font-bold">Kundo Marta, Founder</div>
                    <div className="font-light">Mercury Finance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
