
import Navs from './Navs'
import Title from './Title'

const MainPageLayout = ({children}) => {
  return (
    <>
    <Title title='Box office'  subtitle='Are you looking for a movie or an actor' />
    <Navs/>
    {children}
    </>
  )
}

export default MainPageLayout