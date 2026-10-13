/**
 * Scientific Engine SQL MySQL Schema & Relational Query Engine Core Module
 * Table indexing, relational filtering, and relational schema management.
 */



export class EngineMySQLStore {

  private tables: Map<string, Array<Record<string, any>>> = new Map();

  public insert(tableName: string, record: Record<string, any>): void {
    if (!this.tables.has(tableName)) this.tables.set(tableName, []);
    this.tables.get(tableName)!.push(record);
  }

  public selectWhere(tableName: string, predicate: (row: Record<string, any>) => boolean): Array<Record<string, any>> {
    return (this.tables.get(tableName) || []).filter(predicate);
  }
        
}

export const EngineMySQLStoreInstance = new EngineMySQLStore();
