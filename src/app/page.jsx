import Navbar from "@/components/ui/Navbar";
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function Home(){
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
 
    return (
        <div>
            <Navbar user={data.user}/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-6">
                    Get Hire Ready Today
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
                    Optimize your job hunt with tools to enhance your resume, score it against job descriptions, and create a ready-to-share profile.
                </p>
                <a href={ error || !data?.user ? "/login" : "/better-resume"}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer">
                    Start Now
                    </button>
                </a>
            </div>
        </div>
    );
}
