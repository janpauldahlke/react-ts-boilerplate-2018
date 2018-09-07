 const throttle = (callback: any, limit:number) => {
  let wait = false;                  
  return  () => {              
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