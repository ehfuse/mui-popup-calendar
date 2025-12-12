import { useState, useRef } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { DatePicker, SimpleCalendar } from "@ehfuse/mui-popup-calendar";

export default function DatePickerPage() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const [showToday, setShowToday] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [autoApply, setAutoApply] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        console.log("Date changed:", date);
    };

    const handleMonthChange = (year: number, month: number) => {
        console.log("Month changed (navigation):", year, "년", month, "월");
    };

    const handleYearChange = (year: number) => {
        console.log("Year changed (navigation):", year, "년");
    };

    const handleWeekChange = (
        weekOfMonth: number,
        startDate: Date,
        endDate: Date
    ) => {
        console.log(
            "Week changed:",
            weekOfMonth + "주차",
            startDate.toLocaleDateString("ko-KR"),
            "~",
            endDate.toLocaleDateString("ko-KR")
        );
    };

    const getDisplayText = () => {
        return selectedDate
            ? selectedDate.toLocaleDateString("ko-KR")
            : "날짜 선택";
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                DatePicker
            </Typography>
            <Typography variant="body1" paragraph>
                Popover 기반의 날짜 선택 컴포넌트입니다. 날짜만 선택할 때
                사용합니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* 데모 영역 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        데모
                    </Typography>

                    <Button
                        ref={anchorRef}
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ minWidth: 200, mb: 2 }}
                    >
                        {getDisplayText()}
                    </Button>

                    <DatePicker
                        open={open}
                        onClose={() => setOpen(false)}
                        anchorEl={anchorRef}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        onYearChange={handleYearChange}
                        onMonthChange={handleMonthChange}
                        onWeekChange={handleWeekChange}
                        showToday={showToday}
                        showFooter={showFooter}
                        autoApply={autoApply}
                    />

                    <Box
                        sx={{
                            width: 270,
                            height: 300,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <SimpleCalendar
                            selectedDate={selectedDate}
                            onSelect={handleDateChange}
                            onClose={() => {}}
                            onMonthChange={(year, month) => {
                                console.log(
                                    "Inline calendar month changed:",
                                    year,
                                    "년",
                                    month,
                                    "월"
                                );
                            }}
                            showTimePicker={false}
                            showFooter={false}
                            autoApply={true}
                        />
                    </Box>
                </Paper>

                {/* 컨트롤 패널 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        옵션
                    </Typography>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={showToday}
                                onChange={(e) => setShowToday(e.target.checked)}
                            />
                        }
                        label="showToday"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFooter}
                                onChange={(e) =>
                                    setShowFooter(e.target.checked)
                                }
                            />
                        }
                        label="showFooter"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoApply}
                                onChange={(e) => setAutoApply(e.target.checked)}
                            />
                        }
                        label="autoApply"
                    />
                </Paper>
            </Box>
        </Box>
    );
}
