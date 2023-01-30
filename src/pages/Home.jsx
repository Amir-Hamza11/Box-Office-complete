import React from 'react'
import { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid'
import ShowGrid from '../components/show/ShowGrid'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled'
import CustomRadio from '../components/CustomRadio'

const Home = () => {

  const [input, setInput] = useLastQuery()
  const [results, setResults] = useState(null)
  const [searchOption, setSearchOption] = useState('shows')

  const isShowsSearch = searchOption === 'shows'

  const onInputChange = (el) => {
    setInput(el.target.value)
  }

  const onSearch = () => {
    apiGet(`search/${searchOption}?q=${input}`) 
      .then(res => setResults(res))
  }


  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch()
    }
  }

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No result Found</div>
    }

    if (results && results.length > 0) {
      return results[0].show ?
        <ShowGrid data={results} /> : <ActorGrid data={results} />

      // results.map((item) => {
      //   return <div key={item.show.id} >{item.show.name}</div>
      // }) :
      // results.map((item) => {
      //   return <div key={item.person.id} >{item.person.name}</div>
      // })

      // return results.map((item) => {
      //   return <h6 key={item.show ? item.show.id : item.person.id} >{item.show ? item.show.name : item.person.name}</h6>
      // })
    }
    return null

  }

  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value)
  }

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />

      <RadioInputsWrapper>
        <div>

          <CustomRadio
            label='Shows'
            id='show-search'
            value='shows'
            checked={isShowsSearch}
            onChange={onRadioChange}
          />



          {/* <label htmlFor="show-search">
            Shows
            <input
              type="radio"
              id='show-search'
              value='shows'
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </label> */}

        </div>

        <div>

          <CustomRadio
            label='Actors'
            id='actors-search'
            value='people'
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />

          {/* <label htmlFor="actors-search">
            Actors
            <input
              id='actors-search'
              value='people'
              checked={!isShowsSearch}
              onChange={onRadioChange}
              type="radio"
            />
          </label> */}

        </div>

      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <div>
          <button
            type='button'
            onClick={onSearch}>
            Search
          </button>
        </div>
      </SearchButtonWrapper>


      {results && renderResults()}
    </MainPageLayout>
  )
}

export default Home