# Getting Started

A MUI-based popup calendar and time picker component library.

## Installation

```bash
npm install @ehfuse/mui-datetime-picker
```

### Peer Dependencies

The following packages are required:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Quick Start

### DatePicker (Date Only)

Use this component when you only need to select a date.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
        </>
    );
}
```

### DateTimePicker (Date + Time)

Use this component when you need to select both date and time.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DateTimePicker } from "@ehfuse/mui-datetime-picker";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState({ hour: "09", minute: "00" });

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {selectedDate?.toLocaleDateString() ?? "Select Date/Time"}{" "}
                {timeValue.hour}:{timeValue.minute}
            </Button>
            <DateTimePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                timeValue={timeValue}
                onTimeChange={(h, m) => setTimeValue({ hour: h, minute: m })}
            />
        </>
    );
}
```

### TimePicker (Time Only)

Use this component when you only need to select time.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { TimePicker } from "@ehfuse/mui-datetime-picker";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [timeValue, setTimeValue] = useState({ hour: "09", minute: "00" });

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {timeValue.hour}:{timeValue.minute}
            </Button>
            <TimePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                value={timeValue}
                onChange={(h, m) => setTimeValue({ hour: h, minute: m })}
                format="HH:mm"
            />
        </>
    );
}
```

### SimpleCalendar (Inline Calendar)

Use this to display an inline calendar.

```tsx
import { useState } from "react";
import { SimpleCalendar } from "@ehfuse/mui-datetime-picker";

function App() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <div style={{ width: 300, height: 340 }}>
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showFooter={false}
            />
        </div>
    );
}
```

## Component Selection Guide

| Component        | Use Case                  |
| ---------------- | ------------------------- |
| `DatePicker`     | Select date only          |
| `TimePicker`     | Select time only          |
| `DateTimePicker` | Select both date and time |
| `SimpleCalendar` | Display inline calendar   |

## Time Format

4 time formats are supported:

| Format     | Description       | Example  |
| ---------- | ----------------- | -------- |
| `HH:mm`    | 24-hour           | 14:30    |
| `HH:mm:ss` | 24-hour + seconds | 14:30:45 |
| `hh:mm`    | 12-hour           | 02:30    |
| `hh:mm:ss` | 12-hour + seconds | 02:30:45 |

---

## Related Documents

-   [API Reference](./api.md) - All Props and type definitions
-   [Examples](./example.md) - Various usage examples
