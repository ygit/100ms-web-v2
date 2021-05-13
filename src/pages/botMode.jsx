import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import getToken from "../utlis/index";

const username = "live-stream-bot";
const role = "viewer"

export const BotMode = () => {
    const history = useHistory();
    const { endpoint, roomId } = useParams();
    const { setLoginInfo } = useContext(AppContext);
    if (!endpoint || !roomId) {
        history.push("/")
    }
    getToken(username, role, roomId)
        .then((token) => {
            setLoginInfo({
                token: token,
                username: username,
                role: role,
                roomId: roomId,
                endpoint: endpoint + "/init/",
                audioMuted: true,
                videoMuted: true,
                selectedVideoOutput: 'default',
                selectedAudioInput: 'default',
                selectedAudioOutput: 'default'
            })
            history.push(`/meeting/${roomId}`);
        })
        .catch((error) => {
            console.log("Token API Error", error);
            alert("Unable to generate token");
        });

    return (
        <div>
            Loading... Please wait
        </div>
    );
};
