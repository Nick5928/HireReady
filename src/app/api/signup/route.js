import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body)

    let { data, error } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
    })
    if (error) {
      console.log(error)
      return NextResponse.json(
        { error: error.message, code: error.code},
        { status: 400 },
      );
    }
    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}