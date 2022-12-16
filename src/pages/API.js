import React from 'react';
import { ProfileData } from "../components/ProfileData";
import { InteractionType } from "@azure/msal-browser";
import {useMsalAuthentication} from "@azure/msal-react";
import {useState, useEffect} from "react";

import {fetchData} from "../fetch";

export const Api = () => {
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

          const onload = async () =>{
               
               const response = await fetch("https://fef.amsub0202.manage.microsoft.com/ReportingService/DataWarehouseFEService?api-version=v1.0", {
                    method: 'GET',
                    headers: {'Authorization': 'Bearer' + accessToken},
                    redirect: 'follow'
               })

               const data = await response.json()
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
          } 

     }, [graphData,error,result]);

     
    


    return (
        <>
            {graphData ? <ProfileData graphData={graphData} /> : null}
            {data}
        </>
    )
}