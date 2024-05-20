import { useQuery } from "@tanstack/react-query";
const UseQueryData = ()=>{
    const {isPending, error, data} = useQuery({
        //      ^? const data: string | undefined
        queryKey: ['test'],
        queryFn: () => Promise.resolve(5),
        select: (data) => data.toString()
      })
      if(isPending) return <>Pending</>
      if(error) return <>Error</>
  return (
  <>
  {data}
  </>
  )
} 
 export default UseQueryData