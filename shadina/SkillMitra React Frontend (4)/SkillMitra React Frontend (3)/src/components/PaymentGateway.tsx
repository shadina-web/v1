import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Alert, AlertDescription } from './ui/alert';
import {
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Shield,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentGatewayProps {
  amount: number;
  serviceName: string;
  providerName: string;
  onPaymentComplete?: (paymentId: string) => void;
  escrowEnabled?: boolean;
}

export function PaymentGateway({
  amount,
  serviceName,
  providerName,
  onPaymentComplete,
  escrowEnabled = true
}: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [processingProgress, setProcessingProgress] = useState(0);

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // UPI state
  const [upiId, setUpiId] = useState('');

  // Processing fee calculation
  const processingFee = amount * 0.02; // 2% processing fee
  const totalAmount = amount + processingFee;

  const handlePayment = async () => {
    // Validate based on payment method
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        toast.error('Please enter UPI ID');
        return;
      }
    }

    setStep('processing');

    // Simulate payment processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('success');
          const paymentId = 'PAY' + Date.now();
          onPaymentComplete?.(paymentId);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Rupay',
      processingTime: 'Instant'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'GPay, PhonePe, Paytm',
      processingTime: 'Instant'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: Wallet,
      description: 'SkillMitra Wallet',
      processingTime: 'Instant'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks',
      processingTime: '1-2 minutes'
    }
  ];

  if (step === 'processing') {
    return (
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="text-center space-y-6 py-8">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
              <Lock className="size-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Processing Payment</h3>
              <p className="text-sm text-muted-foreground">Please do not close this window</p>
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <Progress value={processingProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">{processingProgress}% Complete</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="size-4" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'success') {
    return (
      <Card className="border-2 border-green-500/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-6 py-8">
            <div className="size-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="size-12 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
              <p className="text-muted-foreground">₹{totalAmount.toFixed(2)} paid successfully</p>
            </div>
            {escrowEnabled && (
              <Alert>
                <Shield className="size-4" />
                <AlertDescription>
                  Your payment is held in escrow and will be released to {providerName} once the service is completed.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Transaction ID: PAY{Date.now()}</p>
              <p>Service: {serviceName}</p>
              <p>Provider: {providerName}</p>
            </div>
            <Button onClick={() => setStep('method')} className="w-full">
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Provider</span>
            <span className="font-medium">{providerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">₹{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Processing Fee (2%)</span>
            <span className="font-medium">₹{processingFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
          </div>
          {escrowEnabled && (
            <Alert>
              <Shield className="size-4" />
              <AlertDescription className="text-xs">
                <strong>Escrow Protection:</strong> Your payment will be held securely until service completion.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      {step === 'method' && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>Choose your preferred payment option</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="size-3 mr-1" />
                          {method.processingTime}
                        </Badge>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
            <Button onClick={() => setStep('details')} className="w-full mt-6">
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Details */}
      {step === 'details' && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              {paymentMethod === 'card' && 'Enter your card information'}
              {paymentMethod === 'upi' && 'Enter your UPI ID'}
              {paymentMethod === 'wallet' && 'Pay using your SkillMitra Wallet'}
              {paymentMethod === 'netbanking' && 'Select your bank'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethod === 'card' && (
              <>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input
                    placeholder="JOHN DOE"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input
                      type="password"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <>
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <Input
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <div className="text-center py-6">
                  <div className="size-48 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCode className="size-32 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Or scan QR code to pay</p>
                </div>
              </>
            )}

            {paymentMethod === 'wallet' && (
              <Alert>
                <Wallet className="size-4" />
                <AlertDescription>
                  <p className="font-medium mb-2">Available Balance: ₹5,000.00</p>
                  <p className="text-sm">₹{totalAmount.toFixed(2)} will be deducted from your wallet</p>
                </AlertDescription>
              </Alert>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-2">
                <Label>Select Bank</Label>
                <select className="w-full border rounded-md p-2">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-sm">
              <Lock className="size-4 text-primary" />
              <span className="text-muted-foreground">Your payment information is encrypted and secure</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('method')} className="flex-1">
                Back
              </Button>
              <Button onClick={handlePayment} className="flex-1">
                Pay ₹{totalAmount.toFixed(2)}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
