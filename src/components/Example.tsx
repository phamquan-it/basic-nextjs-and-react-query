import { useTodos } from "@/pages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function Example() {
    const queryClient = useQueryClient();
    const [text, setText] = React.useState("");
    const todoQuery = useTodos();
  
    const addTodoMutation = useMutation({
      mutationFn: (newTodo: string) => axios.post("/api/data", { text: newTodo }),
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
      onSuccess: (data) => {
        console.log(data);
      },
    });
  
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setText("");
            addTodoMutation.mutate(text);
          }}
        >
          <input
            type="text"
            className="border"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <button disabled={addTodoMutation.isPending}>Create</button>
        </form>
        <br />
        {todoQuery.isSuccess && (
          <>
            <div>
              {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */}
              Updated At: {new Date(todoQuery.data.ts).toLocaleTimeString()}
            </div>
            <ul>
              {todoQuery.data.items.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
              {addTodoMutation.isPending && (
                <li style={{ opacity: 0.5 }}>{addTodoMutation.variables}</li>
              )}
              {addTodoMutation.isError && (
                <li style={{ color: "red" }}>
                  {addTodoMutation.variables}
                  <button
                    onClick={() =>
                      addTodoMutation.mutate(addTodoMutation.variables)
                    }
                  >
                    Retry
                  </button>
                </li>
              )}
            </ul>
            {todoQuery.isFetching && <div>Updating in background...</div>}
          </>
        )}
        {todoQuery.isPending && "Loading"}
        {todoQuery.error instanceof Error && todoQuery.error.message}
      </div>
    );
  }
export default  Example;