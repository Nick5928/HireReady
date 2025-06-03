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
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
export function UserDetailsSheet({ data, supabase }) {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      location: formData.get('location'),
      number: formData.get('number'),
      user_id: data.user_id,
    };
    await supabase
      .from('profile')
      .upsert([updatedData], { onConflict: ['user_id'] })

    router.refresh()

  }
    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-xl'>Edit user details</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
                <div className="flex gap-3">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input id="first_name" name="first_name"defaultValue={data.first_name} />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" name="last_name" defaultValue={data.last_name} />
                  </div>
                </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={data.location} name="location" />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={data.email} />
            </div> */}
            <div className="grid gap-3">
              <Label htmlFor="number">Number</Label>
              <Input id="number" name="number" defaultValue={data.number} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="w-full" variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
    )
}
