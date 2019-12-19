document.addEventListener("DOMContentLoaded",()=>{
    let form = document.querySelector("form");
    let list = document.querySelector("ul");
    let input = document.querySelector("#review");
    let h3 = document.createElement("h3");

    // let h1 = document.createElement("h1");
    // h1.innerText = "Ghibli Review App";
    // body.appendChild(h1);
    let select = document.querySelector("select");
    const getFilms = async () =>{
        try{
            let res = await axios.get(`https://ghibliapi.herokuapp.com/films`);
            let films = res.data;
            films.forEach(film => {
                let option = document.createElement("option");
                option.innerText = film.title;
                option.value = film.url;
                // debugger
                select.appendChild(option);               
            });
        }
        catch(error){
            console.log(error)
        }
    }
    const filmDescription = async (url) =>{
        try{
            let res = await axios.get(url);
            let title = res.data.title;
            let release = res.data.release_date;
            let description = res.data.description;
            let div = document.querySelector("div");
            div.innerHTML = ""
            h3.innerText = title
            div.appendChild(h3);
            let p = document.createElement("p");
            p.innerText = release;
            div.appendChild(p);
            let pDescription = document.createElement("p");
            pDescription.innerText = description;
            div.appendChild(pDescription)
            // debugger
        }catch(error){
        }
    }
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        let p = document.createElement("p")
        let error = document.querySelector("p")
        if(input.value === ""){
            if(!error){
                p.innerText = "ERROR"
                document.body.appendChild(p)
            }
        }else{
            let li = document.createElement("li");
            li.innerText = `${h3.innerText}: ${input.value}`
            list.appendChild(li)
        }
        
        input.value = "";
    })
    getFilms()
    select.addEventListener("change",(el)=>{
        filmDescription(el.target.value);
    })
})