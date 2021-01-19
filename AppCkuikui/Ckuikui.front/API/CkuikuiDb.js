

//getAllRecette

export function getallRecetteBySearch(text){
    const url = "http://192.168.0.5:9000/recettes?nom=" + text
    return fetch(url)        
}

export function getRecetteById(id){
    return fetch("http://192.168.0.5:9000/recette/" + id)
    
}