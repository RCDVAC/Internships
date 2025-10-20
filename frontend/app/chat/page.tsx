"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Users, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  userId: string
  username: string
  text: string
  timestamp: Date
  color: string
}

interface User {
  id: string
  username: string
  color: string
  status: "online" | "away"
}

const USER_COLORS = [
  "oklch(0.65 0.2 250)", // Blue
  "oklch(0.65 0.22 200)", // Teal
  "oklch(0.7 0.2 150)", // Green
  "oklch(0.7 0.22 60)", // Yellow
  "oklch(0.65 0.2 30)", // Orange
  "oklch(0.65 0.22 330)", // Pink
  "oklch(0.65 0.2 280)", // Purple
]

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [isJoining, setIsJoining] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const connectWebSocket = (username: string) => {
    // In production, replace with your WebSocket server URL
    // For demo purposes, we'll simulate WebSocket behavior
    const userId = Math.random().toString(36).substring(7)
    const userColor = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]

    const user: User = {
      id: userId,
      username,
      color: userColor,
      status: "online",
    }

    setCurrentUser(user)
    setIsConnected(true)
    setIsJoining(false)

    // Simulate initial users
    const initialUsers: User[] = [
      user,
      {
        id: "user1",
        username: "Sarah Chen",
        color: USER_COLORS[0],
        status: "online",
      },
      {
        id: "user2",
        username: "Mike Johnson",
        color: USER_COLORS[1],
        status: "online",
      },
      {
        id: "user3",
        username: "Emma Davis",
        color: USER_COLORS[2],
        status: "away",
      },
    ]
    setUsers(initialUsers)

    // Add welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      userId: "system",
      username: "System",
      text: `${username} joined the chat`,
      timestamp: new Date(),
      color: "oklch(0.5 0.02 250)",
    }
    setMessages([welcomeMessage])

    // Simulate receiving messages
    setTimeout(() => {
      const msg: Message = {
        id: Date.now().toString(),
        userId: "user1",
        username: "Sarah Chen",
        text: "Hey everyone! Welcome to the Softlytic chat room!",
        timestamp: new Date(),
        color: USER_COLORS[0],
      }
      setMessages((prev) => [...prev, msg])
    }, 1000)

    // In production, you would connect to a real WebSocket server:
    /*
    try {
      const ws = new WebSocket('ws://your-websocket-server.com')
      
      ws.onopen = () => {
        console.log('[v0] WebSocket connected')
        setIsConnected(true)
        ws.send(JSON.stringify({ type: 'join', username, userId, color: userColor }))
      }
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.type === 'message') {
          const newMessage: Message = {
            id: data.id,
            userId: data.userId,
            username: data.username,
            text: data.text,
            timestamp: new Date(data.timestamp),
            color: data.color
          }
          setMessages(prev => [...prev, newMessage])
        } else if (data.type === 'users') {
          setUsers(data.users)
        }
      }
      
      ws.onerror = (error) => {
        console.error('[v0] WebSocket error:', error)
      }
      
      ws.onclose = () => {
        console.log('[v0] WebSocket disconnected')
        setIsConnected(false)
      }
      
      wsRef.current = ws
    } catch (error) {
      console.error('[v0] Failed to connect to WebSocket:', error)
    }
    */
  }

  const handleJoinChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      connectWebSocket(username.trim())
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputMessage.trim() || !currentUser) return

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: inputMessage.trim(),
      timestamp: new Date(),
      color: currentUser.color,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // In production, send to WebSocket server:
    // wsRef.current?.send(JSON.stringify({ type: 'message', ...newMessage }))

    // Simulate a response
    setTimeout(
      () => {
        const responses = [
          "That's a great point!",
          "I totally agree with you.",
          "Has anyone tried the new CV maker feature?",
          "The job listings here are amazing!",
          "Thanks for sharing that!",
        ]
        const randomUser = users.filter((u) => u.id !== currentUser.id)[Math.floor(Math.random() * (users.length - 1))]
        if (randomUser) {
          const response: Message = {
            id: Date.now().toString(),
            userId: randomUser.id,
            username: randomUser.username,
            text: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date(),
            color: randomUser.color,
          }
          setMessages((prev) => [...prev, response])
        }
      },
      2000 + Math.random() * 3000,
    )
  }

  useEffect(() => {
    return () => {
      // Cleanup WebSocket connection on unmount
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  if (isJoining) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center px-4">
          <Card className="w-full p-8">
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-foreground">Join Chat Room</h1>
              <p className="text-sm text-muted-foreground">Connect with other job seekers and professionals</p>
            </div>

            <form onSubmit={handleJoinChat} className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                  Your Name
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" disabled={!username.trim()}>
                Join Chat Room
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> This is a demo chat room. In production, this would connect to a real WebSocket
                server for live messaging.
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chat Room</h1>
            <p className="mt-1 text-sm text-muted-foreground">Connect with the Softlytic community in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Circle
              className={`h-3 w-3 ${isConnected ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"}`}
            />
            <span className="text-sm text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Messages Area */}
          <Card className="flex flex-col">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold text-foreground">General Chat</h2>
              <p className="text-xs text-muted-foreground">{users.length} members online</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 300px)" }}>
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.userId === "system" ? "justify-center" : ""}`}>
                  {message.userId !== "system" && (
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback style={{ backgroundColor: message.color }}>
                        {message.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`flex-1 ${message.userId === "system" ? "text-center" : ""}`}>
                    {message.userId === "system" ? (
                      <p className="text-xs italic text-muted-foreground">{message.text}</p>
                    ) : (
                      <>
                        <div className="mb-1 flex items-baseline gap-2">
                          <span className="font-semibold text-foreground" style={{ color: message.color }}>
                            {message.username}
                          </span>
                          {message.userId === currentUser?.id && (
                            <Badge variant="secondary" className="text-xs">
                              You
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{message.text}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Users Sidebar */}
          <Card className="p-4">
            <h3 className="mb-4 font-semibold text-foreground">Online Users ({users.length})</h3>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback style={{ backgroundColor: user.color }}>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{user.username}</p>
                      {user.id === currentUser?.id && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Circle
                        className={`h-2 w-2 ${user.status === "online" ? "fill-green-500 text-green-500" : "fill-yellow-500 text-yellow-500"}`}
                      />
                      <span className="text-xs text-muted-foreground capitalize">{user.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
