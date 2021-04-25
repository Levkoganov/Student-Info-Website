// PAGE LOADER
window.addEventListener('load', () => {
  console.log('lev.20133@gmail.com');
  console.log('317975266');

  // VARS
  let loginForm = document.getElementById('loginForm'); //LOGIN FORM
  let navBar = document.getElementById('navBar'); // NAVBAR
  let footer = document.getElementById('footer'); //FOOTER
  let errorMsg = document.getElementById('msg'); // ERROR DIV
  let student = document.getElementById('student'); // STUDENT LINK
  let course = document.getElementById('course'); // COURSE LINK
  let calendar = document.getElementById('calendar'); // CALENDER LINK
  let logout = document.getElementById('logout'); // LOGOUT LINK
  let containerOutPut = document.getElementById('container'); // OUTPUT DIV

  //AddEventListeners(SUBMIT[LOGIN])
  loginForm.addEventListener('submit', login);

  //StudentInfo FUNCTION(API REQUEST WITH FETCH)
  function login(e) {
    e.preventDefault();
    email = document.getElementById('exampleInputEmail1').value; // EMAIL INPUT
    password = document.getElementById('exampleInputPassword1').value; // PASS INPUT
    let url = `https://rt-students.com/api/getStudent/${email}&${password}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let studentApiInfo = `
            <h1 class="text-center student-header">Student Info</h1>
            `;
        data.forEach((studentdata) => {
          console.log(studentdata);
          if (studentdata) {
            loginForm.style.display = 'none'; // LoginForm Display None
            navBar.style.display = 'block'; // Display navBar
            footer.style.display = 'block'; // Display footer
          }
          studentApiInfo +=
            // Append (StudentApiInfo)
            `
                <div class="row student-row">
                    <div class="col-3">
                        <ul class="list-group list-group-flush" id="overflow">
                            <li class="list-group-item odd-list">ID:</li>
                            <li class="list-group-item border">Name:</li>
                            <li class="list-group-item odd-list">Familyname:</li>
                            <li class="list-group-item border">Address:</li>
                            <li class="list-group-item odd-list">Email:</li>
                            <li class="list-group-item border">Phonenumber:</li>
                            <li class="list-group-item odd-list">RegisterDate:</li>
                        </ul>
                    </div>
                    <div class="col-9">
                        <ul class="list-group list-group-flush" id="overflow">
                            <li class="list-group-item odd-list">${studentdata.studentID}</li>
                            <li class="list-group-item border">${studentdata.firstName}</li>
                            <li class="list-group-item odd-list">${studentdata.familyName}</li>
                            <li class="list-group-item border">${studentdata.address}</li>
                            <li class="list-group-item odd-list">${studentdata.email}</li>
                            <li class="list-group-item border">${studentdata.mobileNumber}</li>
                            <li class="list-group-item odd-list">${studentdata.registeryDate}</li>
                        </ul>
                    </div>
                </div>
                `;
        });
        containerOutPut.innerHTML = studentApiInfo; // OUTPUT STRING INTO EMPTY DIV
      })

      // EEROR OUTPUT
      .catch(() => {
        errorMsg.innerHTML = 'invalid code';
        setTimeout(() => (errorMsg.innerHTML = ''), 2000);
      });
  }

  //AddEventListeners(ClICK)[Student]
  student.addEventListener('click', studentInfo);

  //CourseInfo FUNTION(API REQUEST WITH FETCH)
  function studentInfo() {
    let urlStudent = `https://rt-students.com/api/getStudent/${email}&${password}`;
    console.log(urlStudent);
    fetch(urlStudent)
      .then((res) => res.json())
      .then((data) => {
        let studentData = `
            <h1 class="text-center student-header">Student Info</h1>
            `;
        data.forEach((data) => {
          studentData += `
                <div class="row student-row">
                    <div class="col-3">
                        <ul class="list-group list-group-flush" id="overflow">
                            <li class="list-group-item odd-list">ID:</li>
                            <li class="list-group-item border">Name:</li>
                            <li class="list-group-item odd-list">Familyname:</li>
                            <li class="list-group-item border">Address:</li>
                            <li class="list-group-item odd-list">Email:</li>
                            <li class="list-group-item border">Phonenumber:</li>
                            <li class="list-group-item odd-list">RegisterDate:</li>
                        </ul>
                    </div>
                    <div class="col-9">
                        <ul class="list-group list-group-flush" id="overflow">
                            <li class="list-group-item odd-list">${data.studentID}</li>
                            <li class="list-group-item border">${data.firstName}</li>
                            <li class="list-group-item odd-list">${data.familyName}</li>
                            <li class="list-group-item border">${data.address}</li>
                            <li class="list-group-item odd-list">${data.email}</li>
                            <li class="list-group-item border">${data.mobileNumber}</li>
                            <li class="list-group-item odd-list">${data.registeryDate}</li>
                        </ul>
                    </div>
                </div>
                `;
        });
        containerOutPut.innerHTML = studentData; // OUTPUT STRING INTO EMPTY DIV
      })
      // error
      .catch((error) => {
        console.log('error:', error);
      });
  }

  //AddEventListeners(ClICK)[Course]
  course.addEventListener('click', courseInfo);

  //CourseInfo FUNTION(API REQUEST WITH FETCH)
  function courseInfo() {
    let urlCourse = `https://rt-students.com/api/getCourses/${password}`;
    console.log(urlCourse);
    fetch(urlCourse)
      .then((res) => res.json())
      .then((data) => {
        let courseApi = `
            <table class="table table-striped table-hover">
                <thead>
                    <th scope="col" colspan="5" class="text-center table-header">
                        <h1>Course Info</h1>
                     </th>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Exam Score</th>
                            <th scope="col">Project Score</th>
                            <th scope="col">Course Name</th>
                        </tr>
                </thead>
                <tbody>
            `;
        for (let i in data) {
          courseApi +=
            '<tr scope="row"> <td>' +
            data[i].code +
            '</td> <td>' +
            data[i].student +
            '</td> <td>' +
            data[i].examMark +
            '</td> <td>' +
            data[i].projectMark +
            '</td> <td>' +
            data[i].courseName +
            '</td> </tr>';
        }
        containerOutPut.innerHTML = courseApi; // OUTPUT STRING INTO EMPTY DIV
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }

  //AddEventListeners(ClICK)[Student]
  calendar.addEventListener('click', calendarInfo);

  //CalendarInfo FUNTION(API REQUEST WITH FETCH)
  function calendarInfo() {
    let urlCalendar = `https://rt-students.com/api/getCalendar/${password}`;
    fetch(urlCalendar)
      .then((res) => res.json())
      .then((data) => {
        let CalendarApi = `
            <table class="table table-striped table-hover">
                <thead>
                    <th scope="col" colspan="7" class="text-center table-header">
                        <h1>Calendar Info</h1>
                    </th>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">sessionNum</th>
                        <th scope="col">locationID</th>
                        <th scope="col">sessionType</th>
                        <th scope="col">teacher</th>
                        <th scope="col">sessionDate</th>
                        <th scope="col">sessionEndDate</th>
                    </tr>
                </thead>
                <tbody>
            `;
        for (let i in data) {
          CalendarApi +=
            '<tr scope="row"> <td>' +
            data[i].code +
            '</td> <td>' +
            data[i].sessionNum +
            '</td> <td>' +
            data[i].locationId +
            '</td> <td>' +
            data[i].sessionType +
            '</td> <td>' +
            data[i].teacher +
            '</td> <td>' +
            data[i].sessionDate +
            '</td> <td>' +
            data[i].sessionEndDate +
            '</td> </tr>';
        }
        containerOutPut.innerHTML = CalendarApi; // OUTPUT STRING INTO EMPTY DIV
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }
  // LOGOUT FUNCTION
  logout.addEventListener('click', () => {
    loginForm.reset();
    loginForm.style.display = 'block';
    navBar.style.display = 'none';
    footer.style.display = 'none';
  });
}); // WINDOW LOADER
