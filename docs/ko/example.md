# 예제

## 목차

-   [기본 사용법](#기본-사용법)
    -   [날짜 선택 (DatePicker)](#날짜-선택-datepicker)
    -   [시간 선택 (TimePicker)](#시간-선택-timepicker)
    -   [날짜+시간 선택 (DateTimePicker)](#날짜시간-선택-datetimepicker)
    -   [년월 선택](#년월-선택)
    -   [년도 선택](#년도-선택)
-   [변경 이벤트](#변경-이벤트)
    -   [주 변경 감지](#주-변경-감지)
    -   [월 변경 감지](#월-변경-감지)
    -   [년도 변경 감지](#년도-변경-감지)
-   [고급 사용법](#고급-사용법)
    -   [날짜 범위 제한](#날짜-범위-제한)
    -   [시간 범위 제한](#시간-범위-제한)
    -   [공휴일 표시](#공휴일-표시)
    -   [autoApply 모드](#autoapply-모드)
    -   [푸터 숨기기](#푸터-숨기기)
    -   [인라인 캘린더](#인라인-캘린더)
    -   [다국어 지원](#다국어-지원)

---

## 기본 사용법

### 날짜 선택 (DatePicker)

가장 기본적인 날짜 선택 예제입니다.

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
                {selectedDate?.toLocaleDateString("ko-KR") ?? "날짜 선택"}
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

### 시간 선택 (TimePicker)

시간만 선택하는 예제입니다.

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

### 날짜+시간 선택 (DateTimePicker)

날짜와 시간을 함께 선택하는 예제입니다.

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
        ? `${selectedDate.toLocaleDateString("ko-KR")} ${timeValue.hour}:${
              timeValue.minute
          }:${timeValue.second}`
        : "날짜/시간 선택";

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

### 년월 선택

날짜 없이 년월만 선택하는 예제입니다.

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
                {`${selectedYear}년 ${selectedMonth + 1}월`}
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

### 년도 선택

년도만 선택하는 예제입니다.

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
                {`${selectedYear}년`}
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

## 변경 이벤트

날짜 선택 시 주/월/년도가 변경되었을 때 콜백을 받을 수 있습니다.

### 주 변경 감지

선택한 날짜의 주가 변경되었을 때 콜백을 받습니다.

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
            `${weekOfMonth}주차: ${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
        );
    };

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString("ko-KR") ?? "날짜 선택"}
            </Button>
            {weekInfo && (
                <p>
                    {weekInfo.weekOfMonth}주차 (
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

### 월 변경 감지

선택한 날짜의 월이 변경되었을 때 콜백을 받습니다.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    onMonthChange={(year, month) => {
        console.log(`${year}년 ${month}월로 변경됨`);
    }}
/>
```

---

### 년도 변경 감지

선택한 날짜의 년도가 변경되었을 때 콜백을 받습니다.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    onYearChange={(year) => {
        console.log(`${year}년으로 변경됨`);
    }}
/>
```

---

## 고급 사용법

### 날짜 범위 제한

선택 가능한 날짜 범위를 제한합니다.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    minDate={new Date(2024, 0, 1)} // 2024년 1월 1일부터
    maxDate={new Date(2024, 11, 31)} // 2024년 12월 31일까지
/>
```

---

### 시간 범위 제한

선택 가능한 시간 범위를 제한합니다.

```tsx
<TimePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    value={timeValue}
    onChange={(hour, minute) => setTimeValue({ hour, minute })}
    format="HH:mm"
    minTime="09:00" // 오전 9시부터
    maxTime="18:00" // 오후 6시까지
    minuteStep={15} // 15분 단위로 선택
/>
```

---

### 공휴일 표시

공휴일을 빨간색으로 표시합니다.

```tsx
const holidays = [
    new Date(2024, 0, 1), // 신정
    new Date(2024, 2, 1), // 삼일절
    new Date(2024, 4, 5), // 어린이날
    new Date(2024, 5, 6), // 현충일
    new Date(2024, 7, 15), // 광복절
    new Date(2024, 9, 3), // 개천절
    new Date(2024, 9, 9), // 한글날
    new Date(2024, 11, 25), // 성탄절
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

### autoApply 모드

선택 즉시 적용되는 모드입니다. 확인 버튼 없이 바로 값이 적용됩니다.

**DatePicker (날짜만)**

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    autoApply={true} // 날짜 선택 시 즉시 닫힘
/>
```

**DateTimePicker (날짜+시간)**

```tsx
<DateTimePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    timeValue={timeValue}
    onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
    autoApply={true} // 선택 즉시 적용
/>
```

> **참고**: autoApply가 true일 때는 "확인/취소" 버튼 대신 "닫기" 버튼이 표시됩니다.

---

### 푸터 숨기기

푸터(버튼 영역)를 숨깁니다.

```tsx
<DatePicker
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    showFooter={false} // 푸터 숨김
    autoApply={true} // autoApply와 함께 사용 권장
/>
```

---

### 인라인 캘린더

PopupCalendar 없이 캘린더를 직접 표시합니다.

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

### 날짜+시간 인라인 캘린더

시간 선택이 포함된 인라인 캘린더입니다.

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

### 다국어 지원

다양한 언어로 캘린더를 표시할 수 있습니다.

#### 문자열로 간단하게 설정 (권장)

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
                {selectedDate?.toLocaleDateString() ?? "날짜 선택"}
            </Button>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale="en" // 간단하게 문자열로!
            />
        </>
    );
}
```

#### 동적 로케일 변경

```tsx
import { useState, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { DatePicker, LocaleKey } from "@ehfuse/mui-datetime-picker";

function DynamicLocaleExample() {
    const [open, setOpen] = useState(false);
    const [locale, setLocale] = useState<LocaleKey>("ko");
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
                {selectedDate?.toLocaleDateString("ko-KR") ?? "날짜 선택"}
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

#### 일부 텍스트만 변경

```tsx
// 영어 로케일 기반으로 버튼 텍스트만 변경
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

#### 커스텀 로케일 생성

```tsx
import type { CalendarLocale } from "@ehfuse/mui-datetime-picker";

// 완전 커스텀 로케일
const myLocale: CalendarLocale = {
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
        "1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
    ],
    today: "오늘로",
    confirm: "선택",
    cancel: "돌아가기",
    close: "닫기",
};

<DatePicker
    locale={myLocale}
    ...
/>
```

---

## 관련 문서

-   [시작하기](./getting-started.md) - 설치 및 빠른 시작
-   [API 레퍼런스](./api.md) - 모든 Props와 타입 정의
