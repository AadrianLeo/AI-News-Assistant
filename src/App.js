import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers';

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticals, setNewArticles] = useState([]);
    
    const classes = useStyles();

    const alanKey = 'ALAN_AI_KEY_HERE';

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewArticles(articles);
                  setActiveArticle(-1);
                } else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
              },
            });
          }, []);

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticals} activeArticle={activeArticle} />
        </div>
    );
}

export default App;
