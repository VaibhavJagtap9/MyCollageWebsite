'use client'
import { motion } from 'framer-motion';
import MainNavbar from '@/components/Navbar/Employer/MainNavbar'
import StepperForm from '@/components/ui/stepper';
 
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
 
 
 

const HireTalentLayout =  ({children}:{children:React.ReactNode}) => {
  const session =   CurrentUser();

  if(session?.role === UserType.STUDENT){
    return redirect("/student/dashboard")
  }
  
 
  const router = useRouter();
 
 
  return (
     <div>
      
      <MainNavbar session={session?.role as UserType === "EMPLOYER" ? session : null}/>
 
 <div className='w-full mt-12'>      

  {children} 
 </div>
      
     
     </div>
  )
}

export default HireTalentLayout
