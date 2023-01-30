import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router'
import Cast from '../components/show/Cast'
import Details from '../components/show/Details'
import Seasons from '../components/show/Seasons'
import ShowMainData from '../components/show/ShowMainData'
import { apiGet } from '../misc/config'
import { InfoBlock, ShowPageWrapper } from './Show.styled'


const initialState = {
  show: null,
  isLoading: true,
  error: null
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { error: null, show: action.show, isLoading: false };
    case 'FETCH_FAILED':
      return { ...prevState, error: action.error, isLoading: false };

    default: return prevState;
  }
}

const Show = () => {

  const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState)

  // console.log('show', show);

  const { id } = useParams()
  // const [show, setShow] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)


  useEffect(() => {

    let isMounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {

      if (isMounted) {

        dispatch({ type: 'FETCH_SUCCESS', show: results })

        // setShow(results)
        // setIsLoading(false)
      }
    })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message })

          // setError(err.message)
          // setIsLoading(false)
        }

      })

    return () => {
      isMounted = false
    }

  }, [id])

  // console.log(show);

  if (isLoading) {
    return <div>Data is loading..</div>
  }
  if (error) {
    return <div>{`Error message : ${error}`}</div>
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summery}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons
          seasons={show._embedded.seasons}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast
          cast={show._embedded.cast}
        />
      </InfoBlock>
    </ShowPageWrapper>
  )
}

export default Show