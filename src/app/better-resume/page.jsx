import Navbar from "@/components/ui/Navbar";

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import UserInput from "@/components/UserInput";

export default async function Page() {
  const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
  return (
    <div>
      <Navbar/>
      <UserInput />
    </div>
  );
}