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
  totalStudyHours: number;
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
  const [totalStudyHours, setTotalStudyHours] = useState(0);

  useEffect(() => {
    const total = studyHours.reduce(
      (sum, current) => sum + parseFloat(current.studyHour),
      0
    );
    setTotalStudyHours(total);
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
        totalStudyHours,
      }}
    >
      {children}
    </StudyHoursContext.Provider>
  );
};
