import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";
import { entriesAPI } from "../../apis";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesAPI.post<Entry>("entries", { description });

    dispatch({
      type: "Entry - Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesAPI.put<Entry>(`entries/${_id}`, {
        description,
        status,
      });

      if (showSnackbar)
        enqueueSnackbar("Entry updated", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });

      dispatch({
        type: "Entry - Update-Entry",
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async ({ _id }: Entry, showSnackbar: boolean = false) => {
    console.log("hola");

    try {
      await entriesAPI.delete(`entries/${_id}`);

      if (showSnackbar)
        enqueueSnackbar("Entry deleted", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });

      dispatch({
        type: "Entry - Delete-Entry",
        payload: { _id },
      });z
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
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
