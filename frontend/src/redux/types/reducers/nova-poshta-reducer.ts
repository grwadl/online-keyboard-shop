interface City {
  Ref: string
  SettlementType: string
  Latitude: string
  Longitude: string
  Description: string
  DescriptionRu: string
  SettlementTypeDescription: string
  SettlementTypeDescriptionRu: string
  Region: string
  RegionsDescription: string
  RegionsDescriptionRu: string
  Area: string
  AreaDescription: string
  AreaDescriptionRu: string
}

interface PostOffice {
  RegionCity: string
  Longitude: string
  Latitude: string
  Description: string
  DescriptionRu: string
  ShortAddress: string
}

interface NovaPoshtaResponse {
  success: boolean
  data: PostOffice[] | City[]
}

export type { City, PostOffice, NovaPoshtaResponse }
