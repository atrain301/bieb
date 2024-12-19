import { User } from "../models/User";
import { Question } from "../models/Question";
import { api } from "@hboictcloud/api";
import { revealPassword, yearsExperienceButton, updateUsername } from "../controller/profileController";
import { updateEmail, updatePassword, expertiseButton } from "../controller/profileController";
import { dateOfBirthButton, changeProfilePicture, getProfilePicture } from "../controller/profileController";
import { navBar } from "../controller/navController";
import { Answer } from "../models/Answer";

await navBar();

const profileLinkNav: HTMLLinkElement | null = document.querySelector("#profileLinkNav");

if (profileLinkNav) {
    profileLinkNav.innerHTML = "<a href='/profile.html' id='profileLinkNav' class='active'>" +
    "<img src='/assets/img/defProfilePicture.jpg'></img>Profile</a>";
}

try {
    api.configure({
        url: "https://api.hbo-ict.cloud",
        apiKey: "pb2sef2425_feevaayaahoo15.YAR71sKJ8ob6nwxk",
        database: "pb2sef2425_feevaayaahoo15_dev",
        environment: "dev",
    });
}

catch (reason) {
    console.error(reason);
}

// HTML body elements
const usernameProfile: HTMLBodyElement | null = document.querySelector("#usernameProfile");
const emailProfile: HTMLBodyElement | null = document.querySelector("#emailProfile");
const expertiseProfile: HTMLBodyElement | null = document.querySelector("#expertiseProfile");
const experienceProfile: HTMLBodyElement | null = document.querySelector("#yearsExperienceProfile");
const dateOfBirthProfile: HTMLBodyElement | null = document.querySelector("#dateOfBirthProfile");

// HTML div elements
const profilePictureDiv: HTMLDivElement | null = document.querySelector("#profilePictureDiv");
const usernameDiv: HTMLDivElement | null = document.querySelector("#usernameDiv");
const emailDiv: HTMLDivElement | null = document.querySelector("#emailDiv");
const passwordDiv: HTMLDivElement | null = document.querySelector("#passwordDiv");
const expertiseDiv: HTMLDivElement | null = document.querySelector("#expertiseDiv");
const experienceDiv: HTMLDivElement | null = document.querySelector("#experienceDiv");
const dateOfBirthDiv: HTMLDivElement | null = document.querySelector("#dateOfBirthDiv");

// HTML button elements
const profilePictureAddButton: HTMLButtonElement | null = document.querySelector("#profilePictureAddButton");
const usernameEditButton: HTMLButtonElement | null = document.querySelector("#userNameEditButton");
const emailEditButton: HTMLButtonElement | null = document.querySelector("#emailEditButton");
const revealButton: HTMLButtonElement | null = document.querySelector("#passwordHidden");
const passwordEditButton: HTMLButtonElement | null = document.querySelector("#passwordEditButton");
const expertiseEditButton: HTMLButtonElement | null = document.querySelector("#expertiseEditButton");
const experienceButton: HTMLButtonElement | null = document.querySelector("#yearsExperienceEditButton");
const dateOfBirthEditButton: HTMLButtonElement | null = document.querySelector("#dateOfBirthEditButton");

// Current user
const testUser: User = new User(0, "0", "0", "0", "0", 0, "0", "0");
const currentUserId: string | null = localStorage.getItem("currentUserId");

