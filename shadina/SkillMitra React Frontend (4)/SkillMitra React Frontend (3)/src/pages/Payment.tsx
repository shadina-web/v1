import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Smartphone, 
  CheckCircle, 
  Clock, 
  XCircle,
  Download,
  Eye,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'received' | 'paid';
  amount: number;
  serviceName: string;
  userName: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [amount, setAmount] = useState('');

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      type: 'received',
      amount: 2500,
      serviceName: 'Electrical Work',
      userName: 'Priya Singh',
      date: '2025-10-12',
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 'TXN002',
      type: 'paid',
      amount: 1800,
      serviceName: 'Carpentry Service',
      userName: 'Rajesh Kumar',
      date: '2025-10-10',
      status: 'completed',
      paymentMethod: 'Card'
    },
    {
      id: 'TXN003',
      type: 'received',
      amount: 3200,
      serviceName: 'Plumbing Repair',
      userName: 'Amit Patel',
      date: '2025-10-08',
      status: 'completed',
      paymentMethod: 'Wallet'
    },
    {
      id: 'TXN004',
      type: 'paid',
      amount: 1500,
      serviceName: 'Painting Work',
      userName: 'Sneha Reddy',
      date: '2025-10-05',
      status: 'pending',
      paymentMethod: 'Bank Transfer'
    }
  ]);

  const totalReceived = transactions
    .filter(t => t.type === 'received' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPaid = transactions
    .filter(t => t.type === 'paid' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalReceived - totalPaid;

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    toast.success('Payment processed successfully!');
    setAmount('');
  };

  const getStatusIcon = (status: Transaction['status']) => {
    const icons = {
      completed: <CheckCircle className="size-4 text-green-500" />,
      pending: <Clock className="size-4 text-yellow-500" />,
      failed: <XCircle className="size-4 text-red-500" />
    };
    return icons[status];
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const variants = {
      completed: 'default' as const,
      pending: 'secondary' as const,
      failed: 'destructive' as const
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rustic-brown to-rustic-sienna bg-clip-text text-transparent">
          Payments & Transactions
        </h1>
        <p className="text-rustic-brown-medium">Manage your payments and view transaction history</p>
      </div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md hover:border-rustic-green/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Received
              </CardTitle>
              <TrendingUp className="size-4 text-rustic-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-green">₹{totalReceived.toLocaleString()}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">From completed services</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md hover:border-rustic-sienna/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Paid
              </CardTitle>
              <DollarSign className="size-4 text-rustic-sienna" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-sienna">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">For services received</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md hover:border-rustic-brown/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Balance
              </CardTitle>
              <Wallet className="size-4 text-rustic-brown" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown">₹{balance.toLocaleString()}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">Available to withdraw</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md hover:border-rustic-sky-blue/50 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Transactions
              </CardTitle>
              <CheckCircle className="size-4 text-rustic-sky-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{transactions.length}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">Total this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-rustic-brown-dark">Make a Payment</CardTitle>
            <CardDescription className="text-rustic-brown-medium">Process a new payment transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-rustic-brown-dark">Amount (₹)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-rustic-tan"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-rustic-brown-dark">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 border border-rustic-tan rounded-lg p-3 cursor-pointer hover:bg-rustic-wheat/50">
                  <RadioGroupItem value="card" id="card" className="accent-rustic-green" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2 text-rustic-brown-dark">
                    <CreditCard className="size-4" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-rustic-tan rounded-lg p-3 cursor-pointer hover:bg-rustic-wheat/50">
                  <RadioGroupItem value="upi" id="upi" className="accent-rustic-green" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer flex items-center gap-2 text-rustic-brown-dark">
                    <Smartphone className="size-4" />
                    UPI
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-rustic-tan rounded-lg p-3 cursor-pointer hover:bg-rustic-wheat/50">
                  <RadioGroupItem value="wallet" id="wallet" className="accent-rustic-green" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer flex items-center gap-2 text-rustic-brown-dark">
                    <Wallet className="size-4" />
                    Wallet
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-rustic-tan rounded-lg p-3 cursor-pointer hover:bg-rustic-wheat/50">
                  <RadioGroupItem value="bank" id="bank" className="accent-rustic-green" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center gap-2 text-rustic-brown-dark">
                    <Building2 className="size-4" />
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-rustic-tan" />

            <Button onClick={handlePayment} className="w-full bg-rustic-green hover:bg-rustic-green-dark">
              Process Payment
            </Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-rustic-brown-dark">Transaction History</CardTitle>
                <CardDescription className="text-rustic-brown-medium">All your payment transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-rustic-tan hover:bg-rustic-wheat">
                <Download className="size-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="border-rustic-tan bg-rustic-wheat">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <div className={`size-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'received' 
                            ? 'bg-rustic-green/10 text-rustic-green' 
                            : 'bg-rustic-sienna/10 text-rustic-sienna'
                        }`}>
                          <DollarSign className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <p className="font-medium text-sm text-rustic-brown-dark">{transaction.serviceName}</p>
                              <p className="text-xs text-rustic-brown-medium">
                                {transaction.type === 'received' ? 'From' : 'To'} {transaction.userName}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                transaction.type === 'received' 
                                  ? 'text-rustic-green' 
                                  : 'text-rustic-sienna'
                              }`}>
                                {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                              </p>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-rustic-brown-medium mt-2">
                            <span className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              {transaction.status}
                            </span>
                            <span>{transaction.paymentMethod}</span>
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="text-rustic-brown">ID: {transaction.id}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2 hover:bg-rustic-brown/10">
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
