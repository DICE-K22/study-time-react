import { createContext, useContext, ReactNode, useState } from "react";

type StudyHoursContextType = {
  studyHourInput: string;
  setStudyHourInput: (input: string) => void;
  studyMinInput: string;
  setStudyMinInput: (input: string) => void;
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

  return (
    <StudyHoursContext.Provider
      value={{
        studyHourInput,
        studyMinInput,
        setStudyHourInput,
        setStudyMinInput,
      }}
    >
      {children}
    </StudyHoursContext.Provider>
  );
};
