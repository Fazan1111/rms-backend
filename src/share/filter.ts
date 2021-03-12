export default interface Filter {
    similar?: string;
    rangeFilter?: string;
    categoryId: number;
}

export interface RangeFilter {
    column: string;
    value: [any, any];
}


export interface QueryRelation {
    entityName: string;
    aliasName?: string;
    relation: string;
    subRelation?: object;
    subRelationCondition?: [string, object];
    relationType?: "INNER" | "LEFT";
    condition?: [string, object];
}