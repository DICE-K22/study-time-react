import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type StudyHours = {
  date: Date;
  studyHour: string;
  studyMin: string;
  id: number;
};

type StudyHoursContextType = {
  studyHourInput: string;
  setStudyHourInput: (input: string) => void;
  studyMinInput: string;
  setStudyMinInput: (input: string) => void;
  studyDayInput: Date | null;
  setStudyDayInput: (input: Date | null) => void;
  studyHours: StudyHours[];
  setStudyHours: (hours: StudyHours[]) => void;
  studyMins: StudyHours[];
  setStudyMins: (hours: StudyHours[]) => void;
  totalStudyHours: number;
  totalStudyMins: number;
  studyHourToday: number;
  studyMinToday: number;
  studyHourYesterday: number;
  studyMinYesterday: number;
  studyHourMonthly: number;
  studyMinMonthly: number;
};

const StudyHoursContext = createContext<StudyHoursContextType | undefined>(
  undefined
);

export const useStudyHours = () => {
  const context = useContext(StudyHoursContext);
  if (!context) {
    throw new Error("useStudyHours must be used within a StudyHoursProvider");
  }
  return context;
};

type StudyHoursProviderProps = {
  children: ReactNode;
};

export const StudyHoursProvider: React.FC<StudyHoursProviderProps> = ({
  children,
}) => {
  const [studyHourInput, setStudyHourInput] = useState("");
  const [studyMinInput, setStudyMinInput] = useState("");
  const [studyDayInput, setStudyDayInput] = useState<Date | null>(null);
  const [studyHours, setStudyHours] = useState<StudyHours[]>([]);
  const [studyMins, setStudyMins] = useState<StudyHours[]>([]);
  const [totalStudyHours, setTotalStudyHours] = useState(0);
  const [totalStudyMins, setTotalStudyMins] = useState(0);
  const [studyHourToday, setStudyHourToday] = useState(0);
  const [studyMinToday, setStudyMinToday] = useState(0);
  const [studyHourYesterday, setStudyHourYesterday] = useState(0);
  const [studyMinYesterday, setStudyMinYesterday] = useState(0);
  const [studyHourMonthly, setStudyHourMonthly] = useState(0);
  const [studyMinMonthly, setStudyMinMonthly] = useState(0);

  useEffect(() => {
    const totalHours = studyHours.reduce(
      (sum, current) => sum + parseFloat(current.studyHour),
      0
    );
    let totalMins = studyHours.reduce(
      (sum, current) => sum + parseFloat(current.studyMin),
      0
    );

    const additionalTime = Math.floor(totalMins / 60);
    totalMins = totalMins % 60;
    setTotalStudyHours(additionalTime + totalHours);
    setTotalStudyMins(totalMins);

    const today = new Date();
    const todayHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    const todayMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    setStudyHourToday(todayHours);
    setStudyMinToday(todayMins);

    const yesterdayHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getDate() === today.getDate() - 1 &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    const yesterdayMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getDate() === today.getDate() - 1 &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    const monthlyHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    let monthlyMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    const monthlyAdditionalTime = Math.floor(monthlyMins / 60);
    monthlyMins = monthlyMins % 60;

    setStudyHourYesterday(yesterdayHours);
    setStudyMinYesterday(yesterdayMins);
    setStudyHourMonthly(monthlyAdditionalTime + monthlyHours);
    setStudyMinMonthly(monthlyMins);
  }, [studyHours]);

  return (
    <StudyHoursContext.Provider
      value={{
        studyHourInput,
        studyMinInput,
        studyDayInput,
        setStudyHourInput,
        setStudyMinInput,
        setStudyDayInput,
        studyHours,
        setStudyHours,
        studyMins,
        setStudyMins,
        totalStudyHours,
        totalStudyMins,
        studyHourToday,
        studyMinToday,
        studyHourYesterday,
        studyMinYesterday,
        studyHourMonthly,
        studyMinMonthly,
      }}
    >
      {children}
    </StudyHoursContext.Provider>
  );
};
