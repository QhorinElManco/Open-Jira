import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | {
      type: "Entry - Add-Entry";
      payload: Entry;
    }
  | {
      type: "Entry - Update-Entry";
      payload: Entry;
    }
  | {
      type: "Entry - Fecth-Entries";
      payload: Entry[];
    }
  | {
      type: "Entry - Delete-Entry";
      payload: { _id: string };
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "Entry - Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "Entry - Update-Entry": {
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    }
    case "Entry - Fecth-Entries": {
      return {
        ...state,
        entries: [...action.payload],
      };
    }
    case "Entry - Delete-Entry":
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