if (currentUserId && usernameProfile && emailProfile && revealButton && experienceButton) {
    const currentUser: User | undefined = await testUser.getUserById(currentUserId);

    if (currentUser && profilePictureAddButton && profilePictureDiv) {
        // Profile picture
        const profilePictureUrl: string = getProfilePicture(currentUser);

        if (profilePictureUrl) {
            profilePictureDiv.innerHTML =
                "<img src='" + profilePictureUrl + "' id='profilePictureProfile'>";
        }

        profilePictureAddButton.addEventListener ("click", async event => {
            event.preventDefault();

            const profilePictureChanged: string | undefined = await changeProfilePicture(currentUser);

            if (profilePictureChanged) {
                location.reload();
            }
        });

        // Username
        usernameProfile.innerHTML += currentUser.username;

        if (usernameEditButton && usernameDiv) {
            usernameEditButton.addEventListener ("click", event => {
                event.preventDefault();

                usernameProfile.innerHTML = "Username: ";
                usernameDiv.innerHTML = "<input type='text' id='usernameInput' class='profileText'>" +
                "<button type='button' id='usernameSaveButton' class='profileText'>Save</button>" +
                "<button type='button' id='usernameCancelButton' class='profileText'>Cancel</button>";

                const usernameSaveButton: HTMLButtonElement | null =
                  document.querySelector("#usernameSaveButton");
                const usernameCancelButton: HTMLButtonElement | null =
                  document.querySelector("#usernameCancelButton");

                usernameSaveButton?.addEventListener ("click", async event => {
                    event.preventDefault();

                    const validUsername: boolean = await updateUsername();

                    if (validUsername) {
                        location.reload();
                    }
                });

                usernameCancelButton?.addEventListener ("click", event => {
                    event.preventDefault();
                    location.reload();
                });
            });
        }

        // Email
        emailProfile.innerHTML += currentUser.email;

        if (emailEditButton && emailDiv) {
            emailEditButton.addEventListener ("click", event => {
                event.preventDefault();

                emailProfile.innerHTML = "Email: ";
                emailDiv.innerHTML = "<input type='email' id='emailInput' class='profileText'>" +
                "<button type='button' id='emailSaveButton' class='profileText'>Save</button>" +
                "<button type='button' id='emailCancelButton' class='profileText'>Cancel</button>";

                const emailSaveButton: HTMLButtonElement | null =
                  document.querySelector("#emailSaveButton");
                const emailCancelButton: HTMLButtonElement | null =
                  document.querySelector("#emailCancelButton");

                emailSaveButton?.addEventListener ("click", async event => {
                    event.preventDefault();

                    const validEmail: boolean = await updateEmail();

                    if (validEmail) {
                        location.reload();
                    }
                });

                emailCancelButton?.addEventListener ("click", event => {
                    event.preventDefault();
                    location.reload();
                });
            });
        }

        // Password
        revealButton.addEventListener ("click", event => {
            event.preventDefault();

            revealPassword(currentUser.password);
        });

        if (passwordEditButton && passwordDiv) {
            passwordEditButton.addEventListener ("click", event => {
                event.preventDefault();

                passwordDiv.innerHTML = "<input type='text' id='passwordInput' class='profileText'>" +
                "<button type='button' id='passwordSaveButton' class='profileText'>Save</button>" +
                "<button type='button' id='passwordCancelButton' class='profileText'>Cancel</button>";

                const passwordSaveButton: HTMLButtonElement | null =
                  document.querySelector("#passwordSaveButton");
                const passwordCancelButton: HTMLButtonElement | null =
                  document.querySelector("#passwordCancelButton");

                passwordSaveButton?.addEventListener ("click", async event => {
                    event.preventDefault();

                    const validPassword: boolean = await updatePassword();

                    if (validPassword) {
                        location.reload();
                    }
                });

                passwordCancelButton?.addEventListener ("click", event => {
                    event.preventDefault();
                    location.reload();
                });
            });
        }

        // Expertise
        if (currentUser.expertise && expertiseProfile && expertiseDiv) {
            expertiseProfile.innerHTML += currentUser.expertise;
            expertiseDiv.innerHTML =
              "<button type='button' id='expertiseEditButton' class='profileText'>Edit</button>";

            const expertiseEditButton: HTMLButtonElement | null =
              document.querySelector("#expertiseEditButton");

            expertiseEditButton?.addEventListener ("click", event => {
                event.preventDefault();

                expertiseProfile.innerHTML = "Expertise: ";

                expertiseDiv.innerHTML = "<input type='text' id='expertiseInput' " +
                "class='profileText'><button type='button' id='expertiseSaveButton' " +
                "class='profileText'>Save</button><button id='expertiseCancelButton' class='profileText'" +
                ">Cancel</button>";

                const expertiseSaveButton: HTMLButtonElement | null =
                  document.querySelector("#expertiseSaveButton");
                const expertiseCancelButton: HTMLButtonElement | null =
                  document.querySelector("#expertiseCancelButton");

                expertiseSaveButton?.addEventListener ("click", async event => {
                    event.preventDefault();

                    await expertiseButton();
                    location.reload();
                });

                expertiseCancelButton?.addEventListener ("click", event => {
                    event.preventDefault();
                    location.reload();
                });
            });
        }

        expertiseEditButton?.addEventListener ("click", async event => {
            event.preventDefault();

            await expertiseButton();
            location.reload();
        });

        // Experience
        if (experienceProfile && experienceDiv && (currentUser.experience || currentUser.experience === 0)) {
            if (currentUser.experience === 1) {
                experienceProfile.innerHTML += currentUser.experience.toString() + " year";
            }
            else {
                experienceProfile.innerHTML += currentUser.experience.toString() + " years";
            }
            experienceDiv.innerHTML =
            "<button type='button' id='experienceEditButton' class='profileText'>Edit</button>";

            const experienceEditButton: HTMLButtonElement | null =
            document.querySelector("#experienceEditButton");

            experienceEditButton?.addEventListener ("click", event => {
                event.preventDefault();

                experienceProfile.innerHTML = "Years of programming experience: ";

                experienceDiv.innerHTML = "<input type='number' id='yearsExperienceInput' " +
                "class='profileText'><button type='button' id='yearsExperienceEditButton2' " +
                "class='profileText'>Save</button>";

                const experienceButton2: HTMLButtonElement | null =
                document.querySelector("#yearsExperienceEditButton2");

                if (experienceButton2) {
                    experienceButton2.addEventListener ("click", async event => {
                        event.preventDefault();

                        const experienceSaved: boolean = await yearsExperienceButton();
                        if (experienceSaved) {
                            location.reload();
                        }
                    });
                }
            });
        }

        experienceButton.addEventListener ("click", async event => {
            event.preventDefault();

            await yearsExperienceButton();
            location.reload();
        });

        // Date of birth
        if (dateOfBirthProfile && dateOfBirthDiv && currentUser.dateOfBirth) {
            dateOfBirthProfile.innerHTML += currentUser.dateOfBirth;
            dateOfBirthDiv.innerHTML =
              "<button type='button' id='dateOfBirthEditButton' class='profileText'>Edit</button>";

            const dateOfBirthEditButton: HTMLButtonElement | null =
              document.querySelector("#dateOfBirthEditButton");

            dateOfBirthEditButton?.addEventListener ("click", event => {
                event.preventDefault();

                dateOfBirthProfile.innerHTML = "Date of birth: ";

                dateOfBirthDiv.innerHTML = "<input type='date' id='dateOfBirthInput' " +
                "class='profileText'><button type='button' id='dateOfBirthSaveButton' " +
                "class='profileText'>Save</button><button id='dateOfBirthCancelButton' class='profileText'" +
                ">Cancel</button>";

                const dateOfBirthSaveButton: HTMLButtonElement | null =
                  document.querySelector("#dateOfBirthSaveButton");
                const dateOfBirthCancelButton: HTMLButtonElement | null =
                  document.querySelector("#dateOfBirthCancelButton");

                dateOfBirthSaveButton?.addEventListener ("click", async event => {
                    event.preventDefault();

                    await dateOfBirthButton();
                    location.reload();
                });

                dateOfBirthCancelButton?.addEventListener ("click", event => {
                    event.preventDefault();
                    location.reload();
                });
            });
        }

        dateOfBirthEditButton?.addEventListener ("click", async event => {
            event.preventDefault();

            await dateOfBirthButton();
        });
    }
}

