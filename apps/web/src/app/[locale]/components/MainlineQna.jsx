import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@invoice/ui/collapsible';
import { Separator } from '@invoice/ui/separator';

export default function MainlineQna() {
  return (
    <div className="flex flex-col gap-4 text-sm font-medium">
      <div className="flex flex-col gap-4">
        <div className="text-md text-muted-foreground">Support</div>
        <Separator />
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            How can I update my account without breaking my laptop?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Is support free, or do I need to google everything?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Are you going to be subsumed by AI?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
        <Separator />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-md text-muted-foreground">Your account</div>
        <Separator />
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Is support free, or do I need to google everything?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Are you going to be subsumed by AI?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-md text-muted-foreground">Other questions</div>
        <Separator />
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Is support free, or do I need to google everything?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="flex flex-col gap-4 items-start">
          <CollapsibleTrigger className="text-left underline">
            Are you going to be subsumed by AI?
          </CollapsibleTrigger>
          <CollapsibleContent>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.{' '}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
