import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../api/Api";
import useStateContext from "../hooks/useStateContext";
import { Link, useNavigate } from "react-router-dom";

const getFreshModel = () => ({
    email: '',
    password: ''
})

export default function Register() {
    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate();

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext();
    }, [])

    const register = (e) => {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then((response) => {
                    setContext({ participantId: response.data.participantId });
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    }

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.password = values.password !== "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every((x) => x === "")
    }

    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Register
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="on" onSubmit={register}>
                            <TextField label="Email" name="email" value={values.email} onChange={handleInputChange} variant="outlined" {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField label="Password" name="password" value={values.password} onChange={handleInputChange} variant="outlined" {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button type="submit" variant="contained" size="large" sx={{ m: 1, width: '90%' }}>Register</Button>
                        </form>
                    </Box>

                </CardContent>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link to="/" style={{ color: "red", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
                        Login
                    </Link>
                </div>
            </Card>

        </Center>
    )
}