// My questions
const myQuestionsDiv: HTMLDivElement | null = document.querySelector("#myQuestionsDiv");

if (currentUserId && myQuestionsDiv) {
    const currentUser: User | undefined = await testUser.getUserById(currentUserId);

    const questions: Question[] = await Question.getQuestionsById(Number(currentUserId));

    if (currentUser) {
        for (let x: number = 0; x < questions.length; x++) {
            const testAnswer: Answer = new Answer(0, 0, 0, "0", "0");
            const answers: Answer[] = await testAnswer.getAnswersByQuestionID(questions[x].questionID);

            myQuestionsDiv.innerHTML += "<div id='questionDiv" + x.toString() + "' class='questionDivs'>";
            myQuestionsDiv.innerHTML += "<button class='questionButton' data-id='" +
            questions[x].questionID.toString() + "'>" + questions[x].title + "</button>";
            myQuestionsDiv.innerHTML += "<p class='profileText'> by: " + currentUser.username + "</p>";
            myQuestionsDiv.innerHTML += "<p>" + questions[x].details
                .replace(/\n/g, "<br>")
                .replace(/```([^`]+)``/g, "<code>$1</code>") + "</p> <br>";
            myQuestionsDiv.innerHTML += "<p>Answers: " + answers.length.toString();
            myQuestionsDiv.innerHTML += "</div>";
        }

        document.querySelectorAll(".questionButton").forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();

                const questionID: string | null = button.getAttribute("data-id");

                if (questionID) {
                    localStorage.setItem("currentQuestionId", questionID);

                    location.replace("/currentQuestion.html");
                }
            });
        });
    }
}
