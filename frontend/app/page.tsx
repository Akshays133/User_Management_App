import Link from "next/link"
import { UserList } from "@/components/user-list"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        <Link
          href="/users/new"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
        >
          Add User
        </Link>
      </div>
      <UserList />
    </div>
  )
}

