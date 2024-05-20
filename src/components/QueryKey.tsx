import { useQuery } from "@tanstack/react-query";

function Todos({ todoId }:{todoId:number}) {
    const result = useQuery({
      queryKey: ['todos', todoId],
      queryFn: () => (todoId:number)=>{
        //promise here
      }
    })
    if(result.isPending)  return <>Pending...</>
    else if(result.isError)  return <>Request error  when call  to api</>
    else
    return(
        <>
            {result.data}
        </>
    )
}