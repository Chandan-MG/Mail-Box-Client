// useFetchInboxItems.js
import { useEffect, useState } from "react";

const useFetchInboxItems = (email, dispatch) => {
    const [inboxItems, setInboxItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInboxItems = async () => {
            const dummyEmail = email
                .toLowerCase()
                .split("")
                .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
                .join("");
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/mailbox/recieved/${dummyEmail}/Inbox.json`);
                if (response.ok) {
                    const inboxItemsObject = await response.json();
                    if (inboxItemsObject) {
                        const inboxItemsArray = Object.keys(inboxItemsObject).map(key => ({
                            id: key,
                            ...inboxItemsObject[key]
                        }));
                        setInboxItems(inboxItemsArray);
                        const totalUnreadMessages = inboxItemsArray.filter(item => !item.isRead).length;
                        dispatch(inboxActions.inBoxCount(totalUnreadMessages));
                    } else {
                        console.log('No inbox items found.');
                        setInboxItems([]);
                    }
                } else {
                    console.error('Error fetching inbox items:', response.status, response.statusText);
                    setError('Failed to fetch inbox items');
                }
            } catch (error) {
                console.error('Error fetching:', error);
                setError('Failed to fetch inbox items');
            }
        };

        fetchInboxItems();
    }, [email, dispatch]);

    return { inboxItems, error };
};

export default useFetchInboxItems;
