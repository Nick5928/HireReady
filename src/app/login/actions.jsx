'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      success: false,
      errorMessage: error,
      code: error.code,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }



  const { data: userData, error } = await supabase.auth.signUp(data)
  if (error) {
    return {
      errorMessage: error,
      status: error.status,
      code: error.code,
    }
  }

  
  const updatedData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        location: formData.get('location'),
        number: formData.get('number'),
        user_id: userData.user.id,
      };
  console.log(updatedData);
  await supabase
    .from('profile')
    .upsert([updatedData], { onConflict: ['user_id'] })


  revalidatePath('/', 'layout')
  redirect('/')
}