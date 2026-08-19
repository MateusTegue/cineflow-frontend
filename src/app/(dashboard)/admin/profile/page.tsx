"use client";

import { Profile } from "@/components/profile/Profile";

export default function ProfilePage() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-4">
      <Profile />
    </div>
  );
}