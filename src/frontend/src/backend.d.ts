import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VPSPlan {
    id: string;
    ram: string;
    features: Array<string>;
    name: string;
    cores: string;
    category: string;
    price: bigint;
}
export interface VPSPlanInput {
    id: string;
    ram: string;
    features: Array<string>;
    name: string;
    cores: string;
    category: string;
    price: bigint;
}
export type Time = bigint;
export interface Submission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface ContactFormInput {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    addVPSPlan(input: VPSPlanInput): Promise<string>;
    adminLogin(email: string, password: string): Promise<boolean>;
    deleteVPSPlan(id: string): Promise<boolean>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getVPSPlans(): Promise<Array<VPSPlan>>;
    submitContactForm(input: ContactFormInput): Promise<void>;
    updateVPSPlan(id: string, plan: VPSPlan): Promise<boolean>;
}
