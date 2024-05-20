import * as React from "react";
import axios from "axios";

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Example from "@/components/Example";
import { SimpleExample } from "@/components/SimpleExample";
import UseQueryData from "@/components/UserQuery";

const client = new QueryClient();

type Todos = {
  items: readonly {
    id: string;
    text: string;
  }[];
  ts: number;
};

async function fetchTodos(): Promise<Todos> {
  const res = await axios.get("/api/data");
  return res.data;
}

export function useTodos() {
  return useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}


export default function App() {
  return (
    <QueryClientProvider client={client}>
      {/* <Example/>
      <SimpleExample/> */}
      <UseQueryData/>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}