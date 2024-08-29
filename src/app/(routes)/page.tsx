import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="flex h-full items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Your HR</CardTitle>
                    <CardDescription>
                        Find your ideal job based on your qualifications and
                        preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        asChild
                        size={"sm"}
                        variant={"yourHr"}
                        className="w-full"
                    >
                        <Link href={"/signup"}>Sign up</Link>
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm">
                        <span>Already have an account?&nbsp;</span>
                        <span className="font-medium text-blue-700 hover:underline">
                            Sign in
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
