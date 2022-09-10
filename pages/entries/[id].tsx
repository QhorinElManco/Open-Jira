import { GetServerSideProps } from "next";
import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { FC, useContext, useMemo, useState } from "react";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const isValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  const onDelete = () => {
    deleteEntry(entry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entry"
              subheader={`Created at ${dateFunctions.getFormatDiscanceToNow(entry.createdAt)}`}
            ></CardHeader>
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                label="New entry"
                multiline
                placeholder="New entry"
                sx={{ marginTop: 2, marginBottom: 2 }}
                onBlur={() => setTouched(true)}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                helperText={isValid && "Enter new value"}
                error={isValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EntryStatus)}
                >
                  {validStatus.map((status) => (
                    <FormControlLabel
                      control={<Radio />}
                      key={status}
                      label={capitalize(status)}
                      value={status}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                onClick={onSave}
                disabled={inputValue.length <= 0}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 20,
          backgroundColor: "primary.main",
        }}
        onClick={onDelete}
      >
        <DeleteOutlined />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  console.log(entry);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
