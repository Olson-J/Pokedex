import TabNavigation from '@/components/TabNavigation'

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <TabNavigation />
      <main className="w-full">{children}</main>
    </div>
  )
}
