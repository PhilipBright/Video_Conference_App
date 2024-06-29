import { cn } from '@/lib/utils'
import { CallControls, CallParticipantListing, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid' | 'speaker-only'

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
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
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
                <CallControls />
            </div>
        </div>
    </section>
  )
}

export default MeetingRoom
