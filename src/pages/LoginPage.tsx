import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post("/api/user/login", {
        username: loginId,
        password: password
      })

      const token = response.data.token
      const expirationDate = response.data.expirationDate

      if (!token) {
        throw new Error("토큰이 없습니다.")
      }

      localStorage.setItem("jwt", token)
      localStorage.setItem("tokenExpiration", expirationDate)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-0 py-12">
      <section className="relative w-full max-w-3xl overflow-hidden rounded-3xl border bg-card/80 px-6 py-12 shadow-xl sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-0 h-52 w-52 rounded-full bg-muted/70 blur-3xl" />

        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight">로그인</h2>
            <p className="text-sm text-muted-foreground">
              아이디와 비밀번호를 입력해 주세요.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="login-id">
                아이디
              </label>
              <input
                id="login-id"
                name="loginId"
                type="text"
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="login-password">
                비밀번호
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <Button className="h-11 w-full text-base" type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
