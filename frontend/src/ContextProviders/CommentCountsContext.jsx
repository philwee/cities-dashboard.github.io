// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, useEffect, createContext } from 'react';
import { WEBSITE_ID } from '../Components/CommentSection';
// import data
import json_data from '../temp_database.json';
// create context
export const CommentCountsContext = createContext();

const getCommentCountsForAllPages = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://talk.hyvor.com/api/v1/pages?website_id=${WEBSITE_ID}`);
            const jsonData = await response.json();

            let commentCountsForAllPages = {};
            jsonData.data.forEach((item) => {
                commentCountsForAllPages[item["page_identifier"]] = item["comments_count"];
            });
            setData(commentCountsForAllPages);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return data;
}

// context provider
export const CommentCountsProvider = (props) => {
    // state to store data
    const [data, setData] = useState({});

    // Get the number of comments of all the projects
    const commentCountsForAllPages = getCommentCountsForAllPages();

    useEffect(() => {
        let commentCountsData = {};
        // loop through temp_database.json
        json_data.map((item) => {
            commentCountsData[item.id] =
            {
                id: item.id,
                commentCounts: commentCountsForAllPages && commentCountsForAllPages[item.id],
            };

            setData(commentCountsData);
        });
    }, [commentCountsForAllPages]);

    // return context provider
    return (
        <CommentCountsContext.Provider value={[data, setData]}>
            {props.children}
        </CommentCountsContext.Provider>
    );
};
