"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getUsers } from "@/lib/api"
import type { User } from "@/types/user"

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch users")
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
  }

  if (users?.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No users found. Add your first user!
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {users?.map((user) => (
          <li key={user?._id} className="p-4 hover:bg-gray-50">
            <Link href={`/users/${user?._id}`} className="block sm:flex justify-between items-center">
              <div className="mb-2 sm:mb-0">
                <h3 className="text-lg font-medium text-gray-900">{user?.user}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">Age: {user?.age}</div>
                <span className="text-gray-400">&rarr;</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

