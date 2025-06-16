import Link from 'next/link';
import { Switch } from '@invoice/ui/switch';
import { Button } from '@invoice/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import MainlineQna from './MainlineQna';

export default function MainlinePricing() {
  return (
    <div className="pricing flex flex-col gap-16 items-center py-20">
      <div className="flex flex-col items-center gap-2">
        <div className="text-light text-[2.5rem]">Pricing</div>
        <div className="font-light text-center">
          Use Mainline for free with your whole team. Upgrade to enable
          <br /> unlimited issues, enhanced security controls, and additional
          features.
        </div>
      </div>
      <div className="cards flex flex-col md:grid md:grid-cols-3 gap-4 md:w-3/4">
        <Card className="border-0 bg-transparent">
          <div className="border-1 rounded-xl border-muted-foreground">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription className="text-muted-foreground">
                $0
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 font-light text-muted-foreground">
              Free for everyone
              <ul>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Unlimited</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">2 teams</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">500 issues</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Slack and Github integrations</div>
                </li>
              </ul>
              <div className="flex text-foreground">
                <Button variant="outline">Get Started</Button>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="border-0 bg-transparent">
          <div className="border-2 rounded-xl border-foreground">
            <CardHeader>
              <CardTitle>Startup</CardTitle>
              <CardDescription className="text-muted-foreground">
                $6 per user/year
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 font-light text-muted-foreground">
              <div className="flex gap-2 items-center">
                <Switch />
                <div className="text-foreground">Billed anually</div>
              </div>
              <ul>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">All free plan features and...</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Mainline AI</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Unlimited teams</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">
                    Unlimited issues and file uploads
                  </div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Mainline insights</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Admin roles</div>
                </li>
              </ul>
              <div className="flex text-foreground">
                <Button variant="default">Get Started</Button>
              </div>
            </CardContent>
          </div>
        </Card>
        <Card className="border-0 bg-transparent">
          <div className="border-1 rounded-xl border-muted-foreground">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription className="text-muted-foreground">
                $6 per user/year
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 font-light text-muted-foreground">
              <div className="flex gap-2 items-center">
                <Switch />
                <div className="text-foreground">Billed anually</div>
              </div>
              <ul>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">All free plan features and...</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Mainline AI</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Supermainline AGI</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">Free daily catered lunch</div>
                </li>
                <li className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className="fill-muted-foreground"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <div className="flex-1">random HIPPA audits</div>
                </li>
              </ul>

              <div className="flex text-foreground">
                <Button variant="outline">Get Started</Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="questions w-3/4 flex flex-col lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="text-[2.5rem]">Got questions</div>
          <div className="font-medium text-sm text-muted-foreground">
            If you can't find what you're looking for,{' '}
            <Link className="underline" href="/contact">
              get in touch.
            </Link>
          </div>
        </div>

        <MainlineQna />
      </div>
    </div>
  );
}
