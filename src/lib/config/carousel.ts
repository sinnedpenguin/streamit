export const options = { 
  type: 'slide',
  pagination: false,
  gap: '0.1rem',
  perMove: 1,
  padding: {
    right: "1.5rem"
  },
  breakpoints: {
    0: { 
      perPage: 1,
      arrows: false,
    }, 

    375: { 
      perPage: 2,
      arrows: false
    }, 
  
    464: { 
      perPage: 2,
      arrows: false
    }, 
  
    540: { 
      perPage: 3,
      arrows: false
    }, 
    
    820: {
      perPage: 3,
    }, 
  
    912: {
      perPage: 3,
    }, 
  
    1024: { 
      perPage: 5,
    }, 
  
    3000: { 
      perPage: 7,
    } 
  }
} 