"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResType;
(function (ResType) {
    ResType[ResType["Ok"] = 0] = "Ok";
    ResType[ResType["Er"] = 1] = "Er";
})(ResType = exports.ResType || (exports.ResType = {}));
exports.ok = function (item) {
    return { type: ResType.Ok, item: item };
};
exports.er = function (error) {
    return { type: ResType.Er, error: error };
};
exports.map = function (result, func) {
    switch (result.type) {
        case ResType.Ok: {
            return { type: ResType.Ok, item: func(result.item) };
        }
        case ResType.Er: {
            return { type: ResType.Er, error: result.error };
        }
    }
};
exports.flatMap = function (result, func) {
    switch (result.type) {
        case ResType.Ok: {
            return func(result.item);
        }
        case ResType.Er: {
            return { type: ResType.Er, error: result.error };
        }
    }
};
exports.getOrElse = function (result, other) {
    switch (result.type) {
        case ResType.Ok: {
            return result.item;
        }
        case ResType.Er: {
            return other;
        }
    }
};
exports.getUnsafe = function (result) {
    switch (result.type) {
        case ResType.Ok: {
            return result.item;
        }
        case ResType.Er: {
            throw new Error("getUnsafe called on error");
        }
    }
};
