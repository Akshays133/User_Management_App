"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getUserById, deleteUser } from "@/lib/api"
import type { User } from "@/types/user"

export function UserDetail({ id }: { id: string }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id)
        setUser(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch user")
        console.error("Failed to fetch user:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return

    setIsDeleting(true)
    try {
      await deleteUser(id)
      router.push("/")
    } catch (err) {
      console.error("Failed to delete user:", err)
      setError("Failed to delete user")
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 p-4 rounded-lg">
        {error || "User not found"}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.user}</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link
            href={`/users/${user._id}/edit`}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 sm:flex-none bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
          <dd className="mt-1 text-lg text-gray-900 dark:text-white">{user.email}</dd>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</dt>
          <dd className="mt-1 text-lg text-gray-900 dark:text-white">{user.age}</dd>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile</dt>
          <dd className="mt-1 text-lg text-gray-900 dark:text-white">{user.mobile}</dd>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Interests</dt>
          <dd className="mt-1">
            <ul className="flex flex-wrap gap-2">
              {user.interest.map((item) => (
                <li
                  key={item}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className="flex justify-start">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

