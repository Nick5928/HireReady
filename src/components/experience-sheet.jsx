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
import { useRouter } from 'next/navigation'

export function ExperienceSheet({ data, supabase, type}) {
  const router = useRouter();
  const isAdd = type === "add"

  const handleAdd = async (e) => {
      e.preventDefault();
      console.log(data);
      const { data: profileId, error: profileError } = await supabase
        .from('profile')
        .select('id')
        .eq('user_id', data.user_id)
        .single();
      const formData = new FormData(e.target);
      const updatedData = {
        company: formData.get('company'),
        job_title: formData.get('job_title'),
        start_month: formData.get('start_month'),
        start_year: formData.get('start_year'),
        end_month: formData.get('end_month'),
        end_year: formData.get('end_year'),
        description: formData.get('description'),
        profile_id: profileId?.id,
      };
      console.log(updatedData);
      await supabase
        .from('experience')
        .insert([updatedData])

      router.refresh()

    }


    const handleEdit = async (e) => {
      console.log(data);
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedData = {
        company: formData.get('company'),
        job_title: formData.get('job_title'),
        start_month: formData.get('start_month'),
        start_year: formData.get('start_year'),
        end_month: formData.get('end_month'),
        end_year: formData.get('end_year'),
        description: formData.get('description'),
      };
      await supabase
        .from('experience')
        .update([updatedData])
        .eq('id', data.id)

      router.refresh()

    }
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">{!isAdd ? 'Edit' : 'Add' }</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className='text-xl'>{!isAdd ? `${data.job_title} at ${data.company}` : 'Add Experience'}</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={isAdd? handleAdd : handleEdit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" defaultValue={data.company} />  
            </div>
            <div className="grid gap-3">
              <Label htmlFor="job_title">Job Title</Label>
              <Input id="job_title" name="job_title" defaultValue={data.job_title} />
            </div>
            <div className="flex gap-3">
              <div className="grid gap-3">
                <Label htmlFor="start_month">Start Month</Label>
                <Input id="start_month" name="start_month" defaultValue={data.start_month} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="start_year">Start Year</Label>
                <Input id="start_year" name="start_year" defaultValue={data.start_year} />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="grid gap-3">
                <Label htmlFor="end_month">End Month</Label>
                <Input id="end_month" name="end_month" defaultValue={data.end_month} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="end_year">End Year</Label>
                <Input id="end_year" name="end_year" defaultValue={data.end_year} />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" name="description" defaultValue={data.description}/>
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">{!isAdd ? 'Save Changes' : 'Add Experience'}</Button>
            <SheetClose asChild>
              <Button className="w-full" variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
          </form>
      </SheetContent>
    </Sheet>
    )
}
