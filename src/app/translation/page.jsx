"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const PageView = () => {
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/translated`, { withCredentials: true });
                console.log(response.data);
                // Handle the response data
            } catch (error) {
                console.error("Error fetching translation data:", error);
            }
        };

        fetchData();
    }, []);

    return <>
        <div>
            <h1>Translation Page</h1>
        </div>
    </>
}

export default PageView;