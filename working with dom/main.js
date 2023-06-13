let data = [];

    function save(){
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let city = document.getElementById('city').value;
        let age = document.getElementById('age').value;
        let obj = {
            userid : Math.floor(Math.random() * 10000),
            username : name,
            useremail : email,
            userpassword : password,
            usercity : city,
            userage : age
        }
        if(localStorage.getItem('user')=== null || localStorage.getItem('user') === undefined){
                data.push(obj);
            localStorage.setItem('user',JSON.stringify(data));
        }else{
            let val = JSON.parse(localStorage.getItem('user'));
            val.push(obj);
            localStorage.setItem('user',JSON.stringify(val));
        }
        alert("Record successfully insert");
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('city').value = "";
        document.getElementById('age').value = "";
       viewdata();
    }
    function fetchData() {
        fetch('data.json')
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            show();
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
      
    const viewdata = () =>
    {
        document.getElementById('edit').style.display = "none";
        let val = JSON.parse(localStorage.getItem('user'));   
        let tbl = "";
        for(let i in val)
        {
            tbl += `
                        <tr>
                            <td>${val[i].userid}</td>
                            <td>${val[i].username}</td>
                            <td>${val[i].useremail}</td>
                            <td>${val[i].userpassword}</td>
                            <td>${val[i].usercity}</td>
                            <td>${val[i].userage}</td>
                            <td>
                                <button onclick='deleteData(${val[i].userid})'>Delete</button>
                                <button onclick='editData(${val[i].userid})'>Edit</button>
                            </td>
                        </tr>
                    `
        }
        document.getElementById('record').innerHTML = tbl;
    }
    viewdata();
    function deleteData(userid){
        let val = JSON.parse(localStorage.getItem('user'));
        
        for(let i in val){
            if(val[i].userid == userid)
            {
                val.splice(i,1);
            }
            localStorage.setItem('user',JSON.stringify(val));
        }
        alert("record successfully delete");
       viewdata();
    }
    function editData(userid){
        document.getElementById('edit').style.display = "block";
       document.getElementById('save').style.display = "none";
       let val = JSON.parse(localStorage.getItem('user'));
      
       for(let i in val){
            if(val[i].userid == userid){
                document.getElementById('userid').value = val[i].userid;
                document.getElementById('name').value = val[i].username;
                document.getElementById('email').value = val[i].useremail;
                document.getElementById('password').value = val[i].userpassword;
                document.getElementById('city').value = val[i].usercity;
                document.getElementById('age').value = val[i].userage;
            }
       }
    }
    function edit(){
        let id = document.getElementById('userid').value;
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let city = document.getElementById('city').value;
        let age = document.getElementById('age').value;

        let val = JSON.parse(localStorage.getItem('user'));
        for(let i in val){
            if(val[i].userid == id){
                val[i].username  = name;
                val[i].useremail  = email;
                val[i].userpassword  = password;
                val[i].usercity  = city;
                val[i].userage  = age;
            }
            localStorage.setItem('user',JSON.stringify(val));
        }
        alert("Reocrd successfully update");
        document.getElementById('userid').value = "";
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('city').value = "";
        document.getElementById('age').value = "";
        document.getElementById('save').style.display = "block";
        document.getElementById('edit').style.display = "none";
        viewdata();
    }

    // function clearLocalStorage() {
    //     localStorage.removeItem('user');
    //     alert('Local storage cleared.');
    //     viewdata();
    // }

    function clearLocalStorage() {
        localStorage.removeItem('user');
        alert('Local storage cleared.');
        viewdata();
    }
    
    document.getElementById('clearButton').addEventListener('click', clearLocalStorage);
    
    
    viewdata();




