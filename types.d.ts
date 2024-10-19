/**
 * Augment the Express Interface
 * This is useful for adding custom properties to the Express Request object.
 */
declare namespace Express {
  export interface Request {
    startTime: Date
    db: import('@prisma/client').PrismaClient
  }
}

/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module '@eslint/js' {
  // Why the hell doesn't eslint themselves export their types?
  import type { Linter } from 'eslint'

  export const configs: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> }
    readonly all: { readonly rules: Readonly<Linter.RulesRecord> }
  }
}

/**
 * Add Environment Variables to the NodeJS Process Interface
 * This is useful for adding environment variables to the NodeJS process interface.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    DATABASE_URL: string
    PORT?: string
  }
}
