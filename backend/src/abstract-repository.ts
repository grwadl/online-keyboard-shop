import {
  Brackets,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOptionsOrder,
  Repository,
  SelectQueryBuilder,
  WhereExpressionBuilder
} from 'typeorm'
import { isArray } from './query-parser/query-parser.service'

type Dict<T> = {
  [K in keyof T]: T[K]
}

class AbstractRepository<T> extends Repository<T> {
  constructor(private model: EntityTarget<T>, manager: EntityManager) {
    super(model, manager)
  }

  private convertExpressionToString(
    statement: FindManyOptions<T>[keyof FindManyOptions<T>],
    key: string
  ): [string, Dict<FindManyOptions<T>>] {
    if (!isArray(statement[key]))
      return [`${key} = :${key}Param`, { [`${key}Param`]: statement[key] }]
    return [`${key} IN (:...${key}Param)`, { [`${key}Param`]: statement[key] }]
  }

  private buildWhereExpression(whereStatement: FindManyOptions<T>['where']) {
    const whereStatementKeys = Object.keys(
      whereStatement
    ) as (keyof T extends string ? string : never)[]

    const whereQuery = new Brackets((qb) => {
      let innerQb: WhereExpressionBuilder = qb
      whereStatementKeys.forEach((key) => {
        const nestedWhereExpression = this.convertExpressionToString(
          whereStatement,
          key
        )
        innerQb = innerQb.andWhere(...nestedWhereExpression)
      })
      return qb
    })

    return whereQuery
  }

  private buildWhereQuery(
    whereStatement: FindManyOptions<T>['where'],
    builder: SelectQueryBuilder<T>
  ) {
    if (!isArray(whereStatement))
      return builder.where(this.buildWhereExpression(whereStatement))

    let lastInner = builder
    whereStatement.forEach((where) => {
      const innerWhereQuery = this.buildWhereExpression(where)
      lastInner = lastInner.orWhere(innerWhereQuery)
    })

    return builder
  }

  private buildOrderClause(
    opt: FindOptionsOrder<T>,
    builder: SelectQueryBuilder<T>
  ) {
    const [key] = Object.keys(opt)
    builder.orderBy(key, opt[key])
    return builder
  }

  private buildOffset(skip: number, builder: SelectQueryBuilder<T>) {
    builder.offset(skip)
    return builder
  }

  private buildLimit(take: number, builder: SelectQueryBuilder<T>) {
    builder.limit(take)
    return builder
  }

  buildQuery(opt: FindManyOptions<T>, builder: SelectQueryBuilder<T>) {
    const { order, skip, take, where } = opt
    if (where) builder = this.buildWhereQuery(where, builder)
    if (order) builder = this.buildOrderClause(order, builder)
    if (skip) builder = this.buildOffset(skip, builder)
    if (take) builder = this.buildLimit(take, builder)
    return builder
  }
}

export { AbstractRepository }
