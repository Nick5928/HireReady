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
import { Textarea } from "./ui/textarea"

export function ExperienceSheet({ data }) {
  const start_date = new Date(data.start_date);
  const end_date =  data.end_date != null ? new Date(data.end_date) : "present";

  const start_string = `${start_date.toLocaleString('default', { month: 'long' })} ${start_date.getFullYear()}`

  const end_string = end_date === "present" ? end_date : `${end_date.toLocaleString('default', { month: 'long' })} ${end_date.getFullYear()}`

  console.log(data);
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-xl'>{`${data.job_title} at ${data.company} `}</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="company">Company</Label>
            <Input id="company" defaultValue={data.company} />  
          </div>
          <div className="grid gap-3">
            <Label htmlFor="job_title">Job Title</Label>
            <Input id="job_title" defaultValue={data.job_title} />
          </div>
          <div className="flex gap-3">
            <div className="grid gap-3">
              <Label htmlFor="start_year">Start</Label>
              <Input id="start_year" defaultValue={start_string} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="end_year">End</Label>
              <Input id="end_year" defaultValue={end_string} />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Job Description</Label>
            <Textarea id="description" defaultValue={data.description}/>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button className="w-full" variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    )
}
