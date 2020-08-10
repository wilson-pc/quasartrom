import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.4.1
 * Query Engine version: 195d4bdc2d16132977f4ba7a8ca312f7906cb086
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type Action =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: Action
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): ProfileDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): CategoryDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export declare type Role = (typeof Role)[keyof typeof Role]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model User
 */

export type User = {
  id: number
  createdAt: Date
  email: string
  name: string
  role: Role
}



export type UserSelect = {
  id?: boolean
  createdAt?: boolean
  email?: boolean
  name?: boolean
  role?: boolean
  posts?: boolean | FindManyPostArgs
  profile?: boolean | ProfileArgs
}

export type UserInclude = {
  posts?: boolean | FindManyPostArgs
  profile?: boolean | ProfileArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'profile'
      ? ProfileGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'profile'
      ? ProfileGetPayload<S['select'][P]> | null : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput>
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Profile
 */

export type Profile = {
  id: number
  bio: string
  userId: number
}



export type ProfileSelect = {
  id?: boolean
  bio?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type ProfileInclude = {
  user?: boolean | UserArgs
}

export type ProfileGetPayload<
  S extends boolean | null | undefined | ProfileArgs,
  U = keyof S
> = S extends true
  ? Profile
  : S extends undefined
  ? never
  : S extends ProfileArgs | FindManyProfileArgs
  ? 'include' extends U
    ? Profile  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Profile ? Profile[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Profile
: Profile


export interface ProfileDelegate {
  /**
   * Find zero or one Profile.
   * @param {FindOneProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProfileArgs>(
    args: Subset<T, FindOneProfileArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles.
   * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProfileArgs>(
    args?: Subset<T, FindManyProfileArgs>
  ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const Profile = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends ProfileCreateArgs>(
    args: Subset<T, ProfileCreateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const Profile = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends ProfileDeleteArgs>(
    args: Subset<T, ProfileDeleteArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProfileUpdateArgs>(
    args: Subset<T, ProfileUpdateArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProfileDeleteManyArgs>(
    args: Subset<T, ProfileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProfileUpdateManyArgs>(
    args: Subset<T, ProfileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends ProfileUpsertArgs>(
    args: Subset<T, ProfileUpsertArgs>
  ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Profile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Profile findOne
 */
export type FindOneProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile findMany
 */
export type FindManyProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: Enumerable<ProfileOrderByInput>
  /**
   * Sets the position for listing Profiles.
  **/
  cursor?: ProfileWhereUniqueInput
  /**
   * The number of Profiles to fetch. If negative number, it will take Profiles before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Profiles.
  **/
  skip?: number
}


/**
 * Profile create
 */
export type ProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to create a Profile.
  **/
  data: ProfileCreateInput
}


/**
 * Profile update
 */
export type ProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to update a Profile.
  **/
  data: ProfileUpdateInput
  /**
   * Choose, which Profile to update.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile updateMany
 */
export type ProfileUpdateManyArgs = {
  data: ProfileUpdateManyMutationInput
  where?: ProfileWhereInput
}


/**
 * Profile upsert
 */
export type ProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The filter to search for the Profile to update in case it exists.
  **/
  where: ProfileWhereUniqueInput
  /**
   * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
  **/
  create: ProfileCreateInput
  /**
   * In case the Profile was found with the provided `where` argument, update it with this data.
  **/
  update: ProfileUpdateInput
}


/**
 * Profile delete
 */
export type ProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter which Profile to delete.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile deleteMany
 */
export type ProfileDeleteManyArgs = {
  where?: ProfileWhereInput
}


/**
 * Profile without action
 */
export type ProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: number
  createdAt: Date
  title: string
  published: boolean
  authorId: number
}



export type PostSelect = {
  id?: boolean
  createdAt?: boolean
  title?: boolean
  published?: boolean
  categories?: boolean | FindManyCategoryArgs
  author?: boolean | UserArgs
  authorId?: boolean
}

