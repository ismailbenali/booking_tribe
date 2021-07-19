import axios from 'axios'

const uri = 'https://api.skypicker.com/'

const fetcher = axios.create({
    baseURL: uri,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const searchLocation = (term, limit, sort, locale, location_types, active_only) => {

    return fetcher.get(`locations?term=${term}&locale=${locale}&location_types=${location_types}&limit=${limit}
    &active_only=${active_only}&sort=${sort}`)
        .then(res => res.data)

}

export const searchFlights = (flyFrom, limit, sort, locale, to, dateFrom, dateTO, returnFrom, returnTo) => {

    return fetcher.get(`flights?v=3&partner=skypicker&${locale}=en&flyFrom=${flyFrom}&to=${to}&dateFrom=${dateFrom}&dateTo=${dateTO}&
    typeFlight=return&returnFrom=${returnFrom}&returnTo=${returnTo}&limit=${limit}&sort=${sort}`)
        .then(res => res.data)

}
