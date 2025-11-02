'use client'
import { useUser, RedirectToSignIn } from '@clerk/nextjs'

export default function AdminBlogs() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) return <RedirectToSignIn />  // 🚀 automatic redirect

  return (
    <div className="text-white">Admin Dashboard Here</div>
  )
}
