export type AssetResponse = {
    id: number;
    symbol: string;
    name: string;
    address: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};