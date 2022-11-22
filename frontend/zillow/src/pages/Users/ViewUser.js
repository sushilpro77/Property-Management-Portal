import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {get} from "../../api";
import {Button, Grid} from "@mui/material";

const ViewUser = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [entity, setEntity] = useState([]);

    useEffect(() => {
        get("/api/users/" + params.id).then(res => {
            let temp = [];
            for(let key in res.data){
                let val = res.data[key];
                if(typeof val === "string" || typeof val === "number")
                    if(val)
                        temp.push(key + " : " + val);
            }
            setEntity(temp);
        })
    }, [params]);

    return (
        <div>
            {entity.map((item) => (
                <div>{item}</div>
            ))}
            <Grid item>
                <Button variant="contained" color={"secondary"} onClick={() => navigate(-1)}>Back</Button>
            </Grid>
        </div>
    )
}
export default ViewUser;