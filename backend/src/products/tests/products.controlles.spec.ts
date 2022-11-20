import { Test } from '@nestjs/testing'
import { QueryParserService } from '../../../src/query-parser/query-parser.service'
import { IKeyboard, KeyboardType, Switches } from '../entities/product.entity'
import { ProductsController } from '../products.controller'
import { ProductsService } from '../products.service'

describe('Product controller', () => {
  const mockedKeyboards: IKeyboard[] = [
    {
      id: 1,
      keycaps: 'pbt',
      type: KeyboardType.MECHANICAL,
      switches: Switches.BLUE
    },
    {
      id: 2,
      keycaps: 'pbt',
      type: KeyboardType.OPTICAL,
      switches: Switches.RED
    }
  ]

  let productController: ProductsController
  const productService = {
    get: jest.fn(() => mockedKeyboards),
    getOne: jest.fn(({ where: { id: idx } }) =>
      mockedKeyboards.find(({ id }) => idx === id)
    )
  }
  const queryParserService = { transformQuery: jest.fn(() => ({})) }
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ProductsController],
      providers: [ProductsService, QueryParserService]
    })
      .overrideProvider(ProductsService)
      .useValue(productService)
      .overrideProvider(QueryParserService)
      .useValue(queryParserService)
      .compile()
    productController = moduleRef.get<ProductsController>(ProductsController)
  })

  it('should return all the keyboards', async () => {
    const keyboards = await productController.getAll({})
    expect(keyboards).toHaveLength(2)
    expect(keyboards[0]).toMatchObject(mockedKeyboards[0])
  })

  it('should return keyboard with id===1', async () => {
    const keyboard = await productController.getOne(mockedKeyboards[0].id)
    expect(keyboard).toMatchObject(mockedKeyboards[0])
    expect(productService.getOne).toBeCalledWith({
      where: { id: mockedKeyboards[0].id }
    })
  })
})
