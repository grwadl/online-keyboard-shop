import { NovaPoshtaResponse } from '@/redux/types/reducers/nova-poshta-reducer'

const apiKey = import.meta.env.VITE_NP_TOKEN
const url = import.meta.env.VITE_NP_URL

type PostParamsProps = {
  modelName: string
  calledMethod: string
  searchedValue: Record<string, string>
}

const getParams = ({ modelName, calledMethod, searchedValue }: PostParamsProps) => ({
  apiKey,
  modelName,
  calledMethod,
  methodProperties: {
    ...searchedValue,
    Limit: 10
  }
})

class PostService {
  static async getPostOfiice(value: string, CityName: string): Promise<NovaPoshtaResponse> {
    return fetch(url, {
      body: JSON.stringify(
        getParams({
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          searchedValue: { WarehouseId: value, CityName }
        })
      ),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (!res.ok) throw new Error(`Error fetching ${url}`)
      return res.json() as Promise<NovaPoshtaResponse>
    })
  }

  static async getCity(value: string): Promise<NovaPoshtaResponse> {
    return fetch(url, {
      body: JSON.stringify(
        getParams({ calledMethod: 'getSettlements', modelName: 'Address', searchedValue: { FindByString: value } })
      ),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (!res.ok) throw new Error(`Error fetching ${url}`)
      return res.json() as Promise<NovaPoshtaResponse>
    })
  }
}

export { PostService }
