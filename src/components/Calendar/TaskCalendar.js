import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru'; // для русской локализации
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { selectTasks } from '../../features/tasks/tasksSelectors';
import { useTheme, themeStyles } from '../../styles/theme'; // Импортируем для стилизации

moment.locale('ru'); // Устанавливаем русскую локаль для moment
const localizer = momentLocalizer(moment);

function TaskCalendar() {
  const tasks = useSelector(selectTasks);
  const { theme } = useTheme();
  const currentThemeStyles = themeStyles[theme];

  const events = tasks
    .filter(task => task.deadline) // Отображаем только задачи со сроком
    .map(task => ({
      id: task.id,
      title: task.title,
      start: new Date(task.deadline), // react-big-calendar ожидает Date объекты
      end: new Date(task.deadline),   // Для задач без длительности start и end могут быть одинаковыми
      allDay: true, // Предполагаем, что задачи на весь день
      resource: task, // Можно передать всю задачу для использования в eventPropGetter или при клике
      isCompleted: task.completed,
    }));

  // Стилизация событий в календаре
  const eventPropGetter = (event) => {
    let style = {
      backgroundColor: event.isCompleted ? '#5cb85c' : '#f0ad4e', // Зеленый для завершенных, оранжевый для остальных
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white', // Белый текст на цветном фоне события
      border: '0px',
      display: 'block',
    };
    // Можно добавить стили в зависимости от темы, если нужно
    // if (theme === 'dark') { ... }
    return { style };
  };
  
  // Стили для самого компонента календаря, чтобы он вписывался в тему
  // Это сложнее, так как react-big-calendar имеет свои стили.
  // Можно попытаться переопределить CSS классы или использовать styled-components.
  // Для простоты, пока оставим стандартные стили календаря, но обернем в тематический div.

  const calendarContainerStyle = {
    height: '500px', // Задаем высоту для календаря
    marginTop: '20px',
    padding: '10px',
    backgroundColor: currentThemeStyles.backgroundColor, // Фон контейнера
    border: `1px solid ${currentThemeStyles.borderColor}`,
    borderRadius: '4px',
    // Стили для текста внутри календаря (заголовки дней, номера дат и т.д.)
    // ПРИМЕЧАНИЕ: Это может не сработать для всех элементов календаря из-за специфичности его CSS.
    // Потребуется более глубокая настройка CSS или использование :global селекторов, если есть CSS Modules.
    color: currentThemeStyles.color, 
  };


  return (
    <div style={calendarContainerStyle}>
      <h2 style={{ color: currentThemeStyles.color }}>Календарь Задач</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }} // Внутренняя высота самого календаря
        messages={{
            next: "След.",
            previous: "Пред.",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День",
            agenda: "Список дел",
            date: "Дата",
            time: "Время",
            event: "Событие",
            noEventsInRange: "Нет событий в этом диапазоне.",
            showMore: total => `+ ещё ${total}`
        }}
        eventPropGetter={eventPropGetter}
        // dayPropGetter, slotPropGetter - для стилизации ячеек дня/слота
        // Можно добавить обработчики onSelectEvent, onSelectSlot и т.д.
        onSelectEvent={event => alert(`Задача: ${event.title}\nСтатус: ${event.resource.status}`)}
      />
    </div>
  );
}

export default TaskCalendar;