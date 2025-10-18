"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="flex h-96 w-80 flex-col rounded-lg border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">Chat Support</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4">
            <p className="text-sm text-muted-foreground">
              Chat support coming soon! We're here to help you find your dream internship.
            </p>
          </div>
        </div>
      ) : (
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  )
}
