"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { UploadButton } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import prisma from "$/prisma/db";
import { createUser } from "@/app/actions/create-user";

const formSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
});

export default function SignupPage() {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<
        string | undefined
    >("");
    const [uploadedImageName, setUploadedImageName] = useState<string | null>(
        null,
    );

    useEffect(() => {
        console.log(uploadedImageName);
    }, [uploadedImageName]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const { control, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!uploadedImageUrl) {
            toast.error("Please upload your resume.");
            return;
        }

        await createUser(
            values.name,
            values.email,
            values.phone,
            uploadedImageUrl,
        ).then(() => {
            toast.success("Successfully signed up!");
        });
    }
    return (
        <div className="flex h-full items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Signup for Your-HR</CardTitle>
                    <CardDescription>
                        Fill the details below to get shortlisted...
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                type="text"
                                                minLength={3}
                                                maxLength={30}
                                                placeholder="John Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                type="email"
                                                placeholder="johndoe123@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            {/* TODO: Add Regex for data validation */}
                                            <Input
                                                required
                                                type="text"
                                                placeholder="9812547819"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-3">
                                <FormLabel>Resume</FormLabel>
                            </div>
                            {uploadedImageName && (
                                <p className="truncate text-xs tracking-tight text-muted-foreground">
                                    {uploadedImageName}
                                </p>
                            )}
                            <UploadButton
                                className="ut-button:w-full ut-label:hidden ut-allowed-content:hidden ut-button:h-9 ut-button:bg-transparent ut-button:border ut-button:text-black"
                                endpoint="pdfUploader"
                                onClientUploadComplete={(res: any) => {
                                    // Do something with the response
                                    console.log("Files: ", res);
                                    setUploadedImageName(res[0].name);
                                    setUploadedImageUrl(res[0].url);
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                            <Button
                                type="submit"
                                size={"sm"}
                                variant={"yourHr"}
                                className="w-full"
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
