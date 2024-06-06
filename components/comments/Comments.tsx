"use client"

import { ClientSideSuspense } from "@liveblocks/react"

export const Comments = () => (
    <ClientSideSuspense fallback={null}>
        {()=> <CommentsOverlay />}
    </ClientSideSuspense>
);