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
import { useRouter } from 'next/navigation';

export function EducationSheet({ data, supabase, type}) {
    const router = useRouter();
    const isAdd = type === "add"


    const handleAdd = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const { data: profileId, error: profileError } = await supabase
        .from('profile')
        .select('id')
        .eq('user_id', data.user_id)
        .single();
      const updatedData = {
        school: formData.get('school'),
        degree: formData.get('degree'),
        start_year: formData.get('start_year'),
        end_year: formData.get('end_year'),
        profile_id: profileId?.id,
      };

      await supabase
        .from('education')
        .insert([updatedData])

      router.refresh()

    }


    const handleEdit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedData = {
        school: formData.get('school'),
        degree: formData.get('degree'),
        start_year: formData.get('start_year'),
        end_year: formData.get('end_year'),
      };
      await supabase
        .from('education')
        .update([updatedData])
        .eq('id', data.id)

      router.refresh()

    }
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button className='cursor-pointer' variant="outline">{!isAdd ? 'Edit' : 'Add'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-xl'>{!isAdd ? `Edit ${data.school}` : "Add education"}</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={isAdd? handleAdd : handleEdit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="school">School</Label>
              <Input id="school" name="school" defaultValue={data.school} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" defaultValue={data.degree} />
            </div>
            <div className="grid gap-3">
              <div className="flex gap-3">
                <div>
                  <Label htmlFor="start_year">Start Year</Label>
                  <Input id="start_year" name="start_year" defaultValue={data.start_year} />
                </div>
                <div>
                  <Label htmlFor="end_year">End Year</Label>
                  <Input id="end_year" name="end_year" defaultValue={data.end_year} />
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
        </form>
      </SheetContent>
    </Sheet>
    )
}
