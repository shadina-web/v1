import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Clock, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

interface WeekSchedule {
  [key: string]: DaySchedule;
}

export function AvailabilityManager() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>({
    monday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    tuesday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    wednesday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    thursday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    friday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
    saturday: { enabled: true, slots: [{ start: '10:00', end: '16:00' }] },
    sunday: { enabled: false, slots: [] }
  });

  const timeOptions = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const handleDayToggle = (day: string) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, idx) => 
          idx === 0 ? { ...slot, [type]: value } : slot
        )
      }
    }));
  };

  const handleSave = () => {
    toast.success('Availability updated successfully!');
  };

  const getDayStats = () => {
    const enabledDays = Object.values(weekSchedule).filter(d => d.enabled).length;
    const totalHours = Object.values(weekSchedule).reduce((sum, day) => {
      if (!day.enabled) return sum;
      return sum + day.slots.reduce((slotSum, slot) => {
        const start = parseInt(slot.start.split(':')[0]);
        const end = parseInt(slot.end.split(':')[0]);
        return slotSum + (end - start);
      }, 0);
    }, 0);
    return { enabledDays, totalHours };
  };

  const stats = getDayStats();

  return (
    <div className="space-y-6">
      {/* Availability Status */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Availability Status</CardTitle>
              <CardDescription>Control when you're available to take jobs</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isAvailable ? 'default' : 'secondary'} className="text-sm">
                {isAvailable ? (
                  <>
                    <CheckCircle className="size-3 mr-1" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="size-3 mr-1" />
                    Unavailable
                  </>
                )}
              </Badge>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.enabledDays}</p>
              <p className="text-sm text-muted-foreground">Working Days/Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{stats.totalHours}</p>
              <p className="text-sm text-muted-foreground">Total Hours/Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                {Math.round(stats.totalHours / stats.enabledDays)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Hours/Day</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>Set your regular working hours for each day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(weekSchedule).map(([day, schedule]) => (
            <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3 w-32">
                <Switch
                  checked={schedule.enabled}
                  onCheckedChange={() => handleDayToggle(day)}
                />
                <span className="font-medium capitalize">{day}</span>
              </div>
              
              {schedule.enabled ? (
                <div className="flex items-center gap-2 flex-1">
                  <Select
                    value={schedule.slots[0]?.start || '09:00'}
                    onValueChange={(value: string) => handleTimeChange(day, 'start', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span className="text-muted-foreground">to</span>
                  
                  <Select
                    value={schedule.slots[0]?.end || '18:00'}
                    onValueChange={(value: string) => handleTimeChange(day, 'end', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Badge variant="outline" className="ml-auto">
                    {(() => {
                      const start = parseInt(schedule.slots[0]?.start.split(':')[0] || '0');
                      const end = parseInt(schedule.slots[0]?.end.split(':')[0] || '0');
                      return `${end - start} hours`;
                    })()}
                  </Badge>
                </div>
              ) : (
                <span className="text-muted-foreground">Day off</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Days Off Calendar */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5" />
            Days Off & Holidays
          </CardTitle>
          <CardDescription>Mark specific dates when you're unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates: Date[] | undefined) => setSelectedDates(dates || [])}
            disabled={(date: Date) => date < new Date()}
            className="rounded-md border"
          />
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              {selectedDates.length} day(s) marked as unavailable
            </p>
            {selectedDates.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedDates.slice(0, 5).map((date, idx) => (
                  <Badge key={idx} variant="secondary">
                    {date.toLocaleDateString()}
                  </Badge>
                ))}
                {selectedDates.length > 5 && (
                  <Badge variant="secondary">+{selectedDates.length - 5} more</Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          Save Availability
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setWeekSchedule({
              monday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
              tuesday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
              wednesday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
              thursday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
              friday: { enabled: true, slots: [{ start: '09:00', end: '18:00' }] },
              saturday: { enabled: true, slots: [{ start: '10:00', end: '16:00' }] },
              sunday: { enabled: false, slots: [] }
            });
            setSelectedDates([]);
            toast.success('Reset to default schedule');
          }}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
