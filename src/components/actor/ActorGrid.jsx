import React from 'react'
import {ActorCard} from './ActorCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'


const ActorGrid = ({data}) => {
  return (
    <FlexGrid>
    {
        data.map(({person})=>{
            return <ActorCard 
            key={person.id} 
            image={person.image ? person.image.medium :IMAGE_NOT_FOUND } 
            name={person.name} 
            gender={person.gender} 
            country={person.country ? person.country.name : null} 
            birthday={person.birthday} 
            deathday={person.deathday} 
             />
        })
    }
    </FlexGrid>
  )
}

export default ActorGrid