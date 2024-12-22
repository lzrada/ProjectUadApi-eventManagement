import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const DraggableCalendar = () => {
  const calendarRef = useRef(null);
  const draggableRef = useRef(null);
  const calendarInstanceRef = useRef(null);

  useEffect(() => {
    // Sample resource data
    const events = [
      {
        id: "1", // ID event untuk memudahkan operasi CRUD
        title: "Meeting",
        start: new Date(),
      },
    ];

    if (calendarRef.current) {
      calendarInstanceRef.current = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        editable: true,
        droppable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: events,

        // CREATE Event
        select: function (info) {
          const title = prompt("Enter a title for the event:");
          if (title) {
            calendarInstanceRef.current.addEvent({
              id: String(new Date().getTime()), // Unique ID for the event
              title,
              start: info.start,
              end: info.end,
              allDay: info.allDay,
            });
          }
          calendarInstanceRef.current.unselect();
        },

        // READ & UPDATE Event
        eventClick: function (info) {
          const options = confirm(`Event: ${info.event.title}\nDo you want to edit this event?`);
          if (options) {
            const newTitle = prompt("Enter new title for the event:", info.event.title);
            if (newTitle) {
              info.event.setProp("title", newTitle); // UPDATE event title
            }
          }
        },

        // DELETE Event
        eventDrop: function (info) {
          const confirmDelete = confirm("Do you want to delete this event?");
          if (confirmDelete) {
            info.event.remove(); // DELETE event
          }
        },
      });

      calendarInstanceRef.current.render();
    }

    // Initialize draggable elements
    if (draggableRef.current) {
      new Draggable(draggableRef.current, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText,
          };
        },
      });
    }

    return () => {
      if (calendarInstanceRef.current) {
        calendarInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex gap-4">
      <div ref={draggableRef} className="w-64 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Event Bank</h2>
        <div className="fc-event bg-blue-500 text-white p-2 mb-2 rounded cursor-pointer">Meeting</div>
        <div className="fc-event bg-green-500 text-white p-2 mb-2 rounded cursor-pointer">Appointment</div>
      </div>

      <div className="flex-1">
        <div ref={calendarRef} className="bg-white rounded-lg shadow p-4" />
      </div>
    </div>
  );
};

export default DraggableCalendar;
