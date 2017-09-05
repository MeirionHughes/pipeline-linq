import { where, select, first } from './src';

let data = [1, 2, 3, 4];

let where_ = where(data, x => x > 2);
let select_ = select(where_, x => x * 2);
let result = first(select_);

