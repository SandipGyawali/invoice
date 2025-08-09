import { Avatar, AvatarFallback, AvatarImage } from '@invoice/ui/avatar';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import { Calendar } from '@invoice/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import { Input } from '@invoice/ui/input';
import { Label } from '@invoice/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
import { CalendarIcon, Plus, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations();

  return (
    <div className="mx-auto space-y-5 w-full max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="space-y-2">
            <Label className="text-white">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Avatar
                </Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  disabled
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
                <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary">
                  Primary
                </Badge>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Enter phone number" />
          </div>

          {/* Gender and DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select defaultValue="Male">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {/* {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'} */}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    // selected={selectedDate}
                    // onSelect={setSelectedDate}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-primary">Update Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Danger Zone</CardTitle>
          <CardDescription className="text-muted-foreground">
            Delete your account permanently. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          Be careful. Account deletion cannot be undone.
        </CardContent>

        <CardFooter className="border-t p-4 flex items-center justify-end">
          <Button type="submit" variant="destructive" size="sm">
            {t('submit')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
