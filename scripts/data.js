async function getPhotographers() {
    const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
  
    const data = await response.json();
  
    return data.photographers;
  }

  async function getPhotographerById(id) {
    const response = await fetch("http://127.0.0.1:5500/data/photographers.json");
  
    const data = await response.json();
  
    let photographerList = data.photographers;
    console.log(id)
    console.log(photographerList)
    let photographerToFind = null

    photographerList.forEach((photographer) => {
        
        if(id==photographer.id){
           photographerToFind = photographer
        } 


    })
    return photographerToFind
  }
    
