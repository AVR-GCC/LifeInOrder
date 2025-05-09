export type Value = {
  id: number,
  label: string,
  sequence: number,
  habit_id: number,
  color: string,
  created_at: string
};

export type Habit = {
  habit: {
    id: string,
    name: string,
    weight: number,
    sequence: number,
    habit_type: string,
  }
  values: Value[]
  values_hashmap: { [key: string]: number }
};

export type Date = {
  date: string,
  values: { [key: string]: number }
};

export type MainProps = {
  dates: Date[],
  habits: Habit[]
} | null;

export type VerticalChevronsProps = {
  dark?: boolean,
  onTap: (isDown: boolean) => void,
  upDisabled: boolean,
  downDisabled: boolean
};

export type HabitCardProps = {
  habit: Habit,
  index: number,
  totalHabits: number,
  switchHabits: SwitchHabits,
  deleteHabit: DeleteHabit
};

export type HabitButtonProps = {
  title: string,
  value: Value,
  onTap: () => void
};

export type SwitchHabits = (isDown: boolean, index: number) => void;
export type DeleteHabit = (index: number) => void;
export type SetDayValue = (dayIndex: number, habitIndex: number, valueId: number) => void;
export type SetDayValueServer = (date: string, habitId: string, valueId: number) => void;

export type GetDayHabitValue = (dayIndex: number, habitIndex: number) => Value | null;
