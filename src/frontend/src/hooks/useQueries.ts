import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ContactFormInput,
  FAQ,
  HostingPlan,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export function useHostingPlans() {
  const { actor, isFetching } = useActor();
  return useQuery<HostingPlan[]>({
    queryKey: ["hostingPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHostingPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ContactFormInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(input);
    },
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you soon.");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });
}
