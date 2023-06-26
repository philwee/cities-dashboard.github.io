// disable eslint for this file
/* eslint-disable */

// import libraries
import { useState, useEffect, createContext } from 'react';
import { WEBSITE_ID } from '../Components/CommentSection';
// create context
export const CommentCountsContext = createContext();

// context provider
export const CommentCountsProvider = (props) => {
    // state to store data
    const [commentCounts, setCommentCounts] = useState({});

    useEffect(() => {
        fetchCommentCounts().then((data) => {
            setCommentCounts(data);
        });
    }, []);

    const fetchCommentCounts = async () => {
        let commentCountsForAllPages = {};
        try {
            const response = await fetch(`https://talk.hyvor.com/api/v1/pages?website_id=${WEBSITE_ID}`);
            const jsonData = await response.json();
            // Simplify the json response into one object containing just the comments_count of each project
            jsonData.data.forEach((item) => {
                commentCountsForAllPages[item["page_identifier"]] = item["comments_count"];
            });
            return commentCountsForAllPages;
        } catch (error) {
            console.log('Error fetching comment counts data:', error);
            return commentCountsForAllPages;
        }
    };

    // return context provider
    return (
        <CommentCountsContext.Provider value={[commentCounts]}>
            {props.children}
        </CommentCountsContext.Provider>
    );
};
