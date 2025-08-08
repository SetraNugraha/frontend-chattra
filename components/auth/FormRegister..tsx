"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { AxiosError } from "axios"
import Link from "next/link"
import { useState } from "react"

interface IFormRegister {
  phone: string
  username: string
}

interface IRegisterState {
  isLoading: boolean
  hasError: {
    phone: Array<string> | null
    username: Array<string> | null
  }
}

export function FormRegister() {
  const { register } = useAuth()
  const [formRegister, setFormRegister] = useState<IFormRegister>({
    phone: "",
    username: "",
  })

  const [registerState, setRegisterState] = useState<IRegisterState>({
    isLoading: false,
    hasError: {
      phone: null,
      username: null,
    },
  })

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRegisterState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const result = await register(formRegister)
      if (result.success) {
        setFormRegister({
          phone: "",
          username: "",
        })
        setRegisterState({
          isLoading: false,
          hasError: {
            phone: null,
            username: null,
          },
        })
        alert("Register success")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.fieldErrors
        setRegisterState((prevState) => ({ ...prevState, hasError: errors }))
      } else {
        alert("Internal server error, Please try again later.")
      }
    } finally {
      setRegisterState((prevState) => ({ ...prevState, isLoading: false }))
    }
  }

  return (
    <Card className="w-full max-w-sm ring-2 ring-slate-300">
      <CardHeader>
        <CardTitle className="text-xl">Register new account</CardTitle>
        <CardDescription>Enter your number below to register to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-6">
            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phone" className="font-semibold tracking-wide">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="number"
                placeholder="8 digit, ex: 87164182"
                required
                className={`${registerState.hasError?.phone && "ring-1 ring-red-500"}`}
                value={formRegister.phone}
                onChange={(e) => setFormRegister((prevState) => ({ ...prevState, phone: e.target.value }))}
              />
              {/* Error Message Phone*/}
              {registerState.hasError?.phone && (
                <span className="text-sm text-red-500 italic ml-2">{registerState.hasError.phone[0]}</span>
              )}
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="font-semibold tracking-wide">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                className={`${registerState.hasError?.username && "ring-1 ring-red-500"}`}
                value={formRegister.username}
                onChange={(e) => setFormRegister((prevState) => ({ ...prevState, username: e.target.value }))}
              />

              {/* Error Message Username*/}
              {registerState.hasError?.username && (
                <span className="text-sm text-red-500 italic ml-2">{registerState.hasError.username[0]}</span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full mt-5 cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:bg-white hover:text-black transition-all duration-300 ${
              registerState.isLoading && "bg-slate-600 font-semibold"
            }`}
            disabled={registerState.isLoading}
          >
            {registerState.isLoading ? "Process Register ..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-sm">
          Already have an account ?{" "}
          <Link href={"/auth/login"} className="text-blue-500 font-semibold cursor-pointer hover:underline">
            {" "}
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
