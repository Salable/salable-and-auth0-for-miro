import React, {useState } from "react";

export const SaaSProduct = () => {  
    const [quote, setQuote] = useState("")
    const magicNumber = Math.floor(Math.random() * 100) 
    function useOnceCall(cb, condition = true) {
        const isCalledRef = React.useRef(false);
      
        React.useEffect(() => {
          if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
          }
        }, [cb, condition]);
    }
    useOnceCall(async () => {
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setQuote(data[magicNumber].text)
        });  
    })
  return (
        <div>
        {quote}    
        </div>
  );
};