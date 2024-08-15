import AuthNavBar from "@/components/common/auth-nav-bar"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <AuthNavBar showToggleLanguage={true}/>
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
