// export type TypeRecursively<T> = T extends infer O
//   ? O extends (infer P)[]
//     ? TypeRecursively<P>[]
//     : O extends object
//     ? {
//         [K in keyof O]: O[K] extends Date | (Date | null)
//           ? O[K] extends infer Value
//             ? Value extends Date | (Date | null)
//               ? Value
//               : never
//             : never
//           : O[K] extends infer Value | infer Rest
//           ? Value extends string | number | boolean | symbol
//             ? Value | Rest
//             : TypeRecursively<Value>
//           : never
//       }
//     : O
//   : never

export const withIIFE = <T extends (...args: any) => any>(fn: T) => fn() as ReturnType<T>
