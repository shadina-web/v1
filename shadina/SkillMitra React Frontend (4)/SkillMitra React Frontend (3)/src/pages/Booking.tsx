import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

export function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      serviceName: 'Plumbing Service',
      providerName: 'Rajesh Kumar',
      date: new Date(2025, 9, 20),
      time: '10:00 AM',
      status: 'upcoming',
      location: 'Pune, Maharashtra'
    },
    {
      id: '2',
      serviceName: 'Electrical Work',
      providerName: 'Amit Patel',
      date: new Date(2025, 9, 18),
      time: '2:00 PM',
      status: 'completed',
      location: 'Mumbai, Maharashtra'
    }
  ]);

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: false },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: false },
    { time: '6:00 PM', available: true }
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    toast.success('Booking confirmed! You will receive a confirmation email shortly.');
    setSelectedTime('');
    setNotes('');
  };

  const getStatusBadge = (status: Booking['status']) => {
    const variants = {
      upcoming: 'default' as const,
      completed: 'secondary' as const,
      cancelled: 'destructive' as const
    };
    const customClasses = {
      upcoming: 'bg-rustic-green hover:bg-rustic-green-dark',
      completed: 'bg-rustic-brown hover:bg-rustic-brown-dark',
      cancelled: ''
    };
    return <Badge variant={variants[status]} className={customClasses[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rustic-brown to-rustic-sienna bg-clip-text text-transparent">
          Bookings & Schedule
        </h1>
        <p className="text-rustic-brown-medium">Manage your appointments and availability</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* New Booking */}
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader>
            <CardTitle className="text-rustic-brown-dark">Book an Appointment</CardTitle>
            <CardDescription className="text-rustic-brown-medium">Select date and time for your service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calendar */}
            <div>
              <Label className="flex items-center gap-2 mb-3 text-rustic-brown-dark">
                <CalendarIcon className="size-4" />
                Select Date
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date: Date) => date < new Date()}
                className="rounded-md border border-rustic-tan w-full"
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <Label className="flex items-center gap-2 mb-3 text-rustic-brown-dark">
                  <Clock className="size-4" />
                  Select Time Slot
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? 'default' : 'outline'}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`text-sm ${selectedTime === slot.time ? 'bg-rustic-green hover:bg-rustic-green-dark' : 'border-rustic-tan hover:bg-rustic-wheat'}`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <Label className="text-rustic-brown-dark">Additional Notes (Optional)</Label>
              <Textarea
                placeholder="Any specific requirements or instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="border-rustic-tan"
              />
            </div>

            <Button 
              onClick={handleBooking} 
              className="w-full bg-rustic-green hover:bg-rustic-green-dark"
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader>
            <CardTitle className="text-rustic-brown-dark">My Bookings</CardTitle>
            <CardDescription className="text-rustic-brown-medium">View and manage your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="size-12 text-rustic-brown-medium mx-auto mb-2" />
                  <p className="text-sm text-rustic-brown-medium">No bookings yet</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id} className="border-rustic-tan bg-rustic-wheat">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-rustic-brown-dark">{booking.serviceName}</h3>
                            <p className="text-sm text-rustic-brown-medium flex items-center gap-1 mt-1">
                              <User className="size-3" />
                              {booking.providerName}
                            </p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-rustic-brown-medium">
                            <CalendarIcon className="size-4" />
                            {booking.date.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-rustic-brown-medium">
                            <Clock className="size-4" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-2 text-rustic-brown-medium">
                            <MapPin className="size-4" />
                            {booking.location}
                          </div>
                        </div>
                        {booking.status === 'upcoming' && (
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1 border-rustic-tan hover:bg-rustic-wheat">
                              Reschedule
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        )}
                        {booking.status === 'completed' && (
                          <Button variant="outline" size="sm" className="w-full border-rustic-green text-rustic-green hover:bg-rustic-green/10">
                            <CheckCircle className="size-4 mr-2" />
                            Write Review
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Management */}
      <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
        <CardHeader>
          <CardTitle className="text-rustic-brown-dark">Manage Your Availability</CardTitle>
          <CardDescription className="text-rustic-brown-medium">Set your working hours and days off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-rustic-brown-dark">Weekly Schedule</h3>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-rustic-brown-medium">{day}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-rustic-tan">9:00 AM - 6:00 PM</Button>
                    <Button variant="ghost" size="sm" className="text-rustic-green hover:bg-rustic-green/10">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-rustic-brown-dark">Days Off</h3>
              <Calendar
                mode="multiple"
                className="rounded-md border border-rustic-tan"
              />
              <Button variant="outline" className="w-full border-rustic-green text-rustic-green hover:bg-rustic-green/10">
                Save Availability
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
