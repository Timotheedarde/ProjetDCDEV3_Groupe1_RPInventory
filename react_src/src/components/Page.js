import React from "react";

import { useHistory } from "react-router-dom";

export default function Page(props) {


    let history = useHistory();

    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => history.push(props.nextPage)}>Page suivante</button>
        </div>
    );
}