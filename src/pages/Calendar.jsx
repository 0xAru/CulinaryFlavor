import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { updateEvent, removeEvent } from '../features/calendarSlice';
import { updatePlannedRecipe } from '../features/recipesSlice';
import Modal from '../components/Modal'

const Calendar = () => {
  const dispatch = useDispatch();
  const meals = useSelector(state => state.calendar.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleEventClick = (info) => {
    setEventToDelete(info.event);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      dispatch(removeEvent({ id: eventToDelete._def.publicId }));
      setIsModalOpen(false);
    }
  };

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
        editable={true}
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
        eventClick={handleEventClick}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Supprimer l'événement"
        onConfirm={handleConfirmDelete}
        confirmText="Supprimer"
      ><p>Voulez-vous supprimer <span className='text-orange-800 font-semibold'>{eventToDelete?.title}</span> ?</p>
      </Modal>
    </div>
  );
};

export default Calendar;
