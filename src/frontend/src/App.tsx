import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
});

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.018 255 / 0.9)",
            border: "1px solid oklch(0.28 0.03 250 / 0.6)",
            color: "oklch(0.95 0.02 265)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
