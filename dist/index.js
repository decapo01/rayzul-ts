"use strict";
var ResType;
(function (ResType) {
    ResType[ResType["Ok"] = 0] = "Ok";
    ResType[ResType["Er"] = 1] = "Er";
})(ResType || (ResType = {}));
var ok = function (item) {
    return { type: ResType.Ok, item: item };
};
var er = function (error) {
    return { type: ResType.Er, error: error };
};
var map = function (result, func) {
    switch (result.type) {
        case ResType.Ok: {
            return { type: ResType.Ok, item: func(result.item) };
        }
        case ResType.Er: {
            return { type: ResType.Er, error: result.error };
        }
    }
};
var flatMap = function (result, func) {
    switch (result.type) {
        case ResType.Ok: {
            return func(result.item);
        }
        case ResType.Er: {
            return { type: ResType.Er, error: result.error };
        }
    }
};
var getOrElse = function (result, other) {
    switch (result.type) {
        case ResType.Ok: {
            return result.item;
        }
        case ResType.Er: {
            return other;
        }
    }
};
var getUnsafe = function (result) {
    switch (result.type) {
        case ResType.Ok: {
            return result.item;
        }
        case ResType.Er: {
            throw new Error("getUnsafe called on error");
        }
    }
};
