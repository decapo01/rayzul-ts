export declare enum ResType {
    Ok = 0,
    Er = 1
}
export declare type Ok<T, E> = {
    item: T;
    type: ResType.Ok;
};
export declare type Er<T, E> = {
    error: E;
    type: ResType.Er;
};
export declare type Result<T, E> = Ok<T, E> | Er<T, E>;
export declare const ok: <T, E>(item: T) => Result<T, E>;
export declare const er: <T, E>(error: E) => Result<T, E>;
export declare const map: <T, E, B>(result: Result<T, E>, func: (itme: T) => B) => Result<B, E>;
export declare const flatMap: <T, E, B>(result: Result<T, E>, func: (item: T) => Result<B, E>) => Result<B, E>;
export declare const getOrElse: <T, E>(result: Result<T, E>, other: T) => T;
export declare const getUnsafe: <T, E>(result: Result<T, E>) => T;
