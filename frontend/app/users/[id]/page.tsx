import { UserDetail } from "@/components/user-detail"

export default async function UserDetailPage({
  params,
}: {
    params: Promise<{ id: string }>
}) {
  const param = await params
  return <UserDetail id={param?.id} />
}

