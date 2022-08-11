import { useState } from 'react'

import lodashOrderBy from 'lodash/orderBy'

import EMPTY_USER_TABLE_DATA from '@constants/table'
import { TableData } from '@customtypes/row'
import Order from '@customtypes/sortingOrders'

const useSortEntity = (data: TableData[]) => {
  const symbols: TableData = {}
  Object.keys(EMPTY_USER_TABLE_DATA)?.forEach((key) => {
    symbols[key] = '↑↓'
  })
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const [orders, setOrders] = useState<undefined | Order[]>(undefined)
  const [sortingSymbols, setSortingSymbols] = useState<TableData>(symbols)

  const onPressColumn = (column: string | number) => {
    const entity = `${column}`.toLowerCase().split(' ')[0]
    let currentColumns = columns?.slice()
    let currentOrders = orders?.slice()
    let currentSymbols = { ...sortingSymbols }
    if (!!currentColumns?.length && !!currentOrders?.length) {
      if (currentColumns?.includes(entity)) {
        const entityIndex = currentColumns?.indexOf(entity)
        const entityOrder = currentOrders[entityIndex]
        switch (entityOrder) {
          case 'asc':
            currentOrders[entityIndex] = 'desc'
            currentSymbols = {
              ...currentSymbols,
              [entity]: '↓',
            }
            break
          case 'desc':
            currentOrders.splice(entityIndex, 1)
            currentColumns.splice(entityIndex, 1)
            currentSymbols = {
              ...currentSymbols,
              [entity]: '↑↓',
            }
        }
      } else {
        currentColumns?.push(entity)
        currentOrders?.push('asc')
        currentSymbols = {
          ...currentSymbols,
          [entity]: '↑',
        }
      }
    } else {
      currentColumns = [entity]
      currentOrders = ['asc']
      currentSymbols = {
        ...currentSymbols,
        [entity]: '↑',
      }
    }
    setColumns(currentColumns)
    setOrders(currentOrders)
    setSortingSymbols(currentSymbols)
  }

  return {
    onPressColumn,
    data: lodashOrderBy(data, columns, orders),
    sortingSymbols,
  }
}

export default useSortEntity
