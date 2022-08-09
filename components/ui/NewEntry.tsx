import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { SaveOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputVale, setInputVale] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const onSave = () => {
    if (inputVale.length === 0) return;
    addNewEntry(inputVale);
    setInputVale("");
    setIsTouch(false);
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {!isAddingEntry ? (
        <Button
          startIcon={<AddCircleOutlineOutlined />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Add task
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={inputVale.length <= 0 && isTouch && "Add a new value"}
            error={inputVale.length <= 0 && isTouch}
            variant="outlined"
            value={inputVale}
            onChange={(e) => setInputVale(e.target.value)}
            onBlur={() => setIsTouch(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="primary"
              onClick={() => setIsAddingEntry(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
