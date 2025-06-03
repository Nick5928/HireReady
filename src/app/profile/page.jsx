import Navbar from "@/components/ui/Navbar";

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileSection } from "@/components/profile-section";


export default async function Profile() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
      redirect('/login')
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('*, education(*), experience(*)')
    .eq('user_id', data.user.id)
    .single();

  
  let fullProfile = {
    isEmpty: true,
    email: data.user.email,
    user_id: data.user.id,
  }
  
  if(profileData) {
    fullProfile = {
      isEmpty: false,
      email: data.user.email,
      ...profileData
    }
  }

  return (
    <div>
      <Navbar user={data.user}/>
      <ProfileSection data={fullProfile}/>
    </div>
  );
}