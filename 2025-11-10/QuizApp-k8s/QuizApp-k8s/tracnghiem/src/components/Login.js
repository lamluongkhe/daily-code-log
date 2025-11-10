import React, { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api/Api";
import useStateContext from "../hooks/useStateContext";
import { Link, useNavigate } from "react-router-dom";

const getFreshModel = () => ({
    email: "",
    password: "",
});

export default function Login() {
    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate();

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext();
    }, []);

    const login = (e) => {
        e.preventDefault();
        if (validate()) {
            // Kiểm tra tài khoản tại đây
            createAPIEndpoint(ENDPOINTS.participant)
                .fetch()
                .then((response) => {
                    const foundParticipant = response.data.find(
                        (participant) =>
                            participant.email === values.email &&
                            participant.password === values.password
                    );

                    if (foundParticipant) {
                        if (foundParticipant.email === "Admin@gmail.com") {
                            navigate("/questions");
                        } else {
                            setContext({ participantId: foundParticipant.participantId });
                            navigate("/quiz");
                        }
                    } else {
                        alert("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const validate = () => {
        let temp = {};
        temp.email = /\S+@\S+\.\S+/.test(values.email)
            ? ""
            : "Email không hợp lệ.";
        temp.password = values.password !== "" ? "" : "Vui lòng nhập mật khẩu.";
        setErrors(temp);
        return Object.values(temp).every((x) => x === "");
    };

    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Login
                    </Typography>
                    <Box
                        sx={{
                            "& .MuiTextField-root": {
                                m: 1,
                                width: "90%",
                            },
                        }}
                    >
                        <form noValidate autoComplete="on" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })}
                            />
                            <TextField
                                label="Mật khẩu"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ m: 1, width: "90%" }}
                            >
                                Login
                            </Button>
                        </form>
                    </Box>
                </CardContent>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link to="/register" style={{ color: "red", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
                        Register
                    </Link>
                </div>
            </Card>
        </Center>
    );
}