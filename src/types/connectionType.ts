// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = Record<string, any>;

export type SubscriptionType = {
    id: number;
    id_connection: number | null;
    id_user: number | null;
    id_source: number | null;
    number: string | null;
    label: string;
    subscriber: string | null;
    validity: Date | null;
    renewdate: Date | null;
    last_update: Date | null;
    deleted: Date | null;
    disabled: Date | null;
    error: string | null;
};

export type BankAccountType = {
    id: number;
    id_connection: number | null;
    id_user: number | null;
    id_source: number | null;
    id_parent: number | null;
    number: string | null;
    original_name: string;
    balance: number | null;
    coming: number | null;
    display: boolean;
    last_update: Date | null;
    deleted: Date | null;
    disabled: Date | null;
    iban: string | null;
    currency: UnknownType | null;
    type: UnknownType;
    id_type: number;
    bookmarked: number;
    name: string;
    error: string | null;
    usage: UnknownType;
    ownership: UnknownType | null;
    company_name: string | null;
    loan: UnknownType | null;
};

export type ConnectorType = {
    id: number;
    uuid: string;
    name: string;
    hidden: boolean | null;
    charged: boolean;
    code: string | null;
    beta: boolean;
    color: string | null;
    slug: string | null;
    sync_frequency: number | null;
    month_to_fetch: number | null;
    auth_machanism: string | null;
    available_auth_mechanism: string[];
    transfer_machaism: string | null;
    siret: string;
    restricted: boolean;
    capabilities: string[];
    account_usages: string[];
    payment_settings: UnknownType;
    products: string[];
};

export type ConnectorLightType = {
    country_code: string;
    id_payment: string;
};

export type ConnectionType = {
    id: string;
    id_user: string;
    id_connector: string;
    state: string | null;
    error_message: string | null;
    fields: ConnectorLightType[] | null;
    last_update: Date | null;
    created: Date | null;
    actvive: boolean;
    last_push: Date | null;
    expire: Date | null;
    connector_uuid: string;
    next_try: Date | null;
    balance: number;
    connector?: ConnectorType;
    accounts?: BankAccountType[];
    subscriptions?: SubscriptionType[];
};
