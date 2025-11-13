import { useState } from "react";
import Timekeeper from "react-timekeeper";
import { Bell } from "lucide-react";

const ReminderTimePicker = ({ formData, handleInputChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <label className="flex items-center gap-2 text-lg font-semibold text-base-content mb-3">
        <Bell className="w-5 h-5 text-primary" />
        Set Reminder
      </label>

      <button
        onClick={() => setShowPicker(true)}
        className="w-full px-4 py-3 bg-base-200/60 backdrop-blur-md border border-base-300 rounded-2xl text-base-content text-left focus:ring-2 focus:ring-primary/70 transition-all"
      >
        {formData.reminderTime || "Select time"}
      </button>

      {showPicker && (
        <div className="absolute top-full mt-3 z-50">
          <Timekeeper
            time={formData.reminderTime || "09:00am"}
            onChange={(newTime) =>
              handleInputChange("reminderTime", newTime.formatted24)
            }
            onDoneClick={() => setShowPicker(false)}
            switchToMinuteOnHourSelect
          />
        </div>
      )}

      <p className="text-sm text-base-content/60 mt-2">
        We’ll remind you to stay consistent with your habits.
      </p>
    </div>
  );
};
export default ReminderTimePicker;
