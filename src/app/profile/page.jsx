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

  if (profileError || !profileData) {
    console.error(profileError);
    return <div>Error loading profile</div>;
  }

  const fullProfile = {
    email: data.user.email,
    ...profileData
  }

  return (
    <div>
      <Navbar />
      <ProfileSection data={fullProfile}/>
    </div>
  );
}