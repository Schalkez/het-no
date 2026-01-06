export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/4 ml-4"></div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
      </div>
      <div className="pt-3 border-t-2 border-dashed border-gray-100 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}
