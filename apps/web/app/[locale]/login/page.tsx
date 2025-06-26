"use client";

import { useLocale } from "@/lib/locale-context";
import { Locale } from "@/types/locale";
import { Button, Card, Divider, Form, Input } from "@heroui/react";
import { FormEvent } from "react";

export default async function Login() {
  const { locale, dict } = useLocale();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    const auth = await res.json();
    if (res.ok) {
      console.log(auth);
    } else {
      console.log(auth);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Form className="w-full max-w-md" onSubmit={onSubmit}>
        <Card className="flex flex-col gap-6 max-w-lg w-full p-10">
          <div className="w-full text-center flex flex-col gap-2 items-center">
            <h1 className="text-3xl">YATKWAT</h1>
            <h2 color="primary">{dict.login["description"]}</h2>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
            />
            <Input
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <Button color="primary" type="submit">
            {dict.login["login"]}
          </Button>
          <Divider />
          <span className="text-center">
            {dict.login["alternate-login-description"]}
          </span>
        </Card>
      </Form>
    </div>
  );
}
