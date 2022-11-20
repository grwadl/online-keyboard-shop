import { Test } from '@nestjs/testing'
import { FindManyOptions, In } from 'typeorm'
import { FilterProduct } from '../../products/dto/filter.product.dto'
import {
  Keyboard,
  KeyboardType,
  Switches
} from '../../products/entities/product.entity'
import { QueryParserService } from '../query-parser.service'

describe('test of transforming parsed request query to sql query', () => {
  const mockedKeyboardData: FilterProduct = {
    keycaps: 'pbt',
    switches: [Switches.BLUE, Switches.BROWN]
  }

  const mockedKeyboardData2: FilterProduct = {
    ...mockedKeyboardData,
    type: [KeyboardType.OPTICAL, KeyboardType.MECHANICAL]
  }

  let queryParsingService: QueryParserService
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QueryParserService]
    }).compile()
    queryParsingService = module.get<QueryParserService>(QueryParserService)
  })

  it('should transform ex#1 correctly', () => {
    const res = queryParsingService.transformQuery<Keyboard, FilterProduct>(
      mockedKeyboardData
    )
    const expected: FindManyOptions<Keyboard> = {
      where: {
        keycaps: mockedKeyboardData.keycaps,
        switches: In(mockedKeyboardData.switches as Switches[])
      }
    }
    expect(res).toMatchObject(expected)
  })
  it('should transform ex#2 correctly', () => {
    const res = queryParsingService.transformQuery<Keyboard, FilterProduct>(
      mockedKeyboardData2
    )
    const expected: FindManyOptions<Keyboard> = {
      where: {
        keycaps: mockedKeyboardData2.keycaps,
        switches: In(mockedKeyboardData2.switches as Switches[]),
        type: In(mockedKeyboardData2.type as KeyboardType[])
      }
    }
    expect(res).toMatchObject(expected)
  })
})
