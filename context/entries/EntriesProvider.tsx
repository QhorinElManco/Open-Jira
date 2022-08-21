import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { entriesAPI } from "../../apis";
import { useQuery } from "react-query";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface EntriesProviderProps {
  children: React.ReactNode;
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesAPI.post<Entry>("entries", { description });

    dispatch({
      type: "Entry - Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesAPI.put<Entry>(`entries/${_id}`, {
        description,
        status,
      });
      dispatch({
        type: "Entry - Update-Entry",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesAPI.get<Entry[]>("/entries");
    dispatch({
      type: "Entry - Fecth-Entries",
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
