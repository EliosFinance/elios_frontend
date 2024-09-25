export type TransactionType = {
    id: number;
    userId: number | 'me';
    all?: boolean;
    limit: number;
    income?: boolean;
    deleted?: boolean;
    filter?: 'application_date' | 'date';
    min_date?: Date | string;
    max_date?: Date | string;
    wording?: string;
    min_value?: number;
    max_value?: number;
    search?: string;
    value?: string;
    last_update?: Date;
};
