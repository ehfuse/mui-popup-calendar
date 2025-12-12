# Examples

## Table of Contents

-   [Basic Usage](#basic-usage)
    -   [Date Selection (DatePicker)](#date-selection-datepicker)
    -   [Time Selection (TimePicker)](#time-selection-timepicker)
    -   [Date + Time Selection (DateTimePicker)](#date--time-selection-datetimepicker)
    -   [Month Selection](#month-selection)
    -   [Year Selection](#year-selection)
-   [Change Events](#change-events)
    -   [Week Change Detection](#week-change-detection)
    -   [Month Change Detection](#month-change-detection)
    -   [Year Change Detection](#year-change-detection)
-   [Advanced Usage](#advanced-usage)
    -   [Date Range Restriction](#date-range-restriction)
    -   [Time Range Restriction](#time-range-restriction)
    -   [Holiday Display](#holiday-display)
    -   [autoApply Mode](#autoapply-mode)
    -   [Hide Footer](#hide-footer)
    -   [Inline Calendar](#inline-calendar)
    -   [Internationalization (i18n)](#internationalization-i18n)

---

## Basic Usage

### Date Selection (DatePicker)

The most basic date selection example.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";

function DatePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
            />
        </>
    );
}
```

---

### Time Selection (TimePicker)

Example for selecting time only.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { TimePicker } from "@ehfuse/mui-datetime-picker";
import type { TimeValue } from "@ehfuse/mui-datetime-picker";

function TimePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "09",
        minute: "00",
    });

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {`${timeValue.hour}:${timeValue.minute}`}
            </Button>
            <TimePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                value={timeValue}
                onChange={(hour, minute) => setTimeValue({ hour, minute })}
                format="HH:mm"
            />
        </>
    );
}
```

---

### Date + Time Selection (DateTimePicker)

Example for selecting both date and time.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DateTimePicker } from "@ehfuse/mui-datetime-picker";
import type { TimeValue } from "@ehfuse/mui-datetime-picker";

function DateTimePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "14",
        minute: "30",
        second: "00",
    });

    const displayText = selectedDate
        ? `${selectedDate.toLocaleDateString()} ${timeValue.hour}:${
              timeValue.minute
          }:${timeValue.second}`
        : "Select Date/Time";

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {displayText}
            </Button>
            <DateTimePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                timeValue={timeValue}
                onTimeChange={(hour, minute, second) =>
                    setTimeValue({ hour, minute, second })
                }
                timeFormat="HH:mm:ss"
            />
        </>
    );
}
```

---

### Month Selection

Example for selecting year and month only, without date.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";

function MonthPickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const handleMonthChange = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    };

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {`${selectedYear}/${selectedMonth + 1}`}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                monthOnly={true}
                onMonthChange={handleMonthChange}
            />
        </>
    );
}
```

---

### Year Selection

Example for selecting year only.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";

function YearPickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedYear}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                yearOnly={true}
                onYearChange={(year) => setSelectedYear(year)}
            />
        </>
    );
}
```

---

## Change Events

You can receive callbacks when the week/month/year changes during date selection.

### Week Change Detection

Receive a callback when the selected date's week changes.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";
import type { WeekInfo } from "@ehfuse/mui-datetime-picker";

function WeekChangeExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [weekInfo, setWeekInfo] = useState<WeekInfo | null>(null);

    const handleWeekChange = (
        weekOfMonth: number,
        startDate: Date,
        endDate: Date
    ) => {
        setWeekInfo({ weekOfMonth, startDate, endDate });
        console.log(
            `Week ${weekOfMonth}: ${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
        );
    };

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            {weekInfo && (
                <p>
                    Week {weekInfo.weekOfMonth} (
                    {weekInfo.startDate.toLocaleDateString()} ~{" "}
                    {weekInfo.endDate.toLocaleDateString()})
                </p>
            )}
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onWeekChange={handleWeekChange}
            />
        </>
    );
}
```

---

### Month Change Detection

Receive a callback when the selected date's month changes.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    onMonthChange={(year, month) => {
        console.log(`Changed to ${year}/${month}`);
    }}
/>
```

---

### Year Change Detection

Receive a callback when the selected date's year changes.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    onYearChange={(year) => {
        console.log(`Changed to ${year}`);
    }}
/>
```

---

## Advanced Usage

### Date Range Restriction

Restrict the selectable date range.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    minDate={new Date(2024, 0, 1)} // From January 1, 2024
    maxDate={new Date(2024, 11, 31)} // Until December 31, 2024
/>
```

---

### Time Range Restriction

Restrict the selectable time range.

```tsx
<TimePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    value={timeValue}
    onChange={(hour, minute) => setTimeValue({ hour, minute })}
    format="HH:mm"
    minTime="09:00" // From 9 AM
    maxTime="18:00" // Until 6 PM
    minuteStep={15} // Select in 15-minute intervals
/>
```

---

### Holiday Display

Display holidays in red.

```tsx
const holidays = [
    new Date(2024, 0, 1), // New Year's Day
    new Date(2024, 6, 4), // Independence Day
    new Date(2024, 10, 28), // Thanksgiving
    new Date(2024, 11, 25), // Christmas
];

<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    holidays={holidays}
/>;
```

---

### autoApply Mode

Mode where selection is applied immediately. Values are applied directly without a confirm button.

**DatePicker (date only)**

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    autoApply={true} // Closes immediately on date selection
/>
```

**DateTimePicker (date + time)**

```tsx
<DateTimePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    timeValue={timeValue}
    onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
    autoApply={true} // Apply immediately on selection
/>
```

> **Note**: When autoApply is true, a "Close" button is displayed instead of "Confirm/Cancel" buttons.

---

### Hide Footer

Hide the footer (button area).

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    showFooter={false} // Hide footer
    autoApply={true} // Recommended to use with autoApply
/>
```

---

### Inline Calendar

Display calendar directly without PopupCalendar.

```tsx
import { useState } from "react";
import { Box } from "@mui/material";
import { SimpleCalendar } from "@ehfuse/mui-datetime-picker";

function InlineCalendarExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <Box
            sx={{
                width: 300,
                height: 340,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showFooter={false}
            />
        </Box>
    );
}
```

---

### Inline Date + Time Calendar

Inline calendar with time selection included.

```tsx
import { useState } from "react";
import { Box } from "@mui/material";
import { SimpleCalendar } from "@ehfuse/mui-datetime-picker";
import type { TimeValue } from "@ehfuse/mui-datetime-picker";

function InlineDateTimeExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "10",
        minute: "30",
        second: "00",
    });

    return (
        <Box
            sx={{
                width: 420,
                height: 380,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showTimePicker={true}
                timeValue={timeValue}
                onTimeChange={(hour, minute, second) =>
                    setTimeValue({
                        hour: String(hour).padStart(2, "0"),
                        minute: String(minute).padStart(2, "0"),
                        second:
                            second !== undefined
                                ? String(second).padStart(2, "0")
                                : "00",
                    })
                }
                timeFormat="HH:mm:ss"
                autoApply={true}
                showFooter={false}
            />
        </Box>
    );
}
```

---

### Internationalization (i18n)

Display the calendar in various languages.

#### Simple String Key (Recommended)

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-datetime-picker";

function SimpleLocaleExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale="en" // Simple string key!
            />
        </>
    );
}
```

#### Dynamic Locale Switching

```tsx
import { useState, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { DatePicker, LocaleKey } from "@ehfuse/mui-datetime-picker";

function DynamicLocaleExample() {
    const [open, setOpen] = useState(false);
    const [locale, setLocale] = useState<LocaleKey>("en");
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button onClick={() => setLocale("en")}>English</Button>
                <Button onClick={() => setLocale("ja")}>日本語</Button>
                <Button onClick={() => setLocale("zhCN")}>中文</Button>
                <Button onClick={() => setLocale("ko")}>한국어</Button>
            </Stack>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale={locale}
            />
        </>
    );
}
```

#### Partial Text Overrides

```tsx
// Override only button texts based on English locale
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    locale="en"
    texts={{
        confirm: "OK",
        cancel: "Back",
        today: "Now",
    }}
/>
```

#### Creating Custom Locale

```tsx
import type { CalendarLocale } from "@ehfuse/mui-datetime-picker";

// Fully custom locale
const myLocale: CalendarLocale = {
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    today: "Go to Today",
    confirm: "Select",
    cancel: "Go Back",
    close: "Close",
};

<DatePicker
    locale={myLocale}
    ...
/>
```

---

## Related Documents

-   [Getting Started](./getting-started.md) - Installation and quick start
-   [API Reference](./api.md) - All Props and type definitions
