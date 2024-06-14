import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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
  studyHourDod: number;
  studyMinDod: number;
  studyHourMom: number;
  studyMinMom: number;
  studyHourWow: number;
  studyMinWow: number;
  dodPositiveNegative: string;
  momPositiveNegative: string;
  wowPositiveNegative: string;
  calcMonthlyTotalMins: number[];
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
  const [studyHourDod, setStudyHourDod] = useState(0);
  const [studyMinDod, setStudyMinDod] = useState(0);
  const [studyHourMom, setStudyHourMom] = useState(0);
  const [studyMinMom, setStudyMinMom] = useState(0);
  const [studyHourWow, setStudyHourWow] = useState(0);
  const [studyMinWow, setStudyMinWow] = useState(0);
  const [dodPositiveNegative, setDodPositiveNegative] = useState("");
  const [momPositiveNegative, setMomPositiveNegative] = useState("");
  const [wowPositiveNegative, setWowPositiveNegative] = useState("");
  const [calcMonthlyTotalMins, setCalcMonthlyTotalMins] = useState<number[]>(
    []
  );

  useEffect(() => {
    // Firestoreからデータの受け取り
    const fecheStudyTimes = async () => {
      const querySnapshot = await getDocs(collection(db, "StudyHours"));

      const studyHoursData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data.date?.seconds
          ? new Date(data.date.toDate())
          : new Date();
        return {
          ...data,
          date,
          id: doc.id,
        } as unknown as StudyHours;
      });
      setStudyHours(studyHoursData);
    };
    fecheStudyTimes();

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

    // 昨日学習時間
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

    // 月間プログラミング学習時間
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

    const calcMonthlyTotalMinsArray: number[] = Array(today.getDate()).fill(0);

    studyHours.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getFullYear() === today.getFullYear()
      ) {
        const dayIndex = entryDate.getDate() - 1;
        calcMonthlyTotalMinsArray[dayIndex] +=
          parseFloat(entry.studyHour) * 60 + parseFloat(entry.studyMin);
      }
    });

    setCalcMonthlyTotalMins(calcMonthlyTotalMinsArray);

    const monthlyAdditionalTime = Math.floor(monthlyMins / 60);
    monthlyMins = monthlyMins % 60;

    setStudyHourYesterday(yesterdayHours);
    setStudyMinYesterday(yesterdayMins);
    setStudyHourMonthly(monthlyAdditionalTime + monthlyHours);
    setStudyMinMonthly(monthlyMins);

    // 前日比
    const calcTotalToday = todayHours * 60 + todayMins;
    const calcTotalYesterday = yesterdayHours * 60 + yesterdayMins;

    if (calcTotalToday > calcTotalYesterday) {
      const calcDod = calcTotalToday - calcTotalYesterday;
      const calcDodHour = Math.floor(calcDod / 60);
      const calcDodMin = calcDod % 60;

      setDodPositiveNegative("+");
      setStudyHourDod(calcDodHour);
      setStudyMinDod(calcDodMin);
    } else if (calcTotalToday < calcTotalYesterday) {
      const calcDod = calcTotalYesterday - calcTotalToday;
      const calcDodHour = Math.floor(calcDod / 60);
      const calcDodMin = calcDod % 60;

      setDodPositiveNegative("-");
      setStudyHourDod(calcDodHour);
      setStudyMinDod(calcDodMin);
    } else {
      const calcDod = calcTotalToday - calcTotalYesterday;
      const calcDodHour = Math.floor(calcDod / 60);
      const calcDodMin = calcDod % 60;

      setDodPositiveNegative("±");
      setStudyHourDod(calcDodHour);
      setStudyMinDod(calcDodMin);
    }

    // 前月比
    const lastMonthlyHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === today.getMonth() - 1 &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    let lastMonthlyMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === today.getMonth() - 1 &&
          entryDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    const calcTotalThisMonth = monthlyHours * 60 + monthlyMins;
    const calcTotalLastMonth = lastMonthlyHours * 60 + lastMonthlyMins;

    if (calcTotalThisMonth > calcTotalLastMonth) {
      const calcMom = calcTotalThisMonth - calcTotalLastMonth;
      const calcMomHour = Math.floor(calcMom / 60);
      const calcMomMin = calcMom % 60;

      setMomPositiveNegative("+");
      setStudyHourMom(calcMomHour);
      setStudyMinMom(calcMomMin);
    } else if (calcTotalThisMonth < calcTotalLastMonth) {
      const calcMom = calcTotalLastMonth - calcTotalThisMonth;
      const calcMomHour = Math.floor(calcMom / 60);
      const calcMomMin = calcMom % 60;

      setMomPositiveNegative("-");
      setStudyHourMom(calcMomHour);
      setStudyMinMom(calcMomMin);
    } else {
      const calcMom = calcTotalThisMonth - calcTotalLastMonth;
      const calcMomHour = Math.floor(calcMom / 60);
      const calcMomMin = calcMom % 60;

      setMomPositiveNegative("±");
      setStudyHourMom(calcMomHour);
      setStudyMinMom(calcMomMin);
    }

    // 前週比
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - today.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);

    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23, 59, 59, 999);

    const weeklyHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfThisWeek && entryDate <= endOfThisWeek;
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    const weeklyMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfThisWeek && entryDate <= endOfThisWeek;
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    const lastWeeklyHours = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfLastWeek && entryDate <= endOfLastWeek;
      })
      .reduce((sum, current) => sum + parseFloat(current.studyHour), 0);

    let lastWeeklyMins = studyHours
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfLastWeek && entryDate <= endOfLastWeek;
      })
      .reduce((sum, current) => sum + parseFloat(current.studyMin), 0);

    const calcTotalThisWeek = weeklyHours * 60 + weeklyMins;
    const calcTotalLastWeek = lastWeeklyHours * 60 + lastWeeklyMins;

    if (calcTotalThisWeek > calcTotalLastWeek) {
      const calcWow = calcTotalThisWeek - calcTotalLastWeek;
      const calcWowHour = Math.floor(calcWow / 60);
      const calcMomMin = calcWow % 60;

      setWowPositiveNegative("+");
      setStudyHourWow(calcWowHour);
      setStudyMinWow(calcMomMin);
    } else if (calcTotalThisWeek < calcTotalLastWeek) {
      const calcWow = calcTotalLastWeek - calcTotalThisWeek;
      const calcWowHour = Math.floor(calcWow / 60);
      const calcWowMin = calcWow % 60;

      setWowPositiveNegative("-");
      setStudyHourWow(calcWowHour);
      setStudyMinWow(calcWowMin);
    } else {
      const calcWow = calcTotalThisWeek - calcTotalLastWeek;
      const calcWowHour = Math.floor(calcWow / 60);
      const calcWowMin = calcWow % 60;

      setWowPositiveNegative("±");
      setStudyHourWow(calcWowHour);
      setStudyMinWow(calcWowMin);
    }
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
        studyHourDod,
        studyMinDod,
        studyHourMom,
        studyMinMom,
        studyHourWow,
        studyMinWow,
        dodPositiveNegative,
        momPositiveNegative,
        wowPositiveNegative,
        calcMonthlyTotalMins,
      }}
    >
      {children}
    </StudyHoursContext.Provider>
  );
};
