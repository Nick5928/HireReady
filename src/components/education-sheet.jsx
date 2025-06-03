import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function EducationSheet({ data }) {
    const isAdd = data === "add"
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{!isAdd ? 'Edit' : 'Add'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-xl'>{!isAdd ? `Edit ${data.school}` : "Add education"}</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="school">School</Label>
            <Input id="school" defaultValue={data.school} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" defaultValue={data.degree} />
          </div>
          <div className="grid gap-3">
            <div className="flex gap-3">
              <div>
                <Label htmlFor="start_year">Start Year</Label>
                <Input id="start_year" defaultValue={data.start_year} />
              </div>
              <div>
                <Label htmlFor="end_year">End Year</Label>
                <Input id="end_year" defaultValue={data.end_year} />
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">{!isAdd ? 'Save Changes' : 'Add Education'}</Button>
          <SheetClose asChild>
            <Button className="w-full" variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    )
}
