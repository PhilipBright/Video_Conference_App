import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantListing, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { use, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { Button } from './ui/button'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
  

type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid' 

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')
    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    if(callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='right'/>
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='left'/>
        }
    }
  return (
    <section className='relative h-screen overflow-hidden pt-4 text-white'>
        <div className=' relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <CallLayout />
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block' : showParticipants})}>
                <CallParticipantsList onClose={() => {
                    setShowParticipants(false)
                }} />
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
                <CallControls />
                        <DropdownMenu>
                            <div className=' flex items-center'>
                            <DropdownMenuTrigger className=' cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                                <LayoutList size={20} className=' text-white' />
                            </DropdownMenuTrigger>
      
                            </div>
                            <DropdownMenuContent className=' border-dark-1 bg-dark-1 text-white'>
                            {['speaker-left', 'speaker-right', 'grid'].map((item, index) => (
                                <DropdownMenuItem
                                className=' cursor-pointer'
                                key={index}
                               onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                >
                                {item}
                                </DropdownMenuItem>
                            ))}
                          
            <DropdownMenuSeparator className='border-dark-1' />
         
        </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button className=' cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]' onClick={() => {
            setShowParticipants((prev) => !prev)
        }}>
            <Users size={20} className=' text-white' />
        </Button>
        {!isPersonalRoom && <EndCallButton />}
       

            </div>
        </div>
    </section>
  )
}

export default MeetingRoom
