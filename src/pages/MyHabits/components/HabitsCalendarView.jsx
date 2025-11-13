import HabitCard from "./HabitCard";

const HabitsCardView = ({
  habits,
  onEdit,
  onUpdateModal,
  onDelete,
  onMarkComplete,
  completing,
  getWeeklyProgress,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {habits.map((habit, index) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          index={index}
          onEdit={onEdit}
          onUpdateModal={onUpdateModal}
          onDelete={onDelete}
          onMarkComplete={onMarkComplete}
          completing={completing}
          streak={habit.streak}
          getWeeklyProgress={getWeeklyProgress}
        />
      ))}
    </div>
  );
};

export default HabitsCardView;
