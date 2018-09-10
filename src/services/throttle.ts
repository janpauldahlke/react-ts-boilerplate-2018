 const throttle = (callback: any, limit:number) : () => void => {
  let wait : boolean = false;                  
  return () => {              
      if (!wait) {                   
          callback.call();         
          wait = true;              
          setTimeout(function () {  
              wait = false;          
          }, limit);
      }
  };
};

export default throttle;