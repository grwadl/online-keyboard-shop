const city = {
  Latitude: '',
  Longitude: '',
  Description: '',
  Region: '',
  RegionsDescription: '',
  AreaDescription: ''
}

const postOffice = {
  RegionCity: '',
  Longitude: '',
  Latitude: '',
  Description: '',
  ShortAddress: ''
}

interface NovaPoshtaResponse {
  success: boolean
  data: PostOffice[] | City[]
}

type City = typeof city
type PostOffice = typeof postOffice

const isResCityArray = (data: City[] | PostOffice[]): data is City[] => 'AreaDescription' in data
const isResPostOfficeArray = (data: PostOffice[] | City[]): data is PostOffice[] => 'ShortAdress' in data

export { postOffice, city, isResCityArray, isResPostOfficeArray }
export type { City, PostOffice, NovaPoshtaResponse }
