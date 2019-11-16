


export enum ResType {
  Ok,
  Er
}

export type Ok<T,E> = {
  item : T,
  type : ResType.Ok
}

export type Er<T,E> = {
  error : E,
  type  : ResType.Er
}

export type Result<T,E> = Ok<T,E> | Er<T,E>

export const ok = <T,E>(item: T): Result<T,E> => {
  return { type: ResType.Ok, item: item }
}

export const er = <T,E>(error: E): Result<T,E> => {
  return { type: ResType.Er, error: error }
}

export const map = <T,E,B>(result: Result<T,E>, func: (item: T) => B): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return ok(func(result.item))
    }
    case ResType.Er : {
      return er(result.error)
    }
  }
}

export const flatMap = <T,E,B>(result: Result<T,E>, func: (item: T) => Result<B,E>): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return func(result.item)
    }
    case ResType.Er : {
      return er(result.error)
    }
  }
}

export const getOrElse = <T,E>(result: Result<T,E>, other: T): T => {
  switch(result.type){
    case ResType.Ok : {
      return result.item
    }
    case ResType.Er : {
      return other
    }
  }
}

export const getUnsafe = <T,E>(result: Result<T,E>): T => {
  switch(result.type){
    case ResType.Ok : {
      return result.item
    }
    case ResType.Er : {
      throw new Error("getUnsafe called on error")
    }
  }
}

export function doYield2<A,B,C,E>(res1: Result<A,E>,
                                  res2: Result<B,E>, 
                                  func: (a: A, b: B) => C): Result<C,E> {

  return flatMap(res1, _res1 => map(res2, _res2 => func(_res1,_res2)))
}

export function doYield3<A,B,C,D,E>(res1: Result<A,E>,
                                    res2: Result<B,E>,
                                    res3: Result<C,E>, 
                                    func: (a: A, b: B, c: C) => D): Result<D,E> {

  return flatMap(res1, _res1 => flatMap(res2, _res2 => map(res3, _res3 => func(_res1,_res2,_res3))))
}