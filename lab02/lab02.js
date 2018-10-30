// lab02 is a file demonstrating the knowledge learned from lab 02 of CS 336
//
// Made by Oshomah Agbugui
// Date: 9-12-18

// The following method is based on code from Naveen Jose
// Found at: http://jsfiddle.net/codeandcloud/n33RJ/
function ageFromDate(birthdate) {
	let today = new Date();
	let birth = new Date(birthdate);

	let age = today.getFullYear() - birth.getFullYear();

	if (today.getMonth() <= birth.getMonth() && today.getDate() < birth.getDate()) {
		age--;
	}

	return age;
}

// Defines a person prototype
function Person(name, birthdate, friends) {
	this.name = name;
	this.birthdate = birthdate;
	this.friends = friends;
}

// Change the name of the person
Person.prototype.changeName = function(newName) {
	this.name = newName;
}

// Retrieve a string representing the age of the person
Person.prototype.getAge = function() {
	return ageFromDate(this.birthdate);
}

// Adds a new friend to the list of friends
Person.prototype.addFriend = function(newFriend) {
	this.friends[this.friends.length] = newFriend;
}

// Makes this person greet you
Person.prototype.greet = function() {
	console.log("Hello! I am a person.");
}

Person.prototype.toString = function() {
	return this.name;
}


// Test Code

let p = new Person("Ama", "2000-10-2", []);
let p2 = new Person("Tim", "2005-2-22", []);
let p3 = new Person("Mickey", "2001-4-18", []);

p.addFriend(p2);
p.addFriend(p3);
p2.addFriend(p);
p3.addFriend(p);

console.log(p.name + " is " + p.getAge() + " years old.");
p.greet();
console.log(p.name + "'s friends: " + p.friends);

console.log(p2.name + " is " + p2.getAge() + " years old.");
p2.greet();
console.log(p.name + "'s friends: " + p2.friends);

console.log(p3.name + " is " + p3.getAge() + " years old.");
p3.greet();
console.log(p.name + "'s friends: " + p3.friends);





// Student Code

function Student(name, birthdate, friends, subject) {
	Person.call(this, name, birthdate, friends);
	this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.greet = function() {
	console.log("Hello! I am a student.");
}





// Test Code

// Make some new students 
let s = new Student("John", "1990-2-14", [], "Geography");
let s2 = new Student("Mathew", "1758-8-26", [], "Physics");

// Make sure students can add friends
s.addFriend(s2);
s2.addFriend(p);
s2.addFriend(s);
console.log(s);
console.log(s2);

// Make sure both of these are true
console.log(s instanceof Student);
console.log(p instanceof Person);