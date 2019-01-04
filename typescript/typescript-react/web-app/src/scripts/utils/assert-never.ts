export function assertNever(value: never, errorMessage: string): never {
    throw new Error(errorMessage);
}
