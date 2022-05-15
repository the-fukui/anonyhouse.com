import { Database, ref, get } from 'firebase/database'

export class DatabaseCRUD {
  private _database: Database

  public constructor(database: Database) {
    this._database = database
  }

  public get({ path }: { path: string }) {}
}
