"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { AxiosError } from "axios"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ILoginState {
  isLoading: boolean
  hasError: {
    phone: Array<string> | null
  }
}

export function FormLogin() {
  const { login } = useAuth()
  const router = useRouter()
  const [phone, setPhone] = useState<string>(String(""))
  const [loginState, setLoginState] = useState<ILoginState>({
    isLoading: false,
    hasError: {
      phone: null,
    },
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const result = await login(phone)
      if (result.success) {
        setLoginState((prevState) => ({ ...prevState, hasError: { phone: null } }))
        setPhone("")
        alert("login success")
        router.push("/")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.fieldErrors
        setLoginState((prevState) => ({ ...prevState, hasError: errors }))
      } else {
        alert("Internal server error, Please try again later.")
      }
    } finally {
      setLoginState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  return (
    <Card className="w-full max-w-sm ring-2 ring-slate-300">
      <CardHeader>
        <CardTitle className="text-xl">Login to your account</CardTitle>
        <CardDescription>Enter your number below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="phone" className="font-semibold tracking-wide">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="number"
                placeholder="8 digit, ex: 87164182"
                required
                className={`${loginState.hasError?.phone && "ring-1 ring-red-500"}`}
                value={phone}
                maxLength={8}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* Login Error Validtion */}
              {loginState.hasError?.phone && (
                <span className="text-sm text-red-500 ml-3 italic">{loginState.hasError.phone[0]}</span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-5 cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:bg-white hover:text-black transition-all duration-300"
          >
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-sm">
          Don&apos;t have an account ?{" "}
          <Link href={"/auth/register"} className="text-blue-500 font-semibold cursor-pointer hover:underline">
            {" "}
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
