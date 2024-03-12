import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as React from "react";

export default function EditButton() {

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                sx={{
                    width: '100%',
                    color: 'white',
                    backgroundColor: '#5DB58A',
                    '&:hover': {
                        backgroundColor: '#4C9B73',
                    }
                }}
            >
                EDIT
            </Button>
        </Stack>
    )
}