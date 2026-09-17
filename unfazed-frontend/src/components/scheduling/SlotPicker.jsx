import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Calendar as CalendarIcon, Clock, CheckCircle2, CheckSquare } from "lucide-react";

export const SlotPicker = ({
  therapistId,
  onSelectSlot,
  selectedDate,
  setSelectedDate,
  isMultiSelect = false, // If true, enables selecting MULTIPLE timings on a day (Therapist mode)
}) => {
  const todayStr = new Date().toISOString().split("T")[0];
  const [activeDate, setActiveDate] = useState(selectedDate || todayStr);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Single slot selection state (Client Mode)
  const [selectedSlot, setSelectedSlot] = useState(null);
  // Multi-slot selection state (Therapist Mode)
  const [multiSlots, setMultiSlots] = useState(new Set(["09:00", "10:00", "14:00", "16:00", "18:00"]));

  const [prevSelectedDate, setPrevSelectedDate] = useState(selectedDate);
  if (selectedDate && selectedDate !== prevSelectedDate) {
    setPrevSelectedDate(selectedDate);
    setActiveDate(selectedDate);
  }

  // Generate 14 days list from today
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  // Fetch slots whenever activeDate or therapistId changes
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/scheduling/slots?therapistId=${therapistId || "66e01a9b4000000000000001"}&date=${activeDate}`
        );
        const fetchedSlots = res.data.slots || [];
        setSlots(fetchedSlots);

        if (isMultiSelect) {
          const activeTimes = fetchedSlots.filter((s) => s.available).map((s) => s.time);
          setMultiSlots(new Set(activeTimes));
          if (onSelectSlot) {
            onSelectSlot({ date: activeDate, slots: activeTimes });
          }
        }
      } catch (e) {
        // Fallback slots
        const dayNumber = new Date(activeDate).getDate();
        const fallbackSlots = [
          { time: "08:00", available: true },
          { time: "09:00", available: true },
          { time: "10:00", available: true },
          { time: "11:00", available: dayNumber % 3 !== 0 },
          { time: "12:00", available: true },
          { time: "14:00", available: true },
          { time: "15:00", available: true },
          { time: "16:00", available: true },
          { time: "17:00", available: true },
          { time: "18:00", available: true },
          { time: "19:00", available: true },
          { time: "20:00", available: true },
        ];
        setSlots(fallbackSlots);

        if (isMultiSelect) {
          const activeTimes = fallbackSlots.filter((s) => s.available).map((s) => s.time);
          setMultiSlots(new Set(activeTimes));
          if (onSelectSlot) {
            onSelectSlot({ date: activeDate, slots: activeTimes });
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [activeDate, therapistId]);

  const handleDateChange = (newDate) => {
    setActiveDate(newDate);
    setSelectedSlot(null);
    if (setSelectedDate) {
      setSelectedDate(newDate);
    }
    if (onSelectSlot) {
      onSelectSlot(null);
    }
  };

  const handleSlotClick = (slot) => {
    if (isMultiSelect) {
      // Toggle multiple slot selection for therapist
      const updated = new Set(multiSlots);
      if (updated.has(slot.time)) {
        updated.delete(slot.time);
      } else {
        updated.add(slot.time);
      }
      setMultiSlots(updated);
      if (onSelectSlot) {
        onSelectSlot({ date: activeDate, slots: Array.from(updated) });
      }
    } else {
      // Single slot selection for client booking
      if (!slot.available) return;
      setSelectedSlot(slot.time);
      if (onSelectSlot) {
        onSelectSlot({ date: activeDate, time: slot.time });
      }
    }
  };

  // Preset quick actions for multi-slot therapist mode
  const selectAllSlots = () => {
    const allTimes = slots.map((s) => s.time);
    setMultiSlots(new Set(allTimes));
    if (onSelectSlot) {
      onSelectSlot({ date: activeDate, slots: allTimes });
    }
  };

  const clearAllSlots = () => {
    setMultiSlots(new Set());
    if (onSelectSlot) {
      onSelectSlot({ date: activeDate, slots: [] });
    }
  };

  const formatDateTitle = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-lg">
          <CalendarIcon className="w-5 h-5 text-teal-600" />
          <span>{isMultiSelect ? "Set Multiple Available Timings" : "Select Date & Time Slot"}</span>
        </div>

        {/* Date Selector Input */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700">
          <label htmlFor="custom-date-picker" className="cursor-pointer text-gray-500">
            Select Date:
          </label>
          <input
            id="custom-date-picker"
            type="date"
            min={todayStr}
            value={activeDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="bg-transparent text-teal-900 font-bold focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Date Horizontal Carousel */}
      <div className="space-y-1.5">
        <div className="text-xs text-gray-500 font-semibold flex justify-between items-center">
          <span>Upcoming Days:</span>
          <span className="text-teal-700 font-bold">{formatDateTitle(activeDate)}</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {dates.map((d) => {
            const dateObj = new Date(d);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = dateObj.getDate();
            const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
            const isSelected = d === activeDate;

            return (
              <button
                key={d}
                type="button"
                onClick={() => handleDateChange(d)}
                className={`flex-1 min-w-[72px] py-3 px-2 rounded-2xl border text-center transition cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-700/20 ring-2 ring-teal-600/30"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-teal-400"
                }`}
              >
                <div className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-teal-100" : "text-gray-500"}`}>
                  {dayName}
                </div>
                <div className="text-lg font-extrabold my-0.5">{dayNum}</div>
                <div className={`text-[10px] ${isSelected ? "text-teal-200" : "text-gray-400"}`}>{monthName}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Slot Mode Controls for Therapist */}
      {isMultiSelect && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-teal-50/70 border border-teal-100 rounded-2xl text-xs">
          <span className="font-bold text-teal-900">
            Selected Timings: <span className="bg-teal-700 text-white px-2 py-0.5 rounded-full">{multiSlots.size} slots selected</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAllSlots}
              className="px-3 py-1 bg-white hover:bg-teal-100 text-teal-800 font-semibold rounded-lg border border-teal-200 transition"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearAllSlots}
              className="px-3 py-1 bg-white hover:bg-red-50 text-red-700 font-semibold rounded-lg border border-red-200 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Time Slots Grid */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>
              {isMultiSelect
                ? `Click slots to toggle availability for ${formatDateTitle(activeDate)}`
                : `Available Time Slots for ${formatDateTitle(activeDate)}`}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-gray-400 animate-pulse">
            Fetching slots for {formatDateTitle(activeDate)}...
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
            {slots.map((s) => {
              const isSelected = isMultiSelect ? multiSlots.has(s.time) : selectedSlot === s.time;
              const isBooked = s.isBooked || s.bookedByOther;
              const isUnavailable = !isMultiSelect && (!s.available || isBooked);

              return (
                <button
                  key={s.time}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => handleSlotClick(s)}
                  className={`py-2.5 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 relative ${
                    isBooked
                      ? "bg-rose-50 text-rose-700 border-rose-200 cursor-not-allowed line-through opacity-85 shadow-xs"
                      : isSelected
                      ? "bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-600/30 cursor-pointer"
                      : !s.available
                      ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed opacity-50"
                      : "bg-white text-gray-800 border-gray-200 hover:border-teal-600 hover:bg-teal-50/50 cursor-pointer"
                  }`}
                >
                  <span>{s.time}</span>
                  {isBooked ? (
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-rose-200/90 text-rose-900 px-1 py-0.2 rounded-xs ml-0.5 no-underline">
                      Booked
                    </span>
                  ) : (
                    isSelected && <CheckCircle2 className="w-4 h-4 text-teal-200 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!isMultiSelect && slots.some((s) => s.isBooked || s.bookedByOther) && (
        <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-center gap-2">
          <span className="font-bold shrink-0">⚠️ Notice:</span>
          <span>Slots marked as <strong className="text-rose-700 uppercase font-extrabold">BOOKED</strong> are already reserved by other patients. Please select another open timing.</span>
        </div>
      )}

      {/* Confirmation Badge */}
      {isMultiSelect ? (
        <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-center gap-2.5">
          <CheckSquare className="w-5 h-5 text-teal-600 shrink-0" />
          <span>
            Therapist Availability Configured: <strong>{multiSlots.size} slots</strong> open on <strong>{formatDateTitle(activeDate)}</strong> ({Array.from(multiSlots).sort().join(", ")}).
          </span>
        </div>
      ) : (
        selectedSlot && (
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              Selected Appointment: <strong>{formatDateTitle(activeDate)}</strong> at <strong>{selectedSlot}</strong> (50 mins). Slot reserved during checkout.
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default SlotPicker;
