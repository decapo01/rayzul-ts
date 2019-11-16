


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

export const map = <T,E,B>(result: Result<T,E>, func: (itme: T) => B): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return { type: ResType.Ok, item : func(result.item) }
    }
    case ResType.Er : {
      return { type: ResType.Er, error: result.error }
    }
  }
}

export const flatMap = <T,E,B>(result: Result<T,E>, func: (item: T) => Result<B,E>): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return func(result.item)
    }
    case ResType.Er : {
      return { type: ResType.Er, error: result.error }
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