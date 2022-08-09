let input_drop = document.getElementById("drop-input");
let dropzone = document.querySelector(".dropzone");
let table = document.getElementById("table-content");
let c = 0;
dropzone.addEventListener("dragover", function(e){
    e.preventDefault();
})
dropzone.addEventListener("drop", function(e){
    e.preventDefault();
    console.log(e);
    let files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    let fileReader = new FileReader();
    if (file.type.includes("image/")){
        fileReader.readAsDataURL(file);
        let image = document.createElement("img");
        fileReader.addEventListener("loadend", function () {
            image.src = fileReader.result;
            image.style.height = "90px"
        })
        CreateElement(file.name, file.type, (file.size/1024).toFixed(2), image);
    }
    else
        {
            alert("CHOOSE THE CORRECT FORMAT!")
        }
  });
})
input_drop.addEventListener("change", function(event){
    console.log(event);
    let fileReader = new FileReader();
    let files = Array.from(event.target.files);
    files.forEach((file) => {
        if (file.type.includes("image/")){
            fileReader.readAsDataURL(file);
            
            let image = document.createElement("img");
            fileReader.addEventListener("loadend", function () {
                image.src = fileReader.result;
                image.style.height = "90px"
            })
            
            CreateElement(file.name, file.type, (file.size/1024).toFixed(2), image);
        }
        else
        {
            alert("CHOOSE THE CORRECT FORMAT!")
        }
      });
})


function CreateElement(name, type, size, image)
{
    c++;
    let counter_td = document.createElement("td");
    let row = document.createElement("tr");
    row.id = c;
    let name_td = document.createElement("td");
    name_td.innerText = name;
    name_td.className = "name_td"
    let preview = document.createElement("td");
    preview.append(image);


    let type_td = document.createElement("td");
    type_td.innerText = type;
    let size_td = document.createElement("td");
    size_td.innerText = `${size} kb`;
    let closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.className = "btn btn-outline-danger";
    let close_td = document.createElement("td");
    close_td.append(closeButton);
    closeButton.addEventListener("click", function(e){
        e.target.parentElement.parentElement.remove();
        UpdateElements();
    })
    row.append(counter_td,name_td,preview, size_td, type_td, close_td);
    table.append(row);
    
    UpdateElements();

}
function UpdateElements()
{
    let tableList = table.getElementsByTagName("tr");
   let count = tableList.length;
  
    for (let i = 0; i < count; i++)
    {
        let counter_td = tableList[i].firstElementChild;
        counter_td.innerText= `#${i+1}`;
       
        
    }
}

