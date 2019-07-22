const config = { // DB URL (which is hosted in file directory)
    endpoint: "http://localhost:3000" 
};
function savePost(post){  
    return fetch('http://localhost:3000/posts', {
        method : "POST",
        body : JSON.stringify(post),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res=>res.json());
}

    document.getElementById("test").addEventListener("submit",  (e)=> {
        e.preventDefault();
        getAllData();
        let firstName = document.getElementById("fName").value;
        let lastName = document.getElementById("lname").value;
        let Email = document.getElementById("uEmail").value;
        let Mobile = document.getElementById("mNum").value;
        if(validateData(firstName,Email,Mobile)){
            let body = {
                firstName,
                lastName,
                Email,
                Mobile
            };
            savePost(body); // if validation is done, it will post data to JSON DB
         }else
         { console.log("inCorrect") }
       
    })
var alphaExp = /^[a-zA-Z]+$/;
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var mobileNum = /^\d{10}$/ ;
let fnameErr = document.getElementById("fnameErr");
let emailErr = document.getElementById("emailErr");
let mNumErr = document.getElementById("mNumErr");
function validateData(firstName, Email, Mobile){
    if(firstName.length==0){
        fnameErr.style.color = "red";
        fnameErr.textContent = "Please Enter First Name";
        return false;
    }
    if(firstName==""){
        fnameErr.style.color = "red";
        fnameErr.textContent = "Please Enter Valid Name";
    }
    if(!firstName.match(alphaExp)){
        fnameErr.style.color = "red";
        fnameErr.textContent = "First Name Should Start with Alphabet";
        return false;
    }
    if(Email==""){
        emailErr.style.color = "red";
        emailErr.textContent = "Please Enter Email";
        return false;
    }
    if(!Email.match(mailformat)){
        emailErr.style.color = "red";
        emailErr.textContent = "Please Enter Valid Email";
        return false;
    }
    if (!Mobile.match(mobileNum)){
        mNumErr.style.color = "red";
        mNumErr.textContent = "Please Enter Valid Number";
        return false;
    }
    return true;
}
// function getUser(id) {
//     return fetch('http://localhost:3000/posts/${ id }').then(
//         res => {
//             return res.json();
//         }
//     );
// }
function getPosts() {
    const p = new Promise(function (resolve, reject) {
        fetch('http://localhost:3000/posts')
            .then(res => res.json())
            .then(data => resolve(data));
    });
    return p;
}
let posts ;
let table = document.getElementById("tableData");  // creating a table


async function getAllData() {
    table.innerHTML = "";
    try {
        posts = await getPosts();
        //console.log(posts)
        //const userIds = posts.map(p => console.log(p));
        //const uniqUserIds = _.uniq(userIds);
        //const user = await getUser(1);
        console.log(posts);
        let Colheaders = [];
        for (let i = 0; i < posts.length; i++) {
            for (let key in posts[i]) {
                if (Colheaders.indexOf(key) === -1) {
                    Colheaders.push(key);
                }
            }
        }
        // Colheaders.pop("Id")
        Colheaders.push("Actions");
        console.log(Colheaders);
        let tr = table.insertRow(-1);                   // TABLE ROW
        for (let i = 0; i < Colheaders.length; i++) {
            let th = document.createElement("th");  // TABLE HEADER.
            th.innerHTML = Colheaders[i];
            tr.appendChild(th);
        }
        let button;
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < posts.length; i++) {
            tr = table.insertRow(-1);
            for (let j = 0; j < Colheaders.length-1; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = posts[i][Colheaders[j]];
            }
            
            removeBtn(posts[i][Colheaders[4]]);
        }
        function removeBtn(id) {
            let tabCell = tr.insertCell(-1);
            button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', ' X ');
            button.setAttribute('data-id',id)
            tabCell.appendChild(button);
        };
        // deleting a row
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[5].onclick = function () {
                console.log("-----", this.firstChild.getAttribute('data-id'))
                let index = this.parentElement.rowIndex;
                console.log(table.rows[i])
                if (confirm("Do you want delete ")) {
                    // table.deleteRow(index);
                    console.log("Deleted");
                    delData(this.firstChild.getAttribute('data-id'));
                }

            };
        }
    } catch (err) {
        console.log(err);
    }
}
//Deleting Data from JSON
function delData(id) { 
    return fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
    }).then(res => res.json());
}
getAllData(); //calling to get data into tables dynamically
