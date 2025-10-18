import { useState } from 'react';
import { Offer, Request } from '../lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Mail, MapPin, Star, Heart, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';
import { toast } from 'sonner@2.0.3';

interface DetailDialogProps {
  item: Offer | Request | null;
  type: 'offer' | 'request';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DetailDialog({ item, type, open, onOpenChange }: DetailDialogProps) {
  const [showContact, setShowContact] = useState(false);
  const [isExpressingInterest, setIsExpressingInterest] = useState(false);

  if (!item) return null;

  const isOffer = type === 'offer';
  const offer = isOffer ? (item as Offer) : null;
  const request = !isOffer ? (item as Request) : null;

  const handleExpressInterest = async () => {
    setIsExpressingInterest(true);
    try {
      await api.createMatch({
        offerId: offer?.id,
        requestId: request?.id,
        fromUserId: 'current-user', // In real app, this would be current user ID
        toUserId: item.userId,
        status: 'pending'
      });
      toast.success('Interest expressed successfully!', {
        description: 'The person will be notified of your interest.'
      });
    } catch (error) {
      toast.error('Failed to express interest', {
        description: 'Please try again later.'
      });
    } finally {
      setIsExpressingInterest(false);
    }
  };

  const handleContact = (method: 'phone' | 'email') => {
    if (!showContact) {
      setShowContact(true);
      return;
    }

    if (method === 'phone' && item.phone) {
      window.location.href = `tel:${item.phone}`;
    } else if (method === 'email' && item.email) {
      window.location.href = `mailto:${item.email}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {isOffer ? offer?.skill : request?.service}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {item.userName}
              </DialogDescription>
            </div>
            {offer?.rating && (
              <Badge variant="secondary" className="gap-1 shrink-0 bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30">
                <Star className="size-3 fill-secondary text-secondary" />
                {offer.rating.toFixed(1)}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Village */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" />
            <span>{item.village}</span>
          </div>

          {/* Description */}
          <div>
            <h4 className="mb-2">Description</h4>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-3">Contact Information</h4>
            <div className="space-y-2">
              {item.phone && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 text-muted-foreground" />
                    <span>
                      {showContact ? item.phone : 'Click to reveal phone number'}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={showContact ? 'default' : 'outline'}
                    onClick={() => handleContact('phone')}
                  >
                    {showContact ? 'Call' : 'Show'}
                  </Button>
                </div>
              )}

              {item.email && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-muted-foreground" />
                    <span>
                      {showContact ? item.email : 'Click to reveal email'}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={showContact ? 'default' : 'outline'}
                    onClick={() => handleContact('email')}
                  >
                    {showContact ? 'Email' : 'Show'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={handleExpressInterest}
              disabled={isExpressingInterest}
            >
              <Heart className="size-4" />
              Express Interest
            </Button>
            {showContact && (
              <Button
                variant="outline"
                className="flex-1 gap-2 border-2 border-accent/50 hover:bg-accent/10"
                onClick={() => toast.success('Match request sent!')}
              >
                <CheckCircle className="size-4" />
                Request Match
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}