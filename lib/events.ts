import { Doc, Id } from "@/convex/_generated/dataModel";
import * as schema from "@/lib/schema";
import {
  isSameDay,
  now,
  fromAbsolute,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
  fromDate,
  ZonedDateTime,
} from "@internationalized/date";

export type EventDoc = Doc<"events">;

export interface SerializedEvent
  extends Omit<Doc<"events">, "_id" | "_creationTime" | "start" | "end"> {
  id: Id<"events">;
  start: ZonedDateTime | undefined;
  end: ZonedDateTime | undefined;
}

export interface DeserializedEvent
  extends Omit<Doc<"events">, "_id" | "_creationTime"> {
  start: number | undefined;
  end: number | undefined;
}

export function serializeEvent(event: Doc<"events">) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return {
    id: event._id,
    title: event.title,
    kind: event.kind,
    location: event.location,
    start: event.start ? fromAbsolute(event.start, timeZone) : undefined,
    end: event.end ? fromAbsolute(event.end, timeZone) : undefined,
    description: event.description,
    rsvp: event.rsvp,
  };
}

export function deserializeEvent(event: SerializedEvent): DeserializedEvent {
  return {
    title: event.title,
    kind: event.kind,
    location: event.location,
    start: event.start ? event.start.toDate().getTime() : undefined,
    end: event.end ? event.end.toDate().getTime() : undefined,
    description: event.description,
    rsvp: event.rsvp,
  };
}

export function parseEvents(events: SerializedEvent[]) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";
  const localNow = now(timeZone);

  const [happeningToday, upcomingEvents, pastEvents] = events.reduce<
    [SerializedEvent[], SerializedEvent[], SerializedEvent[]]
  >(
    (acc, event, _i) => {
      const [happeningToday, upcomingEvents, pastEvents] = acc;

      if (!event.start || !event.end) {
        pastEvents.push(event);

        return [happeningToday, upcomingEvents, pastEvents];
      }

      if (isSameDay(event.end, localNow)) {
        happeningToday.push(event);
      } else if (event.end.compare(localNow) < 0) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }

      return [happeningToday, upcomingEvents, pastEvents];
    },
    [[], [], []],
  );

  const areHappeningToday = happeningToday.length > 0;
  const areUpcomingEvents = upcomingEvents.length > 0;

  return {
    happeningToday,
    upcomingEvents,
    pastEvents,
    areHappeningToday,
    areUpcomingEvents,
  };
}
