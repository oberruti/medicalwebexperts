/**
 * The nil type represents either a null or undefined value.
 */
export type nil = null | undefined

// Whether a value is nil (null|undefined) or not
export function isNil(ref: any): ref is nil {
    return ref === null || ref === undefined
}

// Whether a value is not nil (or not)
export function isNotNil<T>(ref: T | nil): ref is T {
    return !isNil(ref)
}

export function getValueOrDefault<T>(value: T | nil, defaultValue: T): T {
    return isNil(value) ? defaultValue : value
}
