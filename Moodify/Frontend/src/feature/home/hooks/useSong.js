import { useContext } from "react"
import {getSong} from "../service/song.api"
import { SongDataContext } from "../context/SongContext"

export const useSong =()=>{
    const context = useContext(SongDataContext)
    const {song,setSong,loading,setLoading} =context 

   async function handleGetSong({mood}) {
    setLoading(true)
    const data = await getSong({mood})
    setSong(data.song)
    setLoading(false)
   }

   return({handleGetSong,loading,song})
    
}