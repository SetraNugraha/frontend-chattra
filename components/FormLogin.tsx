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

export function FormLogin() {
  return (
    <Card className="w-full max-w-sm ring-2 ring-slate-300">
      <CardHeader>
        <CardTitle className="text-xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your number below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer hover:outline-none hover:ring-2 hover:ring-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Login
        </Button>
        <p className="text-sm">
          Don&apos;t have an account ?{" "}
          <Link
            href={"/auth/register"}
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            {" "}
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
