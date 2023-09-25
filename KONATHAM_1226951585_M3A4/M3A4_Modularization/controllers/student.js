const students = []; // array of students objects acting as storage

const getSpecificStudent = (req, res) => {
    const id = req.params.id;

    const currentStudent = students[id];
    if (currentStudent === undefined) {
        res.send(`Student with the  ${id} is not found`);
    }
    res.send(`Student with the  ${id} is ${currentStudent.fname} ${currentStudent.mname} ${currentStudent.lname}`);

}
const getStudents = (req, res) => {

    res.send(students);
}
const addStudents = (req, res) => {
    const student = req.body;
    students.push(student);
    res.send(`Student with the name ${student.fname} ${student.mname} , ${student.lname} added to the database`);

}

const updateStudent = (req, res) => {
    const id = req.params.id;
    const student = req.body;
    students[id] = student;
    res.send(`Student with the id  ${id} has been updated`);
}

const deleteStudent = (req, res) => {
    const id = req.params.id;
    const student = students[id]
    students.splice(id, 1);
    res.send(`Student with the id  ${id} has been deleted`);
}

module.exports = {
    getSpecificStudent,
    getStudents,
    addStudents,
    updateStudent,
    deleteStudent

}