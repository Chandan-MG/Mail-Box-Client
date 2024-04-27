import { useEffect, useState } from "react";
import { inboxActions } from "../../Store";

const useFetchInputData = (url, email, dispatch) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dummyEmail = email
                    .toLowerCase()
                    .split("")
                    .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                    .join("");
                const response = await fetch(url.replace('{dummyEmail}', dummyEmail));
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setData(responseData);
                const totalUnreadMessages = responseData.filter(item => !item.isRead).length;
                dispatch(inboxActions.inBoxCount(totalUnreadMessages));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchData();
    }, [url, email, dispatch]);

    return { data, error };
};

export default useFetchInputData;
