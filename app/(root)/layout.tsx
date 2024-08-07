import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Conference",
  description: "Video Conferencing App",
  icons:{
    icon: '/icons/logo.svg'
  }
};

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='relative'>
  <StreamVideoProvider>
         
        <Navbar />
        <div className='flex'>
           <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:pb-14'>
                <div className='w-full'>
                {children}
                </div>
            </section>
        </div>
       
        Footer

        </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
