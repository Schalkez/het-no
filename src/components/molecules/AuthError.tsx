interface AuthErrorProps {
  message: string
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f8] dark:bg-[#111421] p-4 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">
          error
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Đăng nhập thất bại</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">{message}</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
      >
        Về trang chủ
      </button>
    </div>
  )
}
