import {v4 as uuid} from 'uuid'
import { DBField, writeDB } from './src/dbController'

const db = Array.from({length:100}).map((_,i)=>({
    "id":uuid(),
    "imageUrl":`https://picsum.photos/id/${i}/150/100`,
    "price":1000 * Math.floor(Math.random() * 20) * 50,
    "title":`임시상품_${i}`,
    "description":`임시상품내용_${i}`,
    createdAt:1657527625680 + (1000 * 60 * 60 * 5) * i
}))

writeDB(DBField.PRODUCTS, db);