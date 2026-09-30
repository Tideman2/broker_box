export type PlanStatus = "ACTIVE" | "INACTIVE";

export type RiskManagement =
    | "STANDARD"
    | "ADVANCED_HEDGING"
    | "TAILORED_MULTI_LAYER";

export type PlanResponse = {
    id: number;
    title: string;
    /** Serialized as a string because the backend field is a Decimal. */
    min_amount: string;
    duration: number;
    /** Serialized as a string because the backend field is a Decimal. */
    roi: string;
    risk_management: RiskManagement;
    description: string;
    status: PlanStatus;
    features: string[];
    created_at: string;
    updated_at: string;
    /**
     * Not yet returned by GET /plan. Declared optional so the current
     * payload still typechecks and no badge renders until the backend
     * starts sending it.
     */
    is_recommended?: boolean;
};

export type PlansResponse = {
    plans: PlanResponse[];
};
