// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = Record<string, any>;

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
}

export type ConnectorLightType = {
    country_code: string;
    id_payment: string;
}

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
};