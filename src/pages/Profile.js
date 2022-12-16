import React from 'react';
import { ProfileData } from "../components/ProfileData";
import { InteractionType } from "@azure/msal-browser";
import {useMsalAuthentication, useMsal} from "@azure/msal-react";
import {useState, useEffect} from "react";

import {fetchData} from "../fetch";

export const Profile = () => {

    const infos = useMsal();
    const loSto = sessionStorage.getItem('e750fb61-c023-456b-a16a-7e17ea7ecdd5.89cd3d54-4149-4b03-a06f-1e4526d82250-login.windows.net-idtoken-aef2a9a8-86e2-44f5-89c3-165a47082917-89cd3d54-4149-4b03-a06f-1e4526d82250---');
    const parseloSto = JSON.parse(loSto);

    console.log(parseloSto.secret);

    console.log(infos);

    const [graphData, setGraphData] = useState(null);
    const {result,error} = useMsalAuthentication(InteractionType.Popup, {
        scopes: ['user.read']
    });

    useEffect(() => {
        if (!!graphData){
            return;
        }

        if (!!error){
            console.log(error);
            return;
        }

        if (result){
            const {accessToken} = result;
            
            fetchData('https://graph.microsoft.com/v1.0/me', accessToken)
                .then(response => setGraphData(response))
                .catch(error => console.log(error))

        }

        const intune = async () => {
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJhZWYyYTlhOC04NmUyLTQ0ZjUtODljMy0xNjVhNDcwODI5MTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vODljZDNkNTQtNDE0OS00YjAzLWEwNmYtMWU0NTI2ZDgyMjUwL3YyLjAiLCJpYXQiOjE2NzExMTI5ODYsIm5iZiI6MTY3MTExMjk4NiwiZXhwIjoxNjcxMTE2ODg2LCJuYW1lIjoiQmVub2l0IExvbmRlcm8iLCJub25jZSI6ImRkNTY5MWY2LWE3YTktNDk0Yi1hMzRlLWRmYTRhYWQwZGVkNCIsIm9pZCI6ImU3NTBmYjYxLWMwMjMtNDU2Yi1hMTZhLTdlMTdlYTdlY2RkNSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJlbm9pdEBhaGdlbmN5LmJlIiwicmgiOiIwLkFSOEFWRDNOaVVsQkEwdWdieDVGSnRnaVVLaXA4cTdpaHZWRWljTVdXa2NJS1JjZkFNQS4iLCJzdWIiOiJnMllqbUgyWnp0QmRXR1ludmhPSkhBOS1jMUNBY0JhQ0d0YVpEZG9Eckg4IiwidGlkIjoiODljZDNkNTQtNDE0OS00YjAzLWEwNmYtMWU0NTI2ZDgyMjUwIiwidXRpIjoiSUZ1ejlTdXNHMFdTSm96X1g0ZjhBQSIsInZlciI6IjIuMCJ9.nf0ibFke3UKhtDV_h1hbFK3GChk5xHdQpOk2LMZN5NNdS2vBYVf7SZkbubLtNetKhYhZ51SLCc3I48l41d-ORJ6i3weL3f-B0a-mpPVmvI9LAS-VqBOBJFdlPGdhTUi14UBUiTrMoemVZTR1m6sA86gXEcJB_kY7q1Zq1yFDyE7BgCKBkJs1B5cyRqVdPhYsFuEMVoLonw6cMxOMMxu8a0wDr6fjeOYeeV4eCpp8ETNq0fYjjVDTn9uRb_grGDueMgYYUzOJvIaweea3VmvpMwPgNR96z0a6S7b8cJ1frmleEa4ig9CdeVXb7p3F72R-_8l-CQgwm5LnJEvlcMMEAA");
            myHeaders.append('Access-Control-Allow-Headers', 'http://localhost:3000');

            
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }

            fetch("https://fef.amsub0202.manage.microsoft.com/ReportingService/DataWarehouseFEService?api-version=v1.0", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error))
        }

        intune();

    }, [graphData,error,result]);

    return (
        <>
            {graphData ? <ProfileData graphData={graphData} /> : null}
        </>
    )
}