export type PostInclude = {
  categories?: boolean | FindManyCategoryArgs
  author?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'categories'
      ? Array<CategoryGetPayload<S['include'][P]>> :
      P extends 'author'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'categories'
      ? Array<CategoryGetPayload<S['select'][P]>> :
      P extends 'author'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  categories<T extends FindManyCategoryArgs = {}>(args?: Subset<T, FindManyCategoryArgs>): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>;

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput>
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Model Category
 */

export type Category = {
  id: number
  name: string
}



export type CategorySelect = {
  id?: boolean
  name?: boolean
  posts?: boolean | FindManyPostArgs
}

export type CategoryInclude = {
  posts?: boolean | FindManyPostArgs
}

export type CategoryGetPayload<
  S extends boolean | null | undefined | CategoryArgs,
  U = keyof S
> = S extends true
  ? Category
  : S extends undefined
  ? never
  : S extends CategoryArgs | FindManyCategoryArgs
  ? 'include' extends U
    ? Category  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Category ? Category[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> : never
    }
  : Category
: Category


export interface CategoryDelegate {
  /**
   * Find zero or one Category.
   * @param {FindOneCategoryArgs} args - Arguments to find a Category
   * @example
   * // Get one Category
   * const category = await prisma.category.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCategoryArgs>(
    args: Subset<T, FindOneCategoryArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>
  /**
   * Find zero or more Categories.
   * @param {FindManyCategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Categories
   * const categories = await prisma.category.findMany()
   * 
   * // Get first 10 Categories
   * const categories = await prisma.category.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCategoryArgs>(
    args?: Subset<T, FindManyCategoryArgs>
  ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>
  /**
   * Create a Category.
   * @param {CategoryCreateArgs} args - Arguments to create a Category.
   * @example
   * // Create one Category
   * const Category = await prisma.category.create({
   *   data: {
   *     // ... data to create a Category
   *   }
   * })
   * 
  **/
  create<T extends CategoryCreateArgs>(
    args: Subset<T, CategoryCreateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete a Category.
   * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
   * @example
   * // Delete one Category
   * const Category = await prisma.category.delete({
   *   where: {
   *     // ... filter to delete one Category
   *   }
   * })
   * 
  **/
  delete<T extends CategoryDeleteArgs>(
    args: Subset<T, CategoryDeleteArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Update one Category.
   * @param {CategoryUpdateArgs} args - Arguments to update one Category.
   * @example
   * // Update one Category
   * const category = await prisma.category.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CategoryUpdateArgs>(
    args: Subset<T, CategoryUpdateArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete zero or more Categories.
   * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
   * @example
   * // Delete a few Categories
   * const { count } = await prisma.category.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CategoryDeleteManyArgs>(
    args: Subset<T, CategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Categories.
   * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Categories
   * const category = await prisma.category.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CategoryUpdateManyArgs>(
    args: Subset<T, CategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Category.
   * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
   * @example
   * // Update or create a Category
   * const category = await prisma.category.upsert({
   *   create: {
   *     // ... data to create a Category
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Category we want to update
   *   }
   * })
  **/
  upsert<T extends CategoryUpsertArgs>(
    args: Subset<T, CategoryUpsertArgs>
  ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCategoryArgs, 'select' | 'include'>): Promise<number>


}

/**
 * The delegate class that acts as a "Promise-like" for Category.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Category findOne
 */
export type FindOneCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter, which Category to fetch.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category findMany
 */
export type FindManyCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter, which Categories to fetch.
  **/
  where?: CategoryWhereInput
  /**
   * Determine the order of the Categories to fetch.
  **/
  orderBy?: Enumerable<CategoryOrderByInput>
  /**
   * Sets the position for listing Categories.
  **/
  cursor?: CategoryWhereUniqueInput
  /**
   * The number of Categories to fetch. If negative number, it will take Categories before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Categories.
  **/
  skip?: number
}


/**
 * Category create
 */
export type CategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The data needed to create a Category.
  **/
  data: CategoryCreateInput
}


/**
 * Category update
 */
export type CategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The data needed to update a Category.
  **/
  data: CategoryUpdateInput
  /**
   * Choose, which Category to update.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category updateMany
 */
export type CategoryUpdateManyArgs = {
  data: CategoryUpdateManyMutationInput
  where?: CategoryWhereInput
}


/**
 * Category upsert
 */
export type CategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * The filter to search for the Category to update in case it exists.
  **/
  where: CategoryWhereUniqueInput
  /**
   * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
  **/
  create: CategoryCreateInput
  /**
   * In case the Category was found with the provided `where` argument, update it with this data.
  **/
  update: CategoryUpdateInput
}


/**
 * Category delete
 */
export type CategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
  /**
   * Filter which Category to delete.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category deleteMany
 */
export type CategoryDeleteManyArgs = {
  where?: CategoryWhereInput
}


/**
 * Category without action
 */
export type CategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CategoryInclude | null
}



/**
 * Deep Input Types
 */


export type CategoryWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  posts?: PostFilter | null
  AND?: Enumerable<CategoryWhereInput>
  OR?: Array<CategoryWhereInput>
  NOT?: Enumerable<CategoryWhereInput>
}

export type PostWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  title?: string | StringFilter
  published?: boolean | BooleanFilter
  categories?: CategoryFilter | null
  authorId?: number | IntFilter
  AND?: Enumerable<PostWhereInput>
  OR?: Array<PostWhereInput>
  NOT?: Enumerable<PostWhereInput>
  author?: UserWhereInput | null
}

