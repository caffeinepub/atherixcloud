import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FAQ {
    question: string;
    answer: string;
}
export type Time = bigint;
export interface HostingPlan {
    features: Array<string>;
    name: string;
    description: string;
    price: number;
    planType: HostingPlanType;
}
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
export interface Testimonial {
    name: string;
    quote: string;
    company: string;
    rating: number;
}
export enum HostingPlanType {
    vps = "vps",
    cloud = "cloud",
    sharedPlan = "sharedPlan",
    dedicated = "dedicated"
}
export interface backendInterface {
    addFAQ(faq: FAQ): Promise<void>;
    addHostingPlan(plan: HostingPlan): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getFAQs(): Promise<Array<FAQ>>;
    getHostingPlans(): Promise<Array<HostingPlan>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    submitContactForm(input: ContactFormInput): Promise<void>;
}
