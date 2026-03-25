import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ContactFormInput, VPSPlan, VPSPlanInput } from "../backend.d";
import { useActor } from "./useActor";

// ─── VPS Plans ────────────────────────────────────────────────────────────────

export function useVPSPlans() {
  const { actor, isFetching } = useActor();
  return useQuery<VPSPlan[]>({
    queryKey: ["vpsPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVPSPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVPSPlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: VPSPlanInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addVPSPlan(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpsPlans"] });
    },
    onError: () => {
      toast.error("Failed to add plan.");
    },
  });
}

export function useUpdateVPSPlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, plan }: { id: string; plan: VPSPlan }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateVPSPlan(id, plan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpsPlans"] });
    },
    onError: () => {
      toast.error("Failed to update plan.");
    },
  });
}

export function useDeleteVPSPlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteVPSPlan(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vpsPlans"] });
    },
    onError: () => {
      toast.error("Failed to delete plan.");
    },
  });
}

// ─── Legacy stubs (components still import these) ────────────────────────────

export function useHostingPlans() {
  return useQuery<never[]>({
    queryKey: ["hostingPlans"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useTestimonials() {
  return useQuery<never[]>({
    queryKey: ["testimonials"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useFAQs() {
  return useQuery<never[]>({
    queryKey: ["faqs"],
    queryFn: async () => [],
    enabled: false,
  });
}

// ─── Contact form ─────────────────────────────────────────────────────────────

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
