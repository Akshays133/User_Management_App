"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createUser, updateUser, getUserById } from "@/lib/api"
import type { UserFormData } from "@/types/user"

type UserFormProps = {
  id?: string
}

type FormErrors = {
  [K in keyof UserFormData]?: string
}

export function UserForm({ id }: UserFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(id ? true : false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    age: "",
    mobile: "",
    interest: "",
  })

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(id)
          setFormData({
            user: user.user,
            email: user.email,
            age: user.age.toString(),
            mobile: user.mobile.toString(),
            interest: user.interest.join(", "),
          })
          setError(null)
        } catch (err) {
          setError("Failed to fetch user")
          console.error("Failed to fetch user:", err)
        } finally {
          setLoading(false)
        }
      }
      fetchUser()
    }
  }, [id])

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.user.trim()) {
      newErrors.user = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    const age = Number.parseInt(formData.age)
    if (!formData.age) {
      newErrors.age = "Age is required"
    } else if (isNaN(age) || age < 0 || age > 150) {
      newErrors.age = "Age must be between 0 and 150"
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be a 10-digit number"
    }

    if (!formData.interest.trim()) {
      newErrors.interest = "At least one interest is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)
    try {
      const userData: UserFormData = {
        user: formData.user,
        email: formData.email,
        age: Number.parseInt(formData.age),
        mobile: formData.mobile,
        interest: formData.interest
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      }

      if (id) {
        await updateUser(id, userData)
      } else {
        await createUser(userData)
      }

      router.push("/")
    } catch (err) {
      setError("Failed to save user")
      console.error("Failed to save user:", err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="user"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
          />
          {errors.user && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.user}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age}</p>
          )}
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium"/>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile" 
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
          />
          {errors.mobile && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mobile}</p>
          )}
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            id="interest"
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white p-2"
            placeholder="e.g. Reading, Sports, Music"
          />
          {errors.interest && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.interest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
  </form>
  )
}

