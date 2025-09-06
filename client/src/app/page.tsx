"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function App() {
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket(process.env.NODE_ENV === "development" ? "ws://localhost:8080" : "wss://daishiws.snehasish.xyz");
    socket.onopen = () => console.log("[NWS] Connected to WS");
    socket.onmessage = (e) => console.log("[NWS] Received Message from Server:", e.data);
    socket.onclose = () => console.log("[NWS] Disconnected from WS");
    socket.onerror = (e) => console.log("[NWS] WS Error:", e);
    setWS(socket);

    return () => {
      socket.close();
    };
  }, []);

  const send = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      console.log("[NWS] Message Sent:", message);
      setMessage("");
    }
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>daishi</CardTitle>
          <CardDescription>
            display any message on daishi &mdash; an 8x8 LED dotmatrix powered by an arduino UNO on <Link href="https://snehasish.xyz" target="_blank" className="underline cursor-pointer">snehasish</Link>&apos;s desk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">message *</Label>
                <Input
                  id="message"
                  type="text"
                  placeholder="i love gracie abrams"
                  required
                  value={message}
                  onInput={(e) => setMessage((e.target as HTMLInputElement).value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={send} disabled={!message || message.length > 32}>
            send to daishi
          </Button>
        </CardFooter>
      </Card>

      <div className="w-full flex flex-row justify-center items-center gap-5 p-5">
        <span>
          <Link href="https://github.com/snehasishcodes/daishi" target="_blank" className="underline cursor-pointer">source</Link>
        </span>
        <span>&bull;</span>
        <span>
          by <Link href="https://snehasish.xyz" target="_blank" className="underline cursor-pointer">snehasish</Link>
        </span>
      </div>
    </main>
  )
}