import React, { useCallback, useState } from 'react'
import LiveCursor from './cursor/LiveCursor'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat';
import { CursorMode, CursorState } from '@/types/type';

const Live = () => {
    const others = useOthers();
    const [{cursor}, updatemyPresence] = useMyPresence() as any;
    // as any;
    const [cursorState, setCursorState] = useState({
        mode : CursorMode.Hidden,
    })

    const handlePointerMove = useCallback((event : React.PointerEvent)=>{

       event.preventDefault();

       if(cursor == null || cursorState.mode !== cursor.ReactionSelector){

           const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
           const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    
           updatemyPresence(
            {
              cursor : {x,y}
            }
            );
       }


    }, [])

    const handlePointerLeave = useCallback((event : React.PointerEvent)=>{
        // event.preventDefault();
        setCursorState({mode : CursorMode.Hidden});
 
 
        updatemyPresence(
            {
              cursor : null, 
              message : null 
            }
        );
        
     }, [])

     const handlePointerDown = useCallback((event : React.PointerEvent)=>{
        
 
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
 
        updatemyPresence({cursor : {x,y}});

        setCursorState((state : CursorState) =>
            cursorState.mode === CursorMode.Reaction ? {
                ...state, isPressed : true 
            } : state
        );
        
     }, [cursorState.mode, setCursorState]);

     const handlePointerUp = useCallback(()=>{
        setCursorState((state : CursorState) =>
            cursorState.mode === CursorMode.Reaction ? {
                ...state, isPressed : false
            } : state
        
        );
     },[cursorState.mode, setCursorState]);
  return (
    <div 
        onPointerMove = {handlePointerMove}
         onPointerLeave={handlePointerLeave}
         onPointerDown={handlePointerDown}
         onPointerUp = {handlePointerUp}
         className= "h-[100vh] w-full flex justify-center items-center"
    >
         <h1 className = "text-2xl text-white"> 
           Figma clone with liveblocks
       
         </h1>
         {cursor && (
            <CursorChat 
            cursor = {cursor}
            cursorState = {cursorState}
            setCursorState = {setCursorState}
            updateMyPresence = {updatemyPresence}
            />

         )}
        <LiveCursor others={others} />

      
    </div>
  )
}

export default Live
