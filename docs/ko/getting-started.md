# 시작하기

MUI 기반의 팝업 캘린더/시간 선택 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @ehfuse/mui-popup-calendar
```

### Peer Dependencies

다음 패키지들이 필요합니다:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## 빠른 시작

### DatePicker (날짜만 선택)

날짜만 선택할 때 사용하는 컴포넌트입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DatePicker } from "@ehfuse/mui-popup-calendar";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {selectedDate?.toLocaleDateString() ?? "날짜 선택"}
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

### DateTimePicker (날짜 + 시간 선택)

날짜와 시간을 함께 선택할 때 사용하는 컴포넌트입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { DateTimePicker } from "@ehfuse/mui-popup-calendar";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState({ hour: "09", minute: "00" });

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {selectedDate?.toLocaleDateString() ?? "날짜/시간 선택"}{" "}
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

### TimePicker (시간만 선택)

시간만 선택할 때 사용하는 컴포넌트입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { TimePicker } from "@ehfuse/mui-popup-calendar";

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

### SimpleCalendar (인라인 캘린더)

인라인으로 캘린더를 표시할 때 사용합니다.

```tsx
import { useState } from "react";
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";

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

## 컴포넌트 선택 가이드

| 컴포넌트         | 용도                  |
| ---------------- | --------------------- |
| `DatePicker`     | 날짜만 선택           |
| `TimePicker`     | 시간만 선택           |
| `DateTimePicker` | 날짜와 시간 모두 선택 |
| `SimpleCalendar` | 인라인 캘린더 표시    |

## 시간 포맷

4가지 시간 포맷을 지원합니다:

| 포맷       | 설명          | 예시     |
| ---------- | ------------- | -------- |
| `HH:mm`    | 24시간제      | 14:30    |
| `HH:mm:ss` | 24시간제 + 초 | 14:30:45 |
| `hh:mm`    | 12시간제      | 02:30    |
| `hh:mm:ss` | 12시간제 + 초 | 02:30:45 |

---

## 관련 문서

-   [API 레퍼런스](./api.md) - 모든 Props와 타입 정의
-   [예제](./example.md) - 다양한 사용 예제
