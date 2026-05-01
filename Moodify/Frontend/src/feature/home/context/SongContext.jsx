import React, { createContext, useState } from 'react'

export const SongDataContext = createContext()

const SongContext = ({children}) => {

    const [song, setSong] = useState(
        {
  "url": "https://ik.imagekit.io/pilfuubys/cohort-2/moodify/songs/Humsafar__From__Badrinath_Ki_Dulhania___9uNNQCRWe.mp3",
  "posterUrl": "https://ik.imagekit.io/pilfuubys/cohort-2/moodify/posters/Humsafar__From__Badrinath_Ki_Dulhania___qJFamh4Fq1.jpeg",
  "title": "Humsafar (From \"Badrinath Ki Dulhania\")",
  "mood": "sad",
  
}
    )
    const [loading, setLoading] = useState(false)

  return (
    <SongDataContext.Provider value={{song,setSong,loading,setLoading}}>
        {children}
    </SongDataContext.Provider>
  )
}

export default SongContext