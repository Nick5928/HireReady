import Navbar from "@/components/ui/Navbar";

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


export default async function Profile() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
      redirect('/login')
  }
  return (
    <div>
      <Navbar/>
      <div>
        "Location
        Email
        Number
        Education:
          School
          Degree
          Start year
          End year
        Experience:
          Job title
          Company, Company location
          Start date End date
          description
        Links:
          LinkedIn"

      </div>
    </div>
  );
}