import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {  updateEvent } from '../features/calendarSlice';
import { updatePlannedRecipe } from '../features/recipesSlice';

const Calendar = () => {
  const dispatch = useDispatch();
  const meals = useSelector(state => state.calendar.value);
  
  return (
    <div className='mt-10 max-w-7xl mx-auto'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: '',
          center: 'title',
        }}
        events={meals}
        editable = {true}
        eventDrop={(info) => {
          // Mettre à jour l'événement dans le store Redux
          const updatedEvent = {
            id: info.event.id,
            start: info.event.start.toISOString().split('T')[0],
            allDay: true
          };
          dispatch(updateEvent(updatedEvent));
          dispatch(updatePlannedRecipe({ id: updatedEvent.id, start: updatedEvent.start }));
        }}
      />
    </div>
  );
};

export default Calendar;
