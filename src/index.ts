
enum ResType {
  Ok,
  Er
}

type Ok<T,E> = {
  item : T,
  type : ResType.Ok
}

type Er<T,E> = {
  error : E,
  type  : ResType.Er
}

type Result<T,E> = Ok<T,E> | Er<T,E>

const ok = <T,E>(item: T): Result<T,E> => {
  return { type: ResType.Ok, item: item }
}

const er = <T,E>(error: E): Result<T,E> => {
  return { type: ResType.Er, error: error }
}

const map = <T,E,B>(result: Result<T,E>, func: (itme: T) => B): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return { type: ResType.Ok, item : func(result.item) }
    }
    case ResType.Er : {
      return { type: ResType.Er, error: result.error }
    }
  }
}

const flatMap = <T,E,B>(result: Result<T,E>, func: (item: T) => Result<B,E>): Result<B,E> => {
  switch(result.type){
    case ResType.Ok : {
      return func(result.item)
    }
    case ResType.Er : {
      return { type: ResType.Er, error: result.error }
    }
  }
}

const getOrElse = <T,E>(result: Result<T,E>, other: T): T => {
  switch(result.type){
    case ResType.Ok : {
      return result.item
    }
    case ResType.Er : {
      return other
    }
  }
}

const getUnsafe = <T,E>(result: Result<T,E>): T => {
  switch(result.type){
    case ResType.Ok : {
      return result.item
    }
    case ResType.Er : {
      throw new Error("getUnsafe called on error")
    }
  }
}