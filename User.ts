import { api } from "@hboictcloud/api";

export class User {
    public username: string;
    public email: string;
    public password: string;
    public id: number;
    public expertise: string;
    public experience: number;
    public dateOfBirth: string;
    public profilePicture: string = "";

    public constructor(id: number, username: string, email: string, password: string, expertise: string,
        yearsExperience: number, dateOfBirth: string, profilePicture: string
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.expertise = expertise;
        this.experience = yearsExperience;
        this.dateOfBirth = dateOfBirth;
        this.profilePicture = profilePicture;
    }

    public async doesUserExistForEmail(email: string): Promise<boolean> {
        type UserRow = { id: number; Username: string; email: string; password: string };
        type NonQueryResult = { affectedRows: number };
        const sql: string = "SELECT * FROM User WHERE email = '" + email + "'";
        const resultEmail: UserRow[] | NonQueryResult | string = await api.queryDatabase(sql);
        if (Array.isArray(resultEmail)) {
            return resultEmail.length === 0;
        }
        else {
            console.error("An error has occured with the type of resultEmail in User.ts");
            return false;
        }
    }

    public async doesUserExistForUsername(username: string): Promise<boolean> {
        type UserRow = { id: number; Username: string; email: string; password: string };
        type NonQueryResult = { affectedRows: number };
        const sql: string = "SELECT * FROM User WHERE username = '" + username + "'";
        const resultUsername: UserRow[] | NonQueryResult | string = await api.queryDatabase(sql);
        if (Array.isArray(resultUsername)) {
            return resultUsername.length === 0;
        }
        else {
            console.error("An error has occured with the type of resultUsername in User.ts");
            return false;
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        type UserRow = { id: number; username: string; email: string; password: string; expertise: string;
            experience: number; dateOfBirth: string; profilePicture: string; };
        type NonQueryResult = { affectedRows: number };

        const sql: string = "SELECT * FROM User WHERE id = '" + id + "';";
        const result: UserRow[] | string | NonQueryResult = await api.queryDatabase(sql);

        if (Array.isArray(result) && result.length > 0) {
            const userData: UserRow = result[0];
            return new User(userData.id, userData.username, userData.email, userData.password,
                userData.expertise, userData.experience, userData.dateOfBirth, userData.profilePicture);
        }
        else {
            return undefined;
        }
    }

    public async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
        type UserRow = { id: number; username: string; email: string; password: string;
            expertise: string; experience: number; dateOfBirth: string; profilePicture: string; };
        type NonQueryResult = { affectedRows: number };

        const sql: string = "SELECT * FROM User WHERE email = '" + email.toString() + "' AND password = '" +
          password + "';";
        const result: UserRow[] | string | NonQueryResult = await api.queryDatabase(sql);

        if (Array.isArray(result) && result.length > 0) {
            const userData: UserRow = result[0];
            return new User(userData.id, userData.username, userData.email, userData.password,
                userData.expertise, userData.experience, userData.dateOfBirth, userData.profilePicture);
        }
        else {
            return undefined;
        }
    }

    public async save(username: string, email: string, password: string): Promise<boolean> {
        type UserRow = { id: number; Username: string; email: string; password: string };
        type NonQueryResult = { affectedRows: number };

        const sql: string = "INSERT INTO User (Username, Email, Password) VALUES ('" +
          username + "', '" + email + "', '" + password + "')";

        const result: UserRow[] | string | NonQueryResult = await api.queryDatabase(sql);
        return result !== "";
    }

    public async update(type: string, value: string, id: number): Promise<boolean> {
        type UserRow = { id: number; Username: string; email: string; password: string };
        type NonQueryResult = { affectedRows: number };

        const sql: string = "UPDATE `user` SET `" + type + "` = '" + value + "' WHERE `user`.`id` = " +
          id.toString();

        const result: UserRow[] | string | NonQueryResult = await api.queryDatabase(sql);
        return result !== "";
    }

    public set profilePictureSet(src: string) {
        this.profilePicture = src;
    }

    public get profilePictureGet(): string {
        return this.profilePicture;
    }
}
