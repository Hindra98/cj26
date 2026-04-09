export const Loader = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"/>
    </div>
  )
}
export const LoaderInfinite = () => (
  <div className="flex justify-center py-6">
    <div className="w-6 h-6 border-4 border-gray-300 border-t-[#033720] rounded-full animate-spin"/>
  </div>
)
export const PostSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 border rounded-xl">
      <div className="h-4 bg-gray-300 rounded w-1/3"/>
      <div className="h-4 bg-gray-300 rounded w-full"/>
      <div className="h-40 bg-gray-300 rounded"/>
    </div>
  )
}
export const GallerySkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 border rounded-xl">
      {/* <div className="h-4 bg-gray-300 rounded w-1/3"/>
      <div className="h-4 bg-gray-300 rounded w-full"/> */}
      <div className="h-40 bg-gray-300 rounded"/>
    </div>
  )
}