export type ProfileWhereInput = {
  id?: number | IntFilter
  bio?: string | StringFilter
  userId?: number | IntFilter
  AND?: Enumerable<ProfileWhereInput>
  OR?: Array<ProfileWhereInput>
  NOT?: Enumerable<ProfileWhereInput>
  user?: UserWhereInput | null
}

export type UserWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  email?: string | StringFilter
  name?: string | StringFilter
  role?: Role | RoleFilter
  posts?: PostFilter | null
  AND?: Enumerable<UserWhereInput>
  OR?: Array<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  profile?: ProfileWhereInput | null
}

export type UserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  email?: SortOrder
  name?: SortOrder
  role?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type PostOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  title?: SortOrder
  published?: SortOrder
  authorId?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: number
}

export type CategoryOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type CategoryWhereUniqueInput = {
  id?: number
}

export type ProfileOrderByInput = {
  id?: SortOrder
  bio?: SortOrder
  userId?: SortOrder
}

export type ProfileWhereUniqueInput = {
  id?: number
}

export type CategoryCreateWithoutPostsInput = {
  name: string
}

export type CategoryCreateManyWithoutPostsInput = {
  create?: Enumerable<CategoryCreateWithoutPostsInput>
  connect?: Enumerable<CategoryWhereUniqueInput>
}

export type PostCreateWithoutAuthorInput = {
  createdAt?: Date | string
  title: string
  published?: boolean
  categories?: CategoryCreateManyWithoutPostsInput
}

export type PostCreateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput>
  connect?: Enumerable<PostWhereUniqueInput>
}

export type ProfileCreateWithoutUserInput = {
  bio: string
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export type UserCreateInput = {
  createdAt?: Date | string
  email: string
  name: string
  role?: Role
  posts?: PostCreateManyWithoutAuthorInput
  profile?: ProfileCreateOneWithoutUserInput
}

export type CategoryUpdateWithoutPostsDataInput = {
  name?: string
}

export type CategoryUpdateWithWhereUniqueWithoutPostsInput = {
  where: CategoryWhereUniqueInput
  data: CategoryUpdateWithoutPostsDataInput
}

export type CategoryScalarWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  posts?: PostFilter | null
  AND?: Enumerable<CategoryScalarWhereInput>
  OR?: Array<CategoryScalarWhereInput>
  NOT?: Enumerable<CategoryScalarWhereInput>
}

export type CategoryUpdateManyDataInput = {
  name?: string
}

export type CategoryUpdateManyWithWhereNestedInput = {
  where: CategoryScalarWhereInput
  data: CategoryUpdateManyDataInput
}

export type CategoryUpsertWithWhereUniqueWithoutPostsInput = {
  where: CategoryWhereUniqueInput
  update: CategoryUpdateWithoutPostsDataInput
  create: CategoryCreateWithoutPostsInput
}

export type CategoryUpdateManyWithoutPostsInput = {
  create?: Enumerable<CategoryCreateWithoutPostsInput>
  connect?: Enumerable<CategoryWhereUniqueInput>
  set?: Enumerable<CategoryWhereUniqueInput>
  disconnect?: Enumerable<CategoryWhereUniqueInput>
  delete?: Enumerable<CategoryWhereUniqueInput>
  update?: Enumerable<CategoryUpdateWithWhereUniqueWithoutPostsInput>
  updateMany?: Enumerable<CategoryUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<CategoryScalarWhereInput>
  upsert?: Enumerable<CategoryUpsertWithWhereUniqueWithoutPostsInput>
}

export type PostUpdateWithoutAuthorDataInput = {
  createdAt?: Date | string
  title?: string
  published?: boolean
  categories?: CategoryUpdateManyWithoutPostsInput
}

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export type PostScalarWhereInput = {
  id?: number | IntFilter
  createdAt?: Date | string | DateTimeFilter
  title?: string | StringFilter
  published?: boolean | BooleanFilter
  categories?: CategoryFilter | null
  authorId?: number | IntFilter
  AND?: Enumerable<PostScalarWhereInput>
  OR?: Array<PostScalarWhereInput>
  NOT?: Enumerable<PostScalarWhereInput>
}

