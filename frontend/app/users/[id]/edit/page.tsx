//@ts-ignore
import { UserForm } from "@/components/user-form"

// Define props type for params
interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const param = await params;
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit User</h2>
      <UserForm id={param?.id} />
    </div>
  )
}

