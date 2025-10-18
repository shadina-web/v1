import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { Send, Search, MoreVertical, Phone, Video, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      userId: '101',
      userName: 'Rajesh Kumar',
      lastMessage: 'Yes, I can help with the plumbing work',
      timestamp: '10:30 AM',
      unreadCount: 2,
      online: true
    },
    {
      id: '2',
      userId: '102',
      userName: 'Priya Singh',
      lastMessage: 'Thank you for the excellent service!',
      timestamp: 'Yesterday',
      unreadCount: 0,
      online: false
    },
    {
      id: '3',
      userId: '103',
      userName: 'Amit Patel',
      lastMessage: 'When can you start the carpentry work?',
      timestamp: '2 days ago',
      unreadCount: 1,
      online: true
    },
    {
      id: '4',
      userId: '104',
      userName: 'Sneha Reddy',
      lastMessage: 'Sounds good, see you tomorrow',
      timestamp: '3 days ago',
      unreadCount: 0,
      online: false
    }
  ]);

  const [messages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: 'm1',
        senderId: '101',
        text: 'Hi, I saw your plumbing service offer. Are you available this week?',
        timestamp: '10:15 AM',
        read: true
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Hello! Yes, I have availability from Wednesday onwards. What kind of work do you need?',
        timestamp: '10:20 AM',
        read: true
      },
      {
        id: 'm3',
        senderId: '101',
        text: 'I need help fixing a leaking pipe in the kitchen and installing a new faucet.',
        timestamp: '10:25 AM',
        read: true
      },
      {
        id: 'm4',
        senderId: 'me',
        text: 'I can definitely help with that. The job should take about 2-3 hours.',
        timestamp: '10:28 AM',
        read: true
      },
      {
        id: 'm5',
        senderId: '101',
        text: 'Yes, I can help with the plumbing work',
        timestamp: '10:30 AM',
        read: false
      }
    ]
  });

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const currentMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Send message logic here
    setMessageText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rustic-brown to-rustic-sienna bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-rustic-brown-medium">Chat with service providers and clients</p>
      </div>

      <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
        <div className="grid md:grid-cols-[350px_1fr] h-[600px]">
          {/* Conversations List */}
          <div className={`border-r border-rustic-tan ${selectedConversation && 'hidden md:block'}`}>
            <CardHeader className="border-b border-rustic-tan">
              <div className="relative">
                <Search className="absolute left-3 top-3 size-4 text-rustic-brown-medium" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-rustic-tan"
                />
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(600px-80px)]">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-sm text-rustic-brown-medium">No conversations found</p>
                </div>
              ) : (
                <div className="divide-y divide-rustic-tan">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 flex gap-3 items-start hover:bg-rustic-wheat/50 transition-colors text-left ${
                        selectedConversation === conv.id ? 'bg-rustic-wheat' : ''
                      }`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {conv.userName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 size-3 bg-rustic-green rounded-full border-2 border-rustic-linen" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm truncate text-rustic-brown-dark">{conv.userName}</p>
                          <span className="text-xs text-rustic-brown-medium flex-shrink-0">
                            {conv.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-rustic-brown-medium truncate">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <Badge variant="default" className="size-5 p-0 flex items-center justify-center text-xs bg-rustic-green">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedConversation && selectedConv ? (
            <div className="flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-rustic-tan p-4 flex items-center justify-between bg-rustic-wheat/30">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-rustic-brown/10"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Avatar>
                    <AvatarFallback>
                      {selectedConv.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-rustic-brown-dark">{selectedConv.userName}</p>
                    <p className="text-xs text-rustic-brown-medium">
                      {selectedConv.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="hover:bg-rustic-green/10 text-rustic-green">
                    <Phone className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-rustic-sky-blue/10 text-rustic-sky-blue">
                    <Video className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-rustic-brown/10">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === 'me'
                            ? 'bg-rustic-brown text-rustic-cream'
                            : 'bg-rustic-wheat'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === 'me'
                              ? 'text-rustic-cream/70'
                              : 'text-rustic-brown-medium'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-rustic-tan p-4 bg-rustic-wheat/20">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="border-rustic-tan"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-rustic-green hover:bg-rustic-green-dark">
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center p-8 text-center">
              <div className="size-16 rounded-full bg-rustic-wheat flex items-center justify-center mb-4">
                <Send className="size-8 text-rustic-brown-medium" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-rustic-brown-dark">Select a conversation</h3>
              <p className="text-sm text-rustic-brown-medium">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