export type PostUpdateManyDataInput = {
  createdAt?: Date | string
  title?: string
  published?: boolean
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export type PostUpdateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput>
  connect?: Enumerable<PostWhereUniqueInput>
  set?: Enumerable<PostWhereUniqueInput>
  disconnect?: Enumerable<PostWhereUniqueInput>
  delete?: Enumerable<PostWhereUniqueInput>
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PostScalarWhereInput>
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
}

export type ProfileUpdateWithoutUserDataInput = {
  bio?: string
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export type ProfileUpdateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export type UserUpdateInput = {
  createdAt?: Date | string
  email?: string
  name?: string
  role?: Role
  posts?: PostUpdateManyWithoutAuthorInput
  profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  createdAt?: Date | string
  email?: string
  name?: string
  role?: Role
}

export type UserCreateWithoutProfileInput = {
  createdAt?: Date | string
  email: string
  name: string
  role?: Role
  posts?: PostCreateManyWithoutAuthorInput
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export type ProfileCreateInput = {
  bio: string
  user: UserCreateOneWithoutProfileInput
}

export type UserUpdateWithoutProfileDataInput = {
  createdAt?: Date | string
  email?: string
  name?: string
  role?: Role
  posts?: PostUpdateManyWithoutAuthorInput
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export type ProfileUpdateInput = {
  bio?: string
  user?: UserUpdateOneRequiredWithoutProfileInput
}

export type ProfileUpdateManyMutationInput = {
  bio?: string
}

export type UserCreateWithoutPostsInput = {
  createdAt?: Date | string
  email: string
  name: string
  role?: Role
  profile?: ProfileCreateOneWithoutUserInput
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export type PostCreateInput = {
  createdAt?: Date | string
  title: string
  published?: boolean
  categories?: CategoryCreateManyWithoutPostsInput
  author: UserCreateOneWithoutPostsInput
}

export type UserUpdateWithoutPostsDataInput = {
  createdAt?: Date | string
  email?: string
  name?: string
  role?: Role
  profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export type PostUpdateInput = {
  createdAt?: Date | string
  title?: string
  published?: boolean
  categories?: CategoryUpdateManyWithoutPostsInput
  author?: UserUpdateOneRequiredWithoutPostsInput
}

export type PostUpdateManyMutationInput = {
  createdAt?: Date | string
  title?: string
  published?: boolean
}

export type PostCreateWithoutCategoriesInput = {
  createdAt?: Date | string
  title: string
  published?: boolean
  author: UserCreateOneWithoutPostsInput
}

export type PostCreateManyWithoutCategoriesInput = {
  create?: Enumerable<PostCreateWithoutCategoriesInput>
  connect?: Enumerable<PostWhereUniqueInput>
}

export type CategoryCreateInput = {
  name: string
  posts?: PostCreateManyWithoutCategoriesInput
}

export type PostUpdateWithoutCategoriesDataInput = {
  createdAt?: Date | string
  title?: string
  published?: boolean
  author?: UserUpdateOneRequiredWithoutPostsInput
}

export type PostUpdateWithWhereUniqueWithoutCategoriesInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutCategoriesDataInput
}

export type PostUpsertWithWhereUniqueWithoutCategoriesInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutCategoriesDataInput
  create: PostCreateWithoutCategoriesInput
}

export type PostUpdateManyWithoutCategoriesInput = {
  create?: Enumerable<PostCreateWithoutCategoriesInput>
  connect?: Enumerable<PostWhereUniqueInput>
  set?: Enumerable<PostWhereUniqueInput>
  disconnect?: Enumerable<PostWhereUniqueInput>
  delete?: Enumerable<PostWhereUniqueInput>
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutCategoriesInput>
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PostScalarWhereInput>
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutCategoriesInput>
}

export type CategoryUpdateInput = {
  name?: string
  posts?: PostUpdateManyWithoutCategoriesInput
}

export type CategoryUpdateManyMutationInput = {
  name?: string
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type PostFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type BooleanFilter = {
  equals?: boolean
  not?: boolean | BooleanFilter
}

export type CategoryFilter = {
  every?: CategoryWhereInput
  some?: CategoryWhereInput
  none?: CategoryWhereInput
}

export type RoleFilter = {
  equals?: Role
  not?: Role | RoleFilter
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
