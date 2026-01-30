import TabNavigation from '@/app/components/TabNavigation'
import MareepBanner from '@/app/components/MareepBanner'

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <MareepBanner />
      <TabNavigation />
      <main className="w-full">{children}</main>
    </div>
  )
}
