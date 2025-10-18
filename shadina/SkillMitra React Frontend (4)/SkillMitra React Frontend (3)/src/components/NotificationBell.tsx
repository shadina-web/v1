import { useState, useEffect } from 'react';
import { Bell, Check, X, MessageSquare, Briefcase, Star, DollarSign, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { ScrollArea } from './ui/scroll-area';

export interface Notification {
  id: string;
  type: 'message' | 'offer' | 'request' | 'review' | 'payment' | 'match';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'Rajesh Kumar sent you a message about Plumbing service',
      time: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'offer',
      title: 'Application Received',
      message: 'Someone applied for your Carpentry offer',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star review from Priya Singh',
      time: '3 hours ago',
      read: false
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Received',
      message: '₹2,500 payment received for Electrical work',
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'match',
      title: 'New Match',
      message: 'Your skills match with a new service request',
      time: '2 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    const iconMap = {
      message: MessageSquare,
      offer: Briefcase,
      request: Briefcase,
      review: Star,
      payment: DollarSign,
      match: Users
    };
    return iconMap[type];
  };

  const getNotificationColor = (type: Notification['type']) => {
    const colorMap = {
      message: 'text-blue-500',
      offer: 'text-green-500',
      request: 'text-orange-500',
      review: 'text-yellow-500',
      payment: 'text-green-600',
      match: 'text-purple-500'
    };
    return colorMap[type];
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <Check className="size-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Bell className="size-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`size-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {!notification.read && (
                            <div className="size-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="size-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm">
              View All Notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
