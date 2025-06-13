'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import SearchableDropdown from '@invoice/ui/searchable-dropdown';

function General() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Language</CardTitle>
        <CardDescription>
          Choose your preferred language to your personalize experience
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <SearchableDropdown />
      </CardContent>
    </Card>
  );
}

export default General;
