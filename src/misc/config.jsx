const BASE_URL = 'https://api.tvmaze.com/'

export async function apiGet(queryString){
   const response = await fetch(`${BASE_URL}${queryString}`).then(r => r.json())
   // throw new Error('oops')
   return response;
}
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    //   .then(response => response.json())
    //   .then(response => {
    //     setResults(response)
    //   })