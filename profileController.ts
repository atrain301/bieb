import { api, types, utils } from "@hboictcloud/api";
import { User } from "../models/User";

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

const testUser: User = new User(0, "0", "0", "0", "0", 0, "0", "0");
const currentUserId: string | null = localStorage.getItem("currentUserId");

export async function changeProfilePicture(currentUser: User): Promise<string | undefined> {
    const profilePictureInput: HTMLInputElement | null = document.querySelector("#profilePictureInput");

    if (profilePictureInput?.files) {
        const profilePicture: types.DataURL = (await utils.getDataUrl(profilePictureInput)) as types.DataURL;
        const profilePictureUrl: string = profilePicture.url;

        await api.deleteFile(currentUser.id.toString() + "Picture.png");
        const result: string =
           await api.uploadFile(currentUser.id.toString() + "Picture.png", profilePictureUrl);

        console.log(result);

        currentUser.profilePicture = result;
        await currentUser.update("profilePicture", result, currentUser.id);

        return result;
    }
    else {
        return undefined;
    }
}

export function getProfilePicture(currentUser: User): string {
    const profilePictureUrl: string = currentUser.profilePicture;

    return profilePictureUrl;
}

export function revealPassword(password: string): void {
    const passwordHidden: HTMLBodyElement | null = document.querySelector("#passwordHidden");
    const passwordRevealed: HTMLBodyElement | null = document.querySelector("#passwordRevealed");

    if (passwordRevealed && passwordHidden) {
        passwordHidden.innerHTML = "";
        passwordRevealed.innerHTML = password;
    }
}

export async function updateUsername(): Promise<boolean> {
    const usernameInput: HTMLInputElement | null = document.querySelector("#usernameInput");
    const usernameErrorProfile: HTMLDivElement | null = document.querySelector("#usernameErrorProfile");

    if (usernameInput && currentUserId && usernameErrorProfile) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const username: string = usernameInput.value;

        if (currentUser) {
            const id: number = currentUser.id;

            const usernameFree: boolean = await currentUser.doesUserExistForUsername(username);

            if (usernameFree) {
                return await currentUser.update("username", username, id);
            }
            else {
                usernameErrorProfile.innerHTML +=
                  "<p class='profileText'> This username is already in use, try again.</p>";
                return false;
            }
        }
    }
    return false;
}

function validateEmail(email: string): boolean {
    const test: RegExp = /\S+@\S+\.\S+/;
    return test.test(email);
}

export async function updateEmail(): Promise<boolean> {
    const emailInput: HTMLInputElement | null = document.querySelector("#emailInput");
    const emailErrorProfile: HTMLDivElement | null = document.querySelector("#emailErrorProfile");

    if (emailInput && emailErrorProfile && currentUserId) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const email: string = emailInput.value;

        if (email) {
            const validEmail: boolean = validateEmail(email);

            if (currentUser && email && validEmail) {
                const id: number = currentUser.id;
                const emailFree: boolean = await currentUser.doesUserExistForEmail(email);

                if (emailFree) {
                    return await currentUser.update("email", email, id);
                }
                else {
                    emailErrorProfile.innerHTML =
                      "<p class='profileText'> This email is already in use, try again.</p>";
                    return false;
                }
            }
            else if (!validEmail) {
                emailErrorProfile.innerHTML = "<p class='profileText'> Please give a valid email.</p>";
                return false;
            }
            else {
                console.error("Current user or email does not exist.");
                return false;
            }
        }
    }
    return false;
}

function validatePassword(password: string): boolean {
    const passwordNeeds: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordNeeds.test(password);
}

export async function updatePassword(): Promise<boolean> {
    const passwordInput: HTMLInputElement | null = document.querySelector("#passwordInput");
    const passwordErrorProfile: HTMLDivElement | null = document.querySelector("#passwordErrorProfile");

    if (passwordInput && currentUserId && passwordErrorProfile) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const password: string = passwordInput.value;

        if (currentUser) {
            const id: number = currentUser.id;

            const passwordValid: boolean = validatePassword(password);

            if (passwordValid) {
                return await currentUser.update("password", password, id);
            }
            else {
                passwordErrorProfile.innerHTML +=
                  "<p class='profileText'> Your password needs to have 8 digits, an uppercase letter, " +
                  "a lowercase letter and a number to be valid.</p>";
                return false;
            }
        }
    }
    return false;
}

export async function expertiseButton(): Promise<void> {
    const expertiseInput: HTMLInputElement | null = document.querySelector("#expertiseInput");

    if (expertiseInput && currentUserId) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const expertise: string = expertiseInput.value;

        if (currentUser) {
            const id: number = currentUser.id;
            await currentUser.update("expertise", expertise, id);
        }
    }
}

export async function yearsExperienceButton(): Promise<boolean> {
    const yearsInput: HTMLInputElement | null = document.querySelector("#yearsExperienceInput");

    if (yearsInput && currentUserId) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const years: string = yearsInput.value;

        if (currentUser) {
            const id: number = currentUser.id;
            return await currentUser.update("experience", years, id);
        }
    }
    console.error("an error had occured.");
    return false;
}

export async function dateOfBirthButton(): Promise<void> {
    const dateOfBirthInput: HTMLInputElement | null = document.querySelector("#dateOfBirthInput");

    if (dateOfBirthInput && currentUserId) {
        const currentUser: User | undefined = await testUser.getUserById(currentUserId);
        const dateOfBirth: string = dateOfBirthInput.value;

        if (currentUser) {
            const id: number = currentUser.id;
            await currentUser.update("dateOfBirth", dateOfBirth, id);
        }
    }
}
