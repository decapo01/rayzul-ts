declare enum ResType {
    Ok = 0,
    Er = 1
}
declare type Ok<T, E> = {
    item: T;
    type: ResType.Ok;
};
declare type Er<T, E> = {
    error: E;
    type: ResType.Er;
};
declare type Result<T, E> = Ok<T, E> | Er<T, E>;
declare const ok: <T, E>(item: T) => Result<T, E>;
declare const er: <T, E>(error: E) => Result<T, E>;
declare const map: <T, E, B>(result: Result<T, E>, func: (itme: T) => B) => Result<B, E>;
declare const flatMap: <T, E, B>(result: Result<T, E>, func: (item: T) => Result<B, E>) => Result<B, E>;
declare const getOrElse: <T, E>(result: Result<T, E>, other: T) => T;
declare const getUnsafe: <T, E>(result: Result<T, E>) => T;
