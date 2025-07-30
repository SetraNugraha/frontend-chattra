import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function FormRegister() {
  return (
    <Card className="w-full max-w-sm ring-2 ring-slate-300">
      <CardHeader>
        <CardTitle className="text-xl">Register new account</CardTitle>
        <CardDescription>
          Enter your number below to register to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phone" className="font-semibold tracking-wide">
                Number
              </Label>
              <Input
                id="phone"
                type="number"
                placeholder="8 digit, ex: 87164182"
                required
              />
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
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Register
        </Button>
        <p className="text-sm">
          Already have an account ?{" "}
          <Link
            href={"/auth/login"}
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            {" "}
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